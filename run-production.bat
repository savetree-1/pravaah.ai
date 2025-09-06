@echo off
echo Building and Starting Pravah.ai Production Server...
echo ==================================================

cd /d "%~dp0"

echo Checking if node_modules exists...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo Building production version...
npm run build
if errorlevel 1 (
    echo Build failed!
    pause
    exit /b 1
)

echo Starting production preview server...
echo Open your browser to: http://localhost:4173
echo Press Ctrl+C to stop the server
echo ==================================================

npm run preview

pause
