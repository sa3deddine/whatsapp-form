@echo off
echo 🚀 Démarrage du projet WhatsApp Form...
echo.
echo 📦 Installation des dépendances...
call npm install
echo.
echo 🔨 Construction du projet...
call npm run build
echo.
echo 🌐 Démarrage du serveur...
echo ✅ Le projet sera accessible sur: http://localhost:5176
echo ✅ Appuyez sur Ctrl+C pour arrêter le serveur
echo.
call npm start
pause
