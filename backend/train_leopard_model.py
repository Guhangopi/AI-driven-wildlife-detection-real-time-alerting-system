import os
import subprocess
import sys

# Ensure roboflow is installed
try:
    import roboflow
except ImportError:
    print("Installing Roboflow library...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "roboflow"])
    from roboflow import Roboflow

from ultralytics import YOLO

# ==========================================
# Animal Detection System - Leopard Training Script
# ==========================================

ROBOFLOW_API_KEY = "W4wx4rWXsJKDJYiD7G0P"
DATASET_ID = "leopard-wswuu"
VERSION = 1
WORKSPACE = "human-activity-qwawz"

def start_leopard_training():
    print(f"--- LEOPARD DETECTION TRAINING START ---")
    
    # 1. Initialize Roboflow and download dataset
    rf = Roboflow(api_key=ROBOFLOW_API_KEY)
    project = rf.workspace(WORKSPACE).project(DATASET_ID)
    dataset = project.version(VERSION).download("yolov8")
    
    # 2. Path to data.yaml
    dataset_yaml = os.path.join(dataset.location, "data.yaml")
    print(f"Dataset downloaded to: {dataset.location}")
    
    # 3. Load YOLOv8 Small model (better for accuracy than Nano)
    print("Loading base model (yolov8s.pt)...")
    model = YOLO("yolov8s.pt")
    
    # 4. Train the model
    # We use 50 epochs and 640 image size for high precision.
    print("Starting training. This may take some time...")
    results = model.train(
        data=dataset_yaml,
        epochs=50,
        imgsz=640,
        batch=16,
        name="leopard_detection_model"
    )
    
    # 5. Move results to project root
    # YOLO saves weights in runs/detect/leopard_detection_model/weights/best.pt
    best_weights = os.path.join("runs", "detect", "leopard_detection_model", "weights", "best.pt")
    if os.path.exists(best_weights):
        # Rename to custom_animal_model.pt so the main script uses it
        import shutil
        target_path = os.path.join(os.getcwd(), "custom_animal_model.pt")
        shutil.copy(best_weights, target_path)
        print(f"\nSUCCESS! Your custom Leopard AI model is ready.")
        print(f"Model saved to: {target_path}")
        print("Your camera detection script will now use this model automatically!")
    else:
        print("\nTraining completed, but weights file was not found in the expected location.")

if __name__ == "__main__":
    start_leopard_training()
