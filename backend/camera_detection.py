import cv2
import requests
import base64
import time
import datetime
import os
import threading
import copy
from ultralytics import YOLO

# Configuration
BACKEND_URL = os.environ.get("BACKEND_URL", "http://localhost:5000/api/iot/alert")
CAMERA_ID = 0  # 0 for default webcam
DETECTION_INTERVAL = 15  # Seconds between alerts
CONFIDENCE_THRESHOLD = 0.5

# We focus on specific classes if we use the default YOLOv8 COCO model
# Focus ONLY on wild animals. We ignore pets (dogs) and cattle.
# NOTE: The default COCO model lacks a 'Leopard' class, so leopards are typically detected as 'cat' (15).
COCO_FALLBACK_CLASSES = {
    15: "Leopard (Detected as Feline)",
    20: "Elephant",
    21: "Bear"
}

# Global state for multithreading
shared_frame = None
shared_detections = []
ai_fps = 0
ai_thread_running = True
camera_fps = 0

def ai_worker_thread(model, using_custom_model):
    """Background thread to run YOLO inference so the camera feed doesn't lag."""
    global shared_frame, shared_detections, ai_fps, ai_thread_running
    
    prev_time = 0
    last_alert_time = 0
    
    while ai_thread_running:
        if shared_frame is None:
            time.sleep(0.01)
            continue
            
        # Safely copy the frame so we don't interfere with the camera thread
        frame_to_process = copy.deepcopy(shared_frame)
        
        # Calculate exact AI FPS
        new_time = time.time()
        fps_value = 1 / (new_time - prev_time) if prev_time > 0 else 0
        prev_time = new_time
        ai_fps = int(fps_value)
        
        # Run inference
        results = model(frame_to_process, verbose=False, conf=CONFIDENCE_THRESHOLD)
        
        new_detections = []
        current_frame_animal = None
        
        for result in results:
            boxes = result.boxes
            for box in boxes:
                cls_id = int(box.cls[0])
                class_name = None
                
                if using_custom_model:
                    class_name = model.names[cls_id]
                else:
                    if cls_id in COCO_FALLBACK_CLASSES:
                        class_name = COCO_FALLBACK_CLASSES[cls_id]
                        conf = float(box.conf[0])
                        # Critical Fix: Prevent humans from triggering "Leopard" via poor Cat misclassifications
                        if cls_id == 15 and conf < 0.65:
                            class_name = None # Ignore low confidence cats
                            
                if class_name:
                    current_frame_animal = class_name
                    # Save bounding box for main thread to draw
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    new_detections.append({
                        "class_name": class_name,
                        "box": (x1, y1, x2, y2)
                    })
                    
        # Update safely for main thread
        shared_detections = new_detections
        
        # Network Alert Logic (only alert if detection found and interval passed)
        if current_frame_animal and (new_time - last_alert_time > DETECTION_INTERVAL):
            detected_animal = current_frame_animal
            print(f"Wild animal detected: {detected_animal}! Sending alert...")
            
            # Encode frame to base64
            _, buffer = cv2.imencode('.jpg', frame_to_process)
            jpg_as_text = base64.b64encode(buffer).decode('utf-8')
            
            payload = {
                "location": "Main Entrance (Camera 1)",
                "description": f"DANGER: {detected_animal.capitalize()} detected!",
                "species": detected_animal,
                "distance": 35.0, # default distance for mock
                "image_data": jpg_as_text
            }
            
            try:
                response = requests.post(BACKEND_URL, json=payload)
                if response.status_code == 201:
                    print(f"Alert sent! {datetime.datetime.now()}")
                    last_alert_time = new_time
                else:
                    print(f"Failed to send alert: {response.text}")
            except Exception as e:
                print(f"Error sending alert: {e}")

def capture_and_send():
    global shared_frame, shared_detections, ai_fps, ai_thread_running, camera_fps
    
    print("Loading AI model... this might take a moment.")
    
    custom_model_path = os.path.join(os.path.dirname(__file__), 'custom_animal_model.pt')
    if os.path.exists(custom_model_path):
        print(f"--> Found custom model! Loading exactly trained species from: {custom_model_path}")
        model = YOLO(custom_model_path)
        using_custom_model = True
    else:
        print("--> Using default YOLOv8 COCO model (yolov8n.pt).")
        print("    NOTE: For exact species like 'Leopard', please train a custom YOLO model.")
        print("    Run 'train_custom_yolo.py' to generate 'custom_animal_model.pt'.")
        model = YOLO("yolov8s.pt") # Upgraded to Small model for better accuracy
        using_custom_model = False
    
    if os.name == 'nt':
        cap = cv2.VideoCapture(CAMERA_ID, cv2.CAP_DSHOW)
    else:
        cap = cv2.VideoCapture(CAMERA_ID)
    
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return
        
    print("Camera started. Detecting animals...")
    
    # Start the background AI Thread
    ai_thread = threading.Thread(target=ai_worker_thread, args=(model, using_custom_model), daemon=True)
    ai_thread.start()
    
    prev_frame_time = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        # Provide the newest frame to the AI thread
        shared_frame = frame

        # Calculate exact Camera FPS
        new_frame_time = time.time()
        fps_value = 1 / (new_frame_time - prev_frame_time) if prev_frame_time > 0 else 0
        prev_frame_time = new_frame_time
        camera_fps = int(fps_value)

        # Draw the latest detections from AI overlay
        for det in shared_detections:
            x1, y1, x2, y2 = det["box"]
            class_name = det["class_name"]
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)
            cv2.putText(frame, f"{class_name.upper()}", (x1, y1 - 10), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

        # Display dual FPS text
        cv2.putText(frame, f"Cam FPS: {camera_fps} | AI FPS: {ai_fps}", (15, 35), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

        cv2.imshow("WildGuard Animal Detection", frame)
        
        if cv2.waitKey(1) == ord('q'):
            break

    ai_thread_running = False
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    capture_and_send()
