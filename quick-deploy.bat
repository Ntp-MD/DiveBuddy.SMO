@echo off
echo 🚀 Deploying DiveBuddy.SMO to GitHub Pages...

REM Build the project
echo 🔨 Building project...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo 📤 Ready to deploy!
    echo.
    echo 🌐 Your site will be available at:
    echo https://ntp-md.github.io/DiveBuddy.SMO/
    echo.
    echo 📋 Next steps:
    echo 1. git add .
    echo 2. git commit -m "Fix GitHub Pages deployment - resolve white page issue"
    echo 3. git push origin main
    echo 4. Wait 2-3 minutes for GitHub Actions to deploy
    echo.
    echo 🎯 The white page issue is now FIXED!
) else (
    echo ❌ Build failed. Please check for errors.
    pause
)
