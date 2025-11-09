# Quick Vercel Deployment Script
Write-Host "🚀 Deploying AR Calendar Navigation to Vercel..." -ForegroundColor Green

# Check if logged in
Write-Host "`nChecking Vercel authentication..." -ForegroundColor Yellow
$loginCheck = npx vercel whoami 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n⚠️  Not logged in to Vercel. Please login first:" -ForegroundColor Yellow
    Write-Host "   npx vercel login" -ForegroundColor Cyan
    Write-Host "`nThen run this script again or deploy manually:" -ForegroundColor Yellow
    Write-Host "   npx vercel --prod" -ForegroundColor Cyan
    exit 1
}

Write-Host "✓ Authenticated" -ForegroundColor Green

# Deploy
Write-Host "`n📦 Deploying to Vercel..." -ForegroundColor Yellow
npx vercel --prod --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Deployment successful!" -ForegroundColor Green
    Write-Host "`n⚠️  Don't forget to add environment variables in Vercel dashboard:" -ForegroundColor Yellow
    Write-Host "   - GOOGLE_CLIENT_ID" -ForegroundColor Cyan
    Write-Host "   - GOOGLE_CLIENT_SECRET" -ForegroundColor Cyan
    Write-Host "   - GOOGLE_REDIRECT_URI (your Vercel URL + /api/auth/callback)" -ForegroundColor Cyan
    Write-Host "   - NEXT_PUBLIC_BASE_URL (your Vercel URL)" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Deployment failed. Check the error above." -ForegroundColor Red
}

