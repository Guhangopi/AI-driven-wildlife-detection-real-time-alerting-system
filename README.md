# 🐾 WildGuard: Animal Detection & Alerting System

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.10+-yellow.svg)
![React](https://img.shields.io/badge/react-18-cyan.svg)
![YOLOv8](https://img.shields.io/badge/AI-YOLOv8-green.svg)

**WildGuard** is an intelligent, real-time edge-computing surveillance system built to prevent human-wildlife encounters on university campuses and localized areas. Utilizing a combination of live computer vision, deep learning, and a fully reactive web dashboard, WildGuard instantly detects wild animals via security cameras and broadcasts live alerts to registered students and administrators.

## ✨ Key Features
- **Real-Time Detection:** A multithreaded Python camera pipeline captures frames continuously while processing them eagerly utilizing the YOLOv8 machine learning model without lag.
- **Automated Alerting:** The moment an animal (e.g., Leopard, Bear, Elephant) is identified at a security checkpoint, a payload is broadcast to the backend.
- **Dynamic Web Dashboard:** A beautiful React-based frontend where security administrators can view live alert feeds mapped to specific campus zones.
- **Community Notifications:** (WIP) Integration with notification systems to safely text or warn students registered on the platform within danger perimeters.
- **Scalable Architecture:** Capable of handling multiple edge devices acting as IoT nodes sending independent camera detections asynchronously to a localized tracking API.

## 🛠️ Technology Stack
### Frontend
- **React.js** with Vite for fast local development
- **Tailwind CSS** & **Lucide React** for modern UI design

### Backend & AI 
- **Flask** (Python API server)
- **SQLAlchemy / PostgreSQL** (Database infrastructure)
- **OpenCV** (DSHOW background frame extraction)
- **Ultralytics YOLOv8** (Computer Vision Object Detection)

---

## 🚀 Getting Started

If you have cloned this repository and wish to run it locally, follow these steps:

### Prerequisites
- Python 3.10+
- Node.js & npm
- PostgreSQL database populated as `animal_detection_db`

### 1. Database Initialization
Make sure your PostgreSQL instance is running. Once the backend server initializes (Step 2), visit `http://localhost:5000/init-db` to generate all needed application tables.

### 2. Auto-Run Script (Windows)
For convenience, this project packages a `.bat` script that manages your Python virtual environment, installs PIP requirements, runs the backend, boots up your YOLO-powered surveillance camera script, and starts the frontend React client.

```bash
# Simply execute the startup file inside the root directory
.\start_dev.bat
```

### 3. Manual Run
If you are on Linux/Mac, or prefer to launch services individually:

**Terminal 1: Backend Server**
```bash
cd backend
python -m venv venv
# Linux/Mac: source venv/bin/activate
venv\Scripts\activate 
pip install -r requirements.txt
python app.py
```

**Terminal 2: Frontend Dashboard**
```bash
cd frontend
npm install
npm run dev
```

**Terminal 3: Surveillance Camera (AI Thread)**
```bash
cd backend
venv\Scripts\activate
python camera_detection.py
```

---

*Because the YOLO AI Model Weights (e.g., yolov8s.pt) are excessively large, they are excluded from this repository via `.gitignore` and will automatically download on your first execution.*
