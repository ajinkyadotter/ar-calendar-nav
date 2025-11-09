# 🚀 Quick Deploy to Vercel (2 minutes)

## Option 1: One-Command Deploy (Easiest)

Just run these commands:

```powershell
cd C:\Users\ajdot\ar-calendar-nav
npx vercel login
npx vercel --prod
```

**That's it!** You'll get your Vercel link immediately.

## Option 2: Via Vercel Dashboard (No CLI needed)

1. Go to: https://vercel.com/new
2. Click "Deploy" (you can drag & drop the `ar-calendar-nav` folder)
3. Or connect GitHub and import the repo
4. Click "Deploy"
5. **Get your link instantly!**

## After Deployment

The app will work with **Demo Mode** immediately - no Google OAuth setup needed!

To enable Google Calendar (optional):
- Add environment variables in Vercel dashboard:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GOOGLE_REDIRECT_URI` (your Vercel URL + `/api/auth/callback`)
  - `NEXT_PUBLIC_BASE_URL` (your Vercel URL)

## Your App Features

✅ **Mobile-optimized** - Perfect for phones
✅ **AR Navigation** - Camera-based wayfinding
✅ **Demo Mode** - Works immediately, no setup
✅ **Google Calendar** - Optional integration

