# Configuration pour le déploiement sur Render

## Variables d'environnement requises sur Render :

### 1. TELEGRAM_BOT_TOKEN
- Votre token de bot Telegram (obtenu via @BotFather)
- Format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

### 2. TELEGRAM_CHAT_ID
- Votre ID de chat Telegram (obtenu via @userinfobot)
- Format: `123456789` ou `-123456789` (pour les groupes)

## Instructions de configuration sur Render :

1. **Connectez votre repository GitHub à Render**
2. **Dans les paramètres de déploiement, ajoutez les variables d'environnement :**
   - `TELEGRAM_BOT_TOKEN` = votre_token_bot
   - `TELEGRAM_CHAT_ID` = votre_chat_id

3. **Build Command :**
   ```bash
   npm install && npm run build
   ```

4. **Start Command :**
   ```bash
   node server.js
   ```

5. **Node Version :** 18.x ou plus récent

## Test de la configuration :

Une fois déployé, testez avec :
- `https://votre-app.onrender.com/api/telegram/test`

## Logs et débogage :

Les logs détaillés sont maintenant activés pour :
- ✅ Réception des données
- ✅ Envoi vers Telegram
- ✅ Erreurs de configuration
- ✅ Informations sur l'IP et le device

## Fonctionnalités améliorées :

- 📱 **Messages formatés** avec Markdown
- 🌍 **Détection du pays** (si Cloudflare)
- 📱 **Détection mobile/desktop**
- 🔗 **Source de référence**
- ⏰ **Horodatage précis**
- 🔒 **Sécurité renforcée**
