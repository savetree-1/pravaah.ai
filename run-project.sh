#!/bin/bash

echo "Starting Pravah.ai Development Server..."
echo "======================================"

# Change to script directory
cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Failed to install dependencies!"
        read -p "Press Enter to exit"
        exit 1
    fi
fi

# Start development server
echo "Starting development server..."
echo "Open your browser to: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo "======================================"

npm run dev

read -p "Press Enter to exit"
