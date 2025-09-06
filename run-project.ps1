# Pravah.ai Development Server Launcher
# PowerShell script for running the project

Write-Host "Starting Pravah.ai Development Server..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Set location to script directory
Set-Location $PSScriptRoot

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install dependencies!" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Start development server
Write-Host "Starting development server..." -ForegroundColor Green
Write-Host "Open your browser to: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Cyan

npm run dev

Read-Host "Press Enter to exit"
