#!/bin/bash

# DiveBuddy.SMO GitHub Pages Deployment Script

echo "🚀 Starting DiveBuddy.SMO GitHub Pages Deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - DiveBuddy.SMO Vue.js application"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Adding GitHub remote..."
    git remote add origin https://github.com/Ntp-MD/divebuddy-smo.git
fi

# Build the project
echo "🔨 Building project for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📤 Ready to deploy to GitHub Pages"
    echo ""
    echo "🌐 Next steps:"
    echo "1. Push to GitHub: git push -u origin main"
    echo "2. Enable GitHub Pages in repository settings"
    echo "3. Your site will be available at: https://ntp-md.github.io/divebuddy-smo/"
    echo ""
    echo "🎯 Automatic deployment is configured via GitHub Actions!"
else
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi
