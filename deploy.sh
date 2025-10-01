#!/bin/bash
# Script de déploiement pour le projet WhatsApp Form

echo "🚀 Démarrage du déploiement..."

# 1. Build du projet React
echo "📦 Construction du projet React..."
npm run build

# 2. Installation des dépendances de production
echo "📥 Installation des dépendances..."
npm install --production

# 3. Démarrage du serveur
echo "🌐 Démarrage du serveur de production..."
node server.js

echo "✅ Déploiement terminé!"
