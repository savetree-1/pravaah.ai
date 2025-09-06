@echo off
echo Starting Pravah.ai Development Server...
echo =====================================

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

echo Starting development server...
echo Open your browser to: http://localhost:3000
echo Press Ctrl+C to stop the server
echo =====================================

npm run dev

pause
