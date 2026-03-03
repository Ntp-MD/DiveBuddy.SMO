@echo off
echo 🚀 Manual Deploy DiveBuddy.SMO to GitHub Pages

REM Check if gh-pages is installed
npm list gh-pages >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing gh-pages...
    npm install --save-dev gh-pages
)

REM Clean and build
echo 🧹 Cleaning old build...
if exist dist rmdir /s /q dist

echo 🔨 Building project...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo ✅ Build successful!

REM Deploy to GitHub Pages
echo 📤 Deploying to GitHub Pages...
npx gh-pages --dist dist --repo https://github.com/Ntp-MD/DiveBuddy.SMO.git --branch gh-pages --dotfiles --message "Manual deploy: DiveBuddy.SMO website"

if %errorlevel% neq 0 (
    echo ❌ Deployment failed!
    echo.
    echo 🔧 Troubleshooting:
    echo 1. Make sure you're logged into GitHub: gh auth login
    echo 2. Check repository exists: https://github.com/Ntp-MD/DiveBuddy.SMO
    echo 3. Verify repository is PUBLIC
    echo 4. Check you have push permissions
    echo.
    echo 📋 After successful deploy, enable GitHub Pages:
    echo 1. Go to: https://github.com/Ntp-MD/DiveBuddy.SMO/settings/pages
    echo 2. Source: Deploy from a branch
    echo 3. Branch: gh-pages
    echo 4. Folder: / (root)
    pause
    exit /b 1
)

echo ✅ Deployment successful!
echo.
echo 🌐 Enable GitHub Pages:
echo 1. Go to: https://github.com/Ntp-MD/DiveBuddy.SMO/settings/pages
echo 2. Source: Deploy from a branch
echo 3. Branch: gh-pages
echo 4. Folder: / (root)
echo.
echo 🎯 Your site will be available at:
echo https://ntp-md.github.io/DiveBuddy.SMO/
echo.
echo ⏱️ Note: It may take 1-2 minutes for the site to be live.
pause
