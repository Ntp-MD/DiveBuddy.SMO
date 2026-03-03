# 🚀 Manual Deployment Guide for DiveBuddy.SMO

## 📋 Prerequisites

1. **GitHub CLI installed** (or use git commands)
2. **Repository exists**: https://github.com/Ntp-MD/DiveBuddy.SMO
3. **Repository is PUBLIC** (required for free GitHub Pages)

## 🔧 Step-by-Step Manual Deployment

### Option 1: Using GitHub CLI (Recommended)

#### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

#### Step 2: Login to GitHub
```bash
gh auth login
```

#### Step 3: Build and Deploy
```bash
# Clean build
npm run build

# Deploy to gh-pages branch
gh-pages --dist dist --repo https://github.com/Ntp-MD/DiveBuddy.SMO.git --branch gh-pages --dotfiles
```

### Option 2: Using Git Commands

#### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

#### Step 2: Add deploy script to package.json
```json
{
  "scripts": {
    "deploy-manual": "npm run build && gh-pages --dist dist --repo https://github.com/Ntp-MD/DiveBuddy.SMO.git --branch gh-pages --dotfiles"
  }
}
```

#### Step 3: Deploy
```bash
npm run deploy-manual
```

### Option 3: Quick Deploy Script

#### Windows:
```cmd
quick-deploy.bat
```

#### Unix/Mac:
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🌐 Enabling GitHub Pages

### After Deployment:

1. **Go to repository**: https://github.com/Ntp-MD/DiveBuddy.SMO
2. **Settings** → **Pages**
3. **Source**: Select "Deploy from a branch"
4. **Branch**: Select `gh-pages`
5. **Folder**: `/ (root)`
6. **Save**

### Your Site Will Be Available At:
**https://ntp-md.github.io/DiveBuddy.SMO/**

## 🔍 Troubleshooting Manual Deployment

### Permission Denied:
```bash
# Make sure you're logged in
gh auth login

# Or use personal access token
git remote set-url origin https://YOUR_TOKEN@github.com/Ntp-MD/DiveBuddy.SMO.git
```

### Branch Already Exists:
```bash
# Force push to gh-pages branch
gh-pages --dist dist --repo https://github.com/Ntp-MD/DiveBuddy.SMO.git --branch gh-pages --dotfiles --force
```

### 404 Errors After Deploy:
1. **Wait 2-3 minutes** (GitHub Pages needs time to update)
2. **Clear browser cache**: Ctrl+F5
3. **Check base path** in vite.config.ts: `/DiveBuddy.SMO/`

## 📊 Deployment Verification

### Check Files Deployed:
```bash
# List files on gh-pages branch
git checkout gh-pages
ls -la
git checkout main
```

### Check Live Site:
1. Visit: https://ntp-md.github.io/DiveBuddy.SMO/
2. Open browser dev tools (F12)
3. Check Network tab for 404 errors
4. Console should show no asset loading errors

## 🎯 Expected Results

### Successful Deployment:
```
✅ All assets load correctly
✅ No 404 errors in console
✅ Full DiveBuddy.SMO website displays
✅ Responsive design works on mobile
✅ All interactive elements function
```

### File Structure After Deploy:
```
gh-pages branch:
├── index.html
├── assets/
│   ├── index-xxx.js
│   ├── index-xxx.css
│   └── vendor-xxx.js
└── pov-on-bleach-xxx.mp4
```

## ⚡ Quick Commands

### One-Line Deploy:
```bash
npm run build && npx gh-pages --dist dist --repo https://github.com/Ntp-MD/DiveBuddy.SMO.git --branch gh-pages --dotfiles
```

### Clean Deploy:
```bash
rm -rf dist && npm run build && npx gh-pages --dist dist --repo https://github.com/Ntp-MD/DiveBuddy.SMO.git --branch gh-pages --dotfiles --force
```

## 🌊 Success!

After following these steps, your DiveBuddy.SMO website will be live at:
**https://ntp-md.github.io/DiveBuddy.SMO/**

The manual deployment gives you full control and bypasses GitHub Actions if needed! 🎉
