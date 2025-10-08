#!/bin/bash

# Script de déploiement pour Render
echo "🚀 Déploiement du projet WhatsApp Form sur Render..."

# Vérification des variables d'environnement
if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
    echo "❌ ERREUR: TELEGRAM_BOT_TOKEN n'est pas défini"
    echo "📝 Ajoutez votre token de bot Telegram dans les variables d'environnement Render"
    exit 1
fi

if [ -z "$TELEGRAM_CHAT_ID" ]; then
    echo "❌ ERREUR: TELEGRAM_CHAT_ID n'est pas défini"
    echo "📝 Ajoutez votre chat ID Telegram dans les variables d'environnement Render"
    exit 1
fi

echo "✅ Variables d'environnement configurées"
echo "🤖 Bot Token: ${TELEGRAM_BOT_TOKEN:0:10}..."
echo "💬 Chat ID: $TELEGRAM_CHAT_ID"

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

# Build du projet
echo "🔨 Construction du projet..."
npm run build

# Test de la configuration Telegram
echo "🧪 Test de la configuration Telegram..."
node -e "
const fetch = require('node-fetch');
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

fetch(\`https://api.telegram.org/bot\${token}/sendMessage\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: chatId,
    text: '🚀 **DÉPLOIEMENT RÉUSSI !**\\n\\n✅ Le bot WhatsApp Form est maintenant en ligne\\n🌐 Prêt à recevoir les données\\n🕒 ' + new Date().toLocaleString('fr-FR')
  })
})
.then(res => res.json())
.then(data => {
  if (data.ok) {
    console.log('✅ Test Telegram réussi !');
  } else {
    console.log('❌ Erreur Telegram:', data);
  }
})
.catch(err => console.log('❌ Erreur:', err));
"

echo "🎉 Déploiement terminé !"
echo "🌐 Votre application est accessible sur Render"
echo "📱 Testez avec: https://votre-app.onrender.com/api/telegram/test"