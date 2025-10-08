Write-Host "🚀 Démarrage du projet WhatsApp Form..." -ForegroundColor Green
Write-Host ""
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install
Write-Host ""
Write-Host "🔨 Construction du projet..." -ForegroundColor Yellow
npm run build
Write-Host ""
Write-Host "🌐 Démarrage du serveur..." -ForegroundColor Green
Write-Host "✅ Le projet sera accessible sur: http://localhost:5176" -ForegroundColor Cyan
Write-Host "✅ Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Cyan
Write-Host ""
npm start
