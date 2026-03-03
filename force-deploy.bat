@echo off
echo 🚀 Force Deploy DiveBuddy.SMO to GitHub Pages...

REM Clean and rebuild
echo 🧹 Cleaning old build...
if exist dist rmdir /s /q dist

echo 🔨 Rebuilding with correct base path...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo 📤 Checking built files...
    
    REM Show the correct paths
    echo 📋 Built file paths:
    findstr /C:"/DiveBuddy.SMO/" dist\index.html
    
    echo.
    echo 🌐 Ready to deploy with correct paths!
    echo.
    echo 📋 Next steps:
    echo 1. git add .
    echo 2. git commit -m "Fix GitHub Pages deployment - force update with correct base path"
    echo 3. git push origin main
    echo 4. Wait for GitHub Actions to complete
    echo.
    echo 🎯 This will force update the GitHub Pages with correct case-sensitive paths!
) else (
    echo ❌ Build failed. Please check for errors.
    pause
)
