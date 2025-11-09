# 🧭 AR Calendar Navigation

An Augmented Reality navigation app for Google Calendar meeting rooms. Navigate to your meeting locations using AR on mobile devices.

## 🚀 Quick Deploy to Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to:** https://vercel.com/new
2. **Click:** "Import Git Repository" 
3. **Connect GitHub** (if not already connected)
4. **Select:** your `ar-calendar-nav` repository
5. **Click:** "Import"
6. **Click:** "Deploy" (Vercel auto-detects Next.js)
7. **Wait 1-2 minutes** for deployment
8. **Get your link!**

### Method 2: Drag & Drop

1. **Go to:** https://vercel.com/new
2. **Drag & drop** the entire `ar-calendar-nav` folder
3. **Click:** "Deploy"
4. **Get your link!**

## ✨ Features

- 🔐 Google Calendar OAuth integration (optional)
- 📅 View today's meetings with room locations
- 🧭 AR navigation to meeting rooms
- 📱 Mobile-optimized interface
- 🎮 Demo Mode (works immediately, no setup!)
- 🎯 Real-time compass and distance indicators

## 🎮 Demo Mode

The app works immediately with **Demo Mode** - no Google OAuth setup required! Just click "Try Demo Mode" to test the AR navigation feature.

## 🔒 Security

✅ 100% Safe - No viruses, no malware
✅ Open source code
✅ Secure OAuth implementation
✅ No data collection
✅ Read-only calendar access

## 📱 Mobile Optimized

- Responsive design for all screen sizes
- Touch-optimized buttons
- Full-screen AR mode
- Mobile-friendly text sizing

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## 📝 Environment Variables (Optional - for Google Calendar)

Only needed if you want to use real Google Calendar:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `NEXT_PUBLIC_BASE_URL`

See `SETUP_ENV.md` for detailed setup instructions.

## 🚀 Deployment

Deploy to Vercel for free:
- Automatic HTTPS
- Global CDN
- Auto-deploy from GitHub
- Free tier available

## 📄 License

MIT
