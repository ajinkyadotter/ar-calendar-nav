# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AR Calendar Navigation"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables:**
   In Vercel project settings, add these environment variables:
   - `GOOGLE_CLIENT_ID` - Your Google OAuth Client ID
   - `GOOGLE_CLIENT_SECRET` - Your Google OAuth Client Secret
   - `GOOGLE_REDIRECT_URI` - `https://your-project.vercel.app/api/auth/callback`
   - `NEXT_PUBLIC_BASE_URL` - `https://your-project.vercel.app`

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live!

### Option 2: Deploy via CLI

1. **Login to Vercel:**
   ```bash
   npx vercel login
   ```

2. **Deploy:**
   ```bash
   npx vercel --prod
   ```

3. **Set Environment Variables:**
   ```bash
   npx vercel env add GOOGLE_CLIENT_ID
   npx vercel env add GOOGLE_CLIENT_SECRET
   npx vercel env add GOOGLE_REDIRECT_URI
   npx vercel env add NEXT_PUBLIC_BASE_URL
   ```

4. **Redeploy with new env vars:**
   ```bash
   npx vercel --prod
   ```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google Calendar API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback` (for local dev)
   - `https://your-project.vercel.app/api/auth/callback` (for production)
7. Copy Client ID and Client Secret to environment variables

## Testing Locally

1. Create `.env.local` file:
   ```env
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

2. Run `npm run dev`
3. Open `http://localhost:3000`

