@echo off
echo Starting Animal Detection Alerting System...

start "Backend Server" cmd /k "cd backend && (if not exist venv python -m venv venv) && call venv\Scripts\activate && pip install -r requirements.txt && python app.py"
start "Frontend Client" cmd /k "cd frontend && npm run dev"
start "Security Camera" cmd /k "cd backend && (if not exist venv python -m venv venv) && call venv\Scripts\activate && pip install -r requirements.txt && python camera_detection.py"

echo.
echo Application starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173 (usually)
echo.
echo Please ensure you have created the PostgreSQL database 'animal_detection_db' before using the app.
echo You can initialize tables by visiting http://localhost:5000/init-db after the backend starts.
pause
