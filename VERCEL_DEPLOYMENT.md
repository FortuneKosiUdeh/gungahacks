# GungaHacks Vercel Deployment - Complete Guide

## Overview

This document provides the **exact step-by-step instructions** to deploy the GungaHacks landing site to Vercel. Follow these steps in order.

## Prerequisites ✓

Before you begin, verify you have:
- ✓ Node.js 18+ installed
- ✓ All dependencies installed (`npm install` completed)
- ✓ Site tested locally (`npm run dev` works)
- ✓ GitHub account
- ✓ Vercel account (free: vercel.com)

## Part 1: Prepare for Deployment

### Step 1.1: Verify the Build Works

Run the production build locally to ensure no errors:

```bash
cd /Users/fortuneudeh/Desktop/gungahacks2
npm run build
```

Expected output:
```
vite v5.4.21 building for production...
✓ 1568 modules transformed.
dist/index.html                   0.64 kB
dist/assets/index-*.css          20.72 kB
dist/assets/index-*.js          334.18 kB
✓ built in 1.13s
```

**What this means**: Your code is production-ready and will build successfully on Vercel.

### Step 1.2: Test the Production Build

Preview what the live site will look like:

```bash
npm run preview
```

Open `http://localhost:4173` in your browser and verify everything looks correct:
- All sections visible and styled properly
- Animations working smoothly
- Form is interactive
- Mobile responsive design working

Press `Ctrl+C` to stop the preview server.

## Part 2: Push Code to GitHub

### Step 2.1: Initialize Git (First Time Only)

If you haven't initialized Git yet:

```bash
cd /Users/fortuneudeh/Desktop/gungahacks2
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Step 2.2: Create a GitHub Repository

1. Go to **https://github.com/new**
2. Fill in:
   - **Repository name**: `gungahacks` (or your preferred name)
   - **Description**: `GungaHacks Spring 2026 - Landing Site`
   - **Privacy**: Public (recommended for portfolios)
3. Click **"Create repository"**
4. You'll see instructions. Copy your repository URL (looks like `https://github.com/yourusername/gungahacks.git`)

### Step 2.3: Push Code to GitHub

Replace `YOUR_REPO_URL` with your actual repository URL from step 2.2:

```bash
cd /Users/fortuneudeh/Desktop/gungahacks2

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: GungaHacks landing site

- Hero section with animations
- Event details and prizes
- FAQ accordion
- Registration form
- Fully responsive design"

# Add remote repository
git remote add origin YOUR_REPO_URL

# Rename branch to main (if not already)
git branch -M main

# Push to GitHub
git push -u origin main
```

