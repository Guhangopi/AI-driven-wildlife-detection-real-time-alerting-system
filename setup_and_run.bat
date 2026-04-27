
@echo off
setlocal
title Animal Detection System Launcher

echo ===================================================
echo   Animal Detection and Alerting System - Launcher
echo ===================================================
echo.

:: 1. Backend Setup & DB Init
echo [1/3] Setting up Backend and Database...
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt > nul 2>&1
echo Installing edge AI dependencies...
pip install -r ..\edge_device\requirements.txt > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error installing backend dependencies.
    pause
    exit /b
)
echo Initializing Database...
python init_db.py
if %ERRORLEVEL% NEQ 0 (
    echo Warning: Database initialization outcome uncertain. Please check config.
)
cd ..

:: 2. Frontend Setup
echo.
echo [2/3] Preparing Frontend...
cd frontend
if not exist node_modules (
    echo Installing frontend dependencies, this may take a while...
    call npm install
)
cd ..

:: 3. Launching Services
echo.
echo [3/3] Launching System Services...
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && venv\Scripts\activate && python app.py"

echo Starting IoT Edge AI Camera...
start "Security Camera (Edge AI)" cmd /k "call backend\venv\Scripts\activate && cd edge_device && python detect.py"

echo Starting Frontend Client...
start "Frontend Client" cmd /k "cd frontend && npm run dev"

echo.
echo ===================================================
echo   System is running!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo ===================================================
echo.
pause
