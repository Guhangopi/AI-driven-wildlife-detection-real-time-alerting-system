import os
from ultralytics import YOLO

# ==========================================
# Animal Detection System - YOLOv8 Custom Training Script
# ==========================================
# Use this script to train the AI model to detect exact animal
# species (e.g., Leopard, Sloth Bear, Wild Boar) with high accuracy.
#
# Requirements:
# 1. You need a dataset of images containing the specific animals you want to detect.
# 2. The images must be annotated in YOLO format.
#    You can use tools like Roboflow (roboflow.com) or CVAT to create and export 
#    a dataset in YOLOv8 format.
# 3. Create a data.yaml file that points to your dataset (train/val folders) and 
#    lists the exact animal names.
#
# Example data.yaml:
# path: /dataset/wildlife
# train: images/train
# val: images/val
# nc: 3
# names: ['Leopard', 'Elephant', 'Wild Boar']
#
# Run this script on a machine with a good GPU for faster training!

def train_custom_model():
    print("Initializing YOLOv8 training sequence...")
    
    # Load a pre-trained base model. We start with 'yolov8n.pt' (nano) for edge deployment,
    # but you can use 'yolov8s.pt' (small) for slightly better accuracy.
    model = YOLO("yolov8n.pt") 
    
    dataset_yaml = "data.yaml" # Put the path to your dataset YAML file here
    
    if not os.path.exists(dataset_yaml):
        print(f"ERROR: Dataset configuration file '{dataset_yaml}' not found.")
        print("Please create your custom dataset and update the path above.")
        return

    print("Starting training! This may take a while depending on your hardware.")
    # Train the model
    # epochs=50: Good starting point. Depending on dataset size, you might need 100-300.
    # imgsz=640: Standard image size for YOLOv8.
    results = model.train(
        data=dataset_yaml,
        epochs=50,
        imgsz=640,
        batch=16,
        name="custom_animal_model"
    )
    
    print("\nTraining complete!")
    print("Your trained model will be saved in 'runs/detect/custom_animal_model/weights/best.pt'.")
    print("Copy 'best.pt' and rename it to 'custom_animal_model.pt' in the project root folder.")
    print("The detection scripts will automatically detect and load it!")

if __name__ == "__main__":
    train_custom_model()
