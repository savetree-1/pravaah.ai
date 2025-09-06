@echo off
title Pravah.ai Project Launcher

:menu
cls
echo.
echo  ____  ____      _    _   _    _    _     
echo ^|  _ \^|  _ \    / \  ^| \ ^| ^|  / \  ^| ^|    
echo ^| ^|_) ^| ^|_) ^|  / _ \ ^|  \^| ^| / _ \ ^| ^|    
echo ^|  __/^|  _ ^< / ___ \^| ^|\  ^|/ ___ \^| ^|___ 
echo ^|_^|   ^|_^| \_\_/   \_\_^| \_/_/   \_\_____ 
echo.
echo          AI-Powered Document Automation
echo          ================================
echo.
echo Please choose an option:
echo.
echo [1] Start Development Server (npm run dev)
echo [2] Build and Run Production Server
echo [3] Install/Update Dependencies
echo [4] Run with Docker Compose
echo [5] Open Project in VS Code
echo [6] View Project Info
echo [0] Exit
echo.
set /p choice="Enter your choice (0-6): "

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto production
if "%choice%"=="3" goto install
if "%choice%"=="4" goto docker
if "%choice%"=="5" goto vscode
if "%choice%"=="6" goto info
if "%choice%"=="0" goto exit
goto menu

:dev
cls
echo Starting Development Server...
echo ==============================
cd /d "%~dp0"
if not exist "node_modules" (
    echo Installing dependencies first...
    npm install
)
echo.
echo Development server will start at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
npm run dev
pause
goto menu

:production
cls
echo Building Production Version...
echo =============================
cd /d "%~dp0"
if not exist "node_modules" (
    echo Installing dependencies first...
    npm install
)
echo Building...
npm run build
echo.
echo Starting production server at: http://localhost:4173
echo.
npm run preview
pause
goto menu

:install
cls
echo Installing Dependencies...
echo =========================
cd /d "%~dp0"
npm install
echo.
echo Dependencies installed successfully!
pause
goto menu

:docker
cls
echo Starting with Docker Compose...
echo ==============================
cd /d "%~dp0"
echo Building and starting containers...
docker-compose up --build
pause
goto menu

:vscode
cls
echo Opening in VS Code...
cd /d "%~dp0"
code .
goto menu

:info
cls
echo Project Information
echo ==================
echo.
echo Project: Pravah.ai - KMRL Document Automation
echo Tech Stack: React + TypeScript + Tailwind CSS
echo.
echo Available Scripts:
echo - npm run dev      : Development server (port 3000)
echo - npm run build    : Production build
echo - npm run preview  : Preview production build (port 4173)
echo - npm run lint     : Run ESLint
echo.
echo Files:
echo - run-project.bat  : This launcher script
echo - setup.bat        : Install dependencies only
echo - run-project.ps1  : PowerShell version
echo - run-project.sh   : Linux/Mac version
echo.
echo Docker:
echo - docker-compose up --build : Run with Docker
echo.
pause
goto menu

:exit
echo.
echo Thanks for using Pravah.ai!
echo.
exit