Expected output:
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
...
[new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

**Verify**: Go to your GitHub repository URL and confirm your files are there.

## Part 3: Deploy to Vercel

You now have **TWO options**. Choose one:

### OPTION A: Deploy via Vercel Web Dashboard (Easiest - Recommended)

#### Step 3A.1: Connect to Vercel

1. Go to **https://vercel.com/dashboard**
2. Sign in with GitHub (or create free account if needed)
3. Click **"New Project"**

#### Step 3A.2: Import Repository

1. Click **"Continue with GitHub"**
2. Click **"Authorize Vercel"** (if prompted)
3. Search for `gungahacks` in the search box
4. Click your repository to select it
5. Click **"Import"**

#### Step 3A.3: Configure Project

Vercel should **auto-detect** all settings:

```
Framework Preset:     Vite ✓
Build Command:        npm run build ✓
Output Directory:     dist ✓
Install Command:      npm install ✓
Node Version:         18.x ✓
```

If not auto-detected, set them manually as shown above.

**Environment Variables**: Leave empty (not needed for this project)

#### Step 3A.4: Deploy

1. Review settings one more time
2. Click **"Deploy"**
3. Vercel will:
   - Install dependencies
   - Build your site
   - Deploy to production
   - Show deployment URL

This typically takes **30-60 seconds**.

#### Step 3A.5: Access Your Live Site

Once deployment completes, you'll see:
```
Congratulations! Your project has been successfully deployed.
Visit: https://gungahacks-[random].vercel.app
```

**Your site is now LIVE!** 🎉

---

### OPTION B: Deploy via Vercel CLI

If you prefer command-line deployment:

#### Step 3B.1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 3B.2: Deploy

```bash
cd /Users/fortuneudeh/Desktop/gungahacks2
vercel --prod
```

Follow the prompts:
- Select your account
- Confirm project name
- Confirm settings

#### Step 3B.3: Access Your Live Site

Vercel CLI will show your deployment URL. Open it in a browser.

---

## Part 4: Post-Deployment Setup (Optional)

### Configure Custom Domain

If you want to use a custom domain (e.g., `gungahacks.com`):

1. Go to your **project settings** on vercel.com
2. Click **"Settings"** → **"Domains"**
3. Enter your domain name
4. Follow Vercel's DNS instructions for your domain registrar
5. Wait 24-48 hours for DNS to propagate

### Set Up Custom Email

Create a branded email (e.g., `register@gungahacks.com`):
- Use your domain registrar's email service
- Forward to your main email
- Update form submission email in code if needed

### Monitoring

Access your deployment dashboard:
1. Go to **vercel.com/dashboard**
2. Click your `gungahacks` project
3. View:
   - **Deployments**: History of all deploys
   - **Analytics**: Visitor stats and performance
   - **Settings**: Configuration and domains

## Automatic Deployments

Once deployed to Vercel, here's what happens automatically:

### When You Push to GitHub

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel will:
1. Detect the push to `main` branch
2. Automatically run build
3. Deploy new version if successful
4. Show status in GitHub (green check = deployed)

### Viewing Deployment Status

1. Go to **vercel.com/dashboard**
2. Click your project
3. See list of deployments
4. Click any deployment to see build logs

## Troubleshooting

### Build Fails: "Cannot find module"

**Cause**: Dependencies not properly committed

**Solution**:
```bash
# Reinstall locally
npm install

# Commit lock file
git add package-lock.json
git commit -m "Update dependencies"
git push origin main

# Vercel will retry automatically
```

### Blank Page After Deployment

**Cause**: Build succeeded but assets not loading

**Solution**:
```bash
# Check build in Vercel
1. Go to vercel.com/dashboard
2. Click your project
3. Click latest Deployment
4. View "Build Logs" for errors
5. Fix errors locally
6. Push to GitHub
```

### Domain Not Working

**Cause**: DNS not propagated or misconfigured

**Solution**:
```bash
# Wait 24-48 hours
# Verify DNS records match Vercel's instructions
# Check with: nslookup yourdomain.com
# Or use DNS checker: https://dnschecker.org
```

### Site Shows Old Version

**Cause**: Browser cache

**Solution**:
```bash
# Clear browser cache:
# Chrome: Ctrl+Shift+Delete
# Safari: Cmd+Shift+Delete
# Firefox: Ctrl+Shift+Delete

# Or use private/incognito window
```

## Testing Your Deployment

After deployment, verify everything works:

### Functionality Tests
- [ ] Hero section loads with animations
- [ ] Scroll reveals work smoothly
- [ ] Form inputs accept text
- [ ] Registration form validates
- [ ] FAQs expand/collapse
- [ ] All links work
- [ ] Mobile responsive (test on phone)

### Performance Tests
- [ ] Page loads in <3 seconds
- [ ] Animations are smooth (60fps)
- [ ] No console errors (F12)
- [ ] Lighthouse score >85

### Cross-Browser Tests
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile (iOS Safari, Chrome Mobile)

## Updating Your Site

After initial deployment, to make changes:

```bash
# Make changes to files
# Test locally
npm run dev

# Commit changes
git add .
git commit -m "Update: description"
git push origin main

# Vercel automatically deploys!
# Check deployment status at vercel.com/dashboard
```

## Rollback to Previous Version

If you need to revert to a working version:

1. Go to **vercel.com/dashboard** → Your project
2. Click **"Deployments"** tab
3. Find the deployment you want to revert to
4. Click **"..."** menu
5. Select **"Promote to Production"**

Done! Your site is reverted to that version.

## Key Deployment URLs

- **Project Dashboard**: https://vercel.com/dashboard
- **Your Site**: https://gungahacks-[random].vercel.app
- **Project Settings**: https://vercel.com/dashboard/[projectid]/settings
- **Deployment Logs**: https://vercel.com/dashboard/[projectid]/deployments

## Summary

You are now ready to deploy! Follow these steps in order:

1. ✓ Verify build works locally: `npm run build`
2. ✓ Test production: `npm run preview`
3. ✓ Initialize Git: `git init`
4. ✓ Push to GitHub
5. ✓ Deploy to Vercel (Option A or B)
6. ✓ Access your live site
7. ✓ (Optional) Configure custom domain

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev
- **Troubleshooting**: See "Troubleshooting" section above

---

**You're all set! Your GungaHacks landing site is about to go live! 🚀**

*Last updated: December 13, 2025*
