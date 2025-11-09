# Environment Setup for Vercel

## Quick Deploy (Choose One Method)

### Method 1: Vercel Dashboard (Easiest - No CLI needed)

1. **Push to GitHub:**
   ```powershell
   cd C:\Users\ajdot\ar-calendar-nav
   git init
   git add .
   git commit -m "AR Calendar Navigation App"
   # Create a repo on GitHub and push
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Add these environment variables:
     ```
     GOOGLE_CLIENT_ID=your_client_id
     GOOGLE_CLIENT_SECRET=your_client_secret
     GOOGLE_REDIRECT_URI=https://your-app.vercel.app/api/auth/callback
     NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
     ```
   - Click Deploy
   - **You'll get your Vercel link immediately!**

### Method 2: Vercel CLI

```powershell
cd C:\Users\ajdot\ar-calendar-nav
npx vercel login
npx vercel --prod
# Then add env vars in Vercel dashboard
```

## Get Google OAuth Credentials

1. Visit: https://console.cloud.google.com/
2. Create project → Enable "Google Calendar API"
3. Create OAuth 2.0 Client ID
4. Add redirect URI: `https://your-app.vercel.app/api/auth/callback`

## Test Locally First

Your app is running at: **http://localhost:3000**

Create `.env.local` to test:
```env
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

