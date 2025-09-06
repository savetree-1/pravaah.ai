@echo off
echo Installing Pravah.ai Dependencies...
echo ===================================

cd /d "%~dp0"

echo Installing npm dependencies...
npm install

if errorlevel 1 (
    echo Failed to install dependencies!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
) else (
    echo Dependencies installed successfully!
    echo You can now run the project using run-project.bat
    echo.
    echo Available scripts:
    echo - run-project.bat      : Start development server
    echo - run-production.bat   : Build and run production server
    echo - setup.bat           : Install dependencies (this file)
    echo.
)

pause
