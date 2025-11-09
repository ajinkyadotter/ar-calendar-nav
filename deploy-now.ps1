# Quick Vercel Deployment
Write-Host "🚀 Deploying AR Calendar Navigation to Vercel..." -ForegroundColor Green
Write-Host ""

# Check if logged in
$loginCheck = npx vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Not logged in. Logging in now..." -ForegroundColor Yellow
    Write-Host "Please follow the browser prompt to login." -ForegroundColor Cyan
    npx vercel login
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Authenticated!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📦 Deploying to Vercel..." -ForegroundColor Yellow
    Write-Host ""
    
    npx vercel --prod --yes
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Deployment successful!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🎉 Your app is live! Check the URL above." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "💡 Tip: The app works with Demo Mode immediately - no setup needed!" -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "❌ Deployment failed. Try running manually:" -ForegroundColor Red
        Write-Host "   npx vercel --prod" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ Login failed. Please try again." -ForegroundColor Red
}

