@echo off
REM DiveBuddy.SMO GitHub Pages Deployment Script for Windows

echo 🚀 Starting DiveBuddy.SMO GitHub Pages Deployment...

REM Check if git is initialized
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit - DiveBuddy.SMO Vue.js application"
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔗 Adding GitHub remote...
    git remote add origin https://github.com/Ntp-MD/DiveBuddy.SMO.git
)

REM Build the project
echo 🔨 Building project for production...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo 📤 Ready to deploy to GitHub Pages
    echo.
    echo 🌐 Next steps:
    echo 1. Push to GitHub: git push -u origin main
    echo 2. Enable GitHub Pages in repository settings
    echo 3. Your site will be available at: https://ntp-md.github.io/DiveBuddy.SMO/
    echo.
    echo 🎯 Automatic deployment is configured via GitHub Actions!
) else (
    echo ❌ Build failed. Please fix errors and try again.
    exit /b 1
)
