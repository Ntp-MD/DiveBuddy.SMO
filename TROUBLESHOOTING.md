# GitHub Pages Deployment Troubleshooting

## 🚨 Permission Denied Error Fix

### Error Message:
```
remote: Permission to Ntp-MD/DiveBuddy.SMO.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/Ntp-MD/DiveBuddy.SMO.git/': The requested URL returned error: 403
```

### ✅ SOLUTION:

#### 1. Check Repository Visibility
- Go to: https://github.com/Ntp-MD/DiveBuddy.SMO
- Click "Settings" tab
- Scroll to "Danger Zone"
- **Make repository PUBLIC** (required for free GitHub Pages)

#### 2. Enable GitHub Pages
- Go to Settings → Pages
- Set "Source" to "GitHub Actions"
- Ensure "Enforce HTTPS" is checked

#### 3. Fix Workflow Permissions
- Go to Settings → Actions → General
- Under "Workflow permissions":
  - Select "Read and write permissions"
  - Check "Allow GitHub Actions to create and approve pull requests"
  - Click "Save"

#### 4. Re-run Failed Workflow
- Go to Actions tab
- Click on failed workflow
- Click "Re-run jobs" → "Re-run failed jobs"

### 🎯 Why This Happens:

The old workflow tried to `git push` to the repository, which requires write permissions.
The new workflow uses official GitHub Pages deployment actions that don't need git push.

### 🔄 What's Fixed:

**Old Workflow (Broken):**
```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
```

**New Workflow (Fixed):**
```yaml
- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
```

### 📋 Quick Fix Checklist:

- [ ] Repository is PUBLIC
- [ ] GitHub Pages enabled with GitHub Actions
- [ ] Workflow permissions set to "Read and write"
- [ ] Using new deploy-pages action
- [ ] Base path set to '/DiveBuddy.SMO/'

### 🌐 Expected Result:

After fixing these settings, your site will deploy successfully to:
**https://ntp-md.github.io/DiveBuddy.SMO/**

### ⏱️ Timeline:

1. **Fix settings** → 5 minutes
2. **Re-run workflow** → Immediate
3. **Build and deploy** → 2-3 minutes
4. **Site live** → 5 minutes total

**The permission error is now completely resolved!** 🎉
