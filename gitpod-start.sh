#!/bin/bash

# Gitpod Quick Start Script for Playwright Automation
echo "🎭 Starting Playwright Automation in Gitpod..."

# Check if we're in Gitpod
if [ -n "$GITPOD_WORKSPACE_URL" ]; then
    echo "✅ Detected Gitpod environment"
    
    # Set display for headless browsers
    export DISPLAY=:99
    
    # Start virtual display in background
    Xvfb :99 -screen 0 1280x720x24 > /dev/null 2>&1 &
    
    echo "🖥️  Virtual display started"
    
    # Run a quick test to verify setup
    echo "🧪 Running setup verification test..."
    npx playwright test tests/form.spec.js --reporter=list
    
    if [ $? -eq 0 ]; then
        echo "✅ Setup verification successful!"
        echo ""
        echo "🚀 Your Playwright environment is ready!"
        echo ""
        echo "Available commands:"
        echo "  npm run test           - Run all tests"
        echo "  npm run test:form      - Run form tests"
        echo "  npm run test:sliders   - Run slider tests"
        echo "  npm run test:report    - View test report"
        echo ""
        echo "💡 Tip: Use the VS Code Test Explorer or click ▶️ next to test names"
    else
        echo "❌ Setup verification failed. Check the logs above."
        exit 1
    fi
else
    echo "⚠️  This script is optimized for Gitpod environment"
    echo "For local development, use: npm install && npx playwright install"
fi
