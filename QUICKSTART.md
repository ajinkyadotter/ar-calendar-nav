# Quick Start - AR Calendar Navigation

## 🚀 Deploy to Vercel (5 minutes)

### Step 1: Get Google OAuth Credentials
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select a project
3. Enable "Google Calendar API"
4. Create OAuth 2.0 credentials
5. Add redirect URI: `https://your-app.vercel.app/api/auth/callback`

### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard (Easiest)**
1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`  
   - `GOOGLE_REDIRECT_URI` (your Vercel URL + `/api/auth/callback`)
   - `NEXT_PUBLIC_BASE_URL` (your Vercel URL)
5. Deploy!

**Option B: Via CLI**
```bash
# Login to Vercel
npx vercel login

# Deploy
cd ar-calendar-nav
npx vercel --prod

# Add environment variables
npx vercel env add GOOGLE_CLIENT_ID
npx vercel env add GOOGLE_CLIENT_SECRET
npx vercel env add GOOGLE_REDIRECT_URI
npx vercel env add NEXT_PUBLIC_BASE_URL

# Redeploy
npx vercel --prod
```

### Step 3: Test
1. Visit your Vercel URL
2. Click "Sign in with Google"
3. Allow calendar access
4. View your meetings
5. Click "Navigate with AR" on any meeting with a location
6. Allow camera permissions
7. Follow the AR indicators!

## 📱 Features
- ✅ Google Calendar integration
- ✅ AR navigation with compass
- ✅ Mobile-optimized UI
- ✅ Real-time meeting room detection
- ✅ Distance indicators

## 🔧 Local Development
```bash
npm install
npm run dev
```

Create `.env.local`:
```env
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

