# 🚀 Connect GitHub to Vercel - Complete Guide

## Option 1: Using GitHub Web Interface (No Git Installation Needed!)

### Step 1: Create Repository on GitHub
1. Go to: https://github.com/new
2. Repository name: `ar-calendar-nav`
3. Make it **Public** (or Private if you prefer)
4. **DO NOT** initialize with README
5. Click "Create repository"

### Step 2: Upload Files via GitHub Web
1. On your new repository page, click "uploading an existing file"
2. Drag and drop ALL files from `C:\Users\ajdot\ar-calendar-nav` folder
3. **EXCEPT** these folders (don't upload):
   - `node_modules` (too large)
   - `.next` (build files)
4. Commit message: "Initial commit: AR Calendar Navigation"
5. Click "Commit changes"

### Step 3: Connect to Vercel
1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Sign in with GitHub
4. Select `ar-calendar-nav` repository
5. Click "Import"
6. Vercel auto-detects Next.js - click "Deploy"
7. **Wait 1-2 minutes** - you'll get your link!

## Option 2: Install Git (Recommended for future)

If you want to use Git commands:
1. Download Git: https://git-scm.com/download/win
2. Install it
3. Then run the commands in SETUP_GITHUB_VERCEL.md

## Your Vercel Link Will Be:
`https://ar-calendar-nav-xxxxx.vercel.app`

## After Setup:
- Every time you push to GitHub, Vercel auto-deploys!
- Your app is live and shareable!

