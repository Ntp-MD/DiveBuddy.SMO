# DiveBuddy.SMO - GitHub Pages Deployment

## 🚀 Deployment Instructions

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit - DiveBuddy.SMO Vue.js application"
```

### 2. Create GitHub Repository
1. Go to https://github.com/Ntp-MD/
2. Click "New repository"
3. Repository name: `divebuddy-smo`
4. Description: `Modern diving company landing page built with Vue 3, TypeScript, and Vite`
5. Set to Public (required for GitHub Pages)
6. Click "Create repository"

### 3. Connect Local Repository to GitHub
```bash
git remote add origin https://github.com/Ntp-MD/divebuddy-smo.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages
1. Go to your repository: https://github.com/Ntp-MD/divebuddy-smo
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Build and deployment", select "GitHub Actions"
5. GitHub Actions will automatically detect and use the deploy.yml workflow

### 5. Automatic Deployment
- **Trigger**: Every push to `main` branch
- **Build**: Ubuntu runner with Node.js 18
- **Deploy**: Automatic deployment to GitHub Pages
- **URL**: https://ntp-md.github.io/divebuddy-smo/

### 6. Manual Deployment (Alternative)
```bash
# Install gh-pages locally
npm install --save-dev gh-pages

# Build and deploy
npm run build-and-deploy
```

## 📋 Project Configuration

### Vite Configuration (vite.config.ts)
- Base path: `/divebuddy-smo/`
- Build optimization: Enabled
- Source maps: Enabled
- Code splitting: Vue vendor chunk

### GitHub Actions Workflow (.github/workflows/deploy.yml)
- Trigger: Push to main branch
- Node.js version: 18
- Build command: `npm run build`
- Deploy directory: `./dist`
- Automatic deployment to GitHub Pages

## 🌐 Live Site
Once deployed, your site will be available at:
**https://ntp-md.github.io/divebuddy-smo/**

## 🔧 Troubleshooting

### If deployment fails:
1. Check GitHub Actions logs
2. Ensure repository is public
3. Verify GitHub Pages is enabled
4. Check base path in vite.config.ts

### If 404 errors occur:
1. Verify base path matches repository name
2. Check router configuration (if using Vue Router)
3. Ensure all assets are properly referenced

### If styles don't load:
1. Check CSS file paths
2. Verify base path configuration
3. Check asset references in HTML

## 📊 Deployment Status

- ✅ **GitHub Actions Workflow**: Configured
- ✅ **Vite Build**: Optimized for production
- ✅ **Base Path**: Set for GitHub Pages
- ✅ **Auto-deployment**: Enabled on main branch
- 🔄 **First Deployment**: Pending repository creation

## 🎯 Next Steps

1. Create the GitHub repository
2. Push the code
3. Enable GitHub Pages
4. Watch the automatic deployment
5. Test the live site

The deployment is fully automated and will update on every push to the main branch!
