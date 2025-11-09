# 🚀 Connect GitHub to Vercel - Step by Step

## Step 1: Push to GitHub

Run these commands in PowerShell:

```powershell
cd C:\Users\ajdot\ar-calendar-nav
git init
git add .
git commit -m "Initial commit: AR Calendar Navigation App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ar-calendar-nav.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username!**

## Step 2: Connect to Vercel

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account
4. Find and select `ar-calendar-nav` repository
5. Click "Import"
6. Vercel will auto-detect Next.js settings
7. Click "Deploy"

## Step 3: Get Your Link!

After deployment (1-2 minutes), you'll get:
- Production URL: `https://ar-calendar-nav-xxxxx.vercel.app`
- Automatic deployments on every git push!

## That's it! 🎉

Your app will be live and automatically update when you push to GitHub!

