# 🚀 Guide de Déploiement - WhatsApp Form

## 📋 Prérequis
- Node.js (version 16 ou plus récente)
- Un serveur VPS ou hébergement web
- Un domaine configuré

## 🔧 Options de déploiement

### Option 1: VPS/Serveur dédié (Recommandé)

#### 1. Préparer le serveur
```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PM2 pour la gestion des processus
sudo npm install -g pm2
```

#### 2. Uploader les fichiers
```bash
# Copier les fichiers du projet sur le serveur
scp -r project/ user@votre-serveur.com:/home/user/whatsapp-form/
```

#### 3. Configuration sur le serveur
```bash
# Se connecter au serveur
ssh user@votre-serveur.com

# Aller dans le dossier du projet
cd /home/user/whatsapp-form/

# Installer les dépendances
npm install

# Construire le projet
npm run build

# Configurer les variables d'environnement
export TELEGRAM_BOT_TOKEN="8250956322:AAFFs-E5EknzIss5ohGx2c7fthZNpNADLrI"
export TELEGRAM_CHAT_ID="1323053571"
export PORT="3000"
export NODE_ENV="production"

# Démarrer avec PM2
pm2 start server.js --name "whatsapp-form"
pm2 save
pm2 startup
```

### Option 2: Heroku (Gratuit)

#### 1. Installer Heroku CLI
```bash
# Windows
winget install Heroku.HerokuCLI

# Ou télécharger depuis: https://devcenter.heroku.com/articles/heroku-cli
```

#### 2. Créer l'application
```bash
# Se connecter à Heroku
heroku login

# Créer une nouvelle app
heroku create votre-nom-app

# Configurer les variables d'environnement
heroku config:set TELEGRAM_BOT_TOKEN="8250956322:AAFFs-E5EknzIss5ohGx2c7fthZNpNADLrI"
heroku config:set TELEGRAM_CHAT_ID="1323053571"
heroku config:set NODE_ENV="production"

# Déployer
git add .
git commit -m "Deploy to production"
git push heroku main
```

### Option 3: Vercel (Gratuit)

#### 1. Installer Vercel CLI
```bash
npm install -g vercel
```

#### 2. Déployer
```bash
# Dans le dossier du projet
vercel

# Suivre les instructions
# Configurer les variables d'environnement dans le dashboard Vercel
```

### Option 4: Netlify (Gratuit)

#### 1. Créer un fichier netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2. Déployer via drag & drop
- Aller sur netlify.com
- Glisser le dossier `dist` dans la zone de déploiement
- Configurer les variables d'environnement

## 🌐 Configuration du domaine

### 1. DNS
- Pointer votre domaine vers l'IP du serveur
- Ou utiliser un sous-domaine (ex: app.votre-domaine.com)

### 2. SSL/HTTPS
```bash
# Avec Let's Encrypt (gratuit)
sudo apt install certbot
sudo certbot --nginx -d votre-domaine.com
```

### 3. Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name votre-domaine.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 Sécurité

### Variables d'environnement
- Ne jamais commiter les tokens dans le code
- Utiliser des variables d'environnement
- Changer les tokens régulièrement

### Firewall
```bash
# Configurer UFW
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## 📊 Monitoring

### PM2 Monitoring
```bash
# Voir les processus
pm2 list

# Voir les logs
pm2 logs whatsapp-form

# Redémarrer
pm2 restart whatsapp-form
```

## 🚨 Dépannage

### Problèmes courants
1. **Port déjà utilisé**: Changer le PORT dans les variables d'environnement
2. **CORS errors**: Vérifier la configuration CORS dans server.js
3. **Telegram API errors**: Vérifier le token et chat ID
4. **Build errors**: Vérifier les dépendances Node.js

### Logs utiles
```bash
# Logs du serveur
pm2 logs whatsapp-form

# Logs système
sudo journalctl -u nginx

# Logs d'erreur
tail -f /var/log/nginx/error.log
```

## 📞 Support
En cas de problème, vérifier :
1. Les variables d'environnement
2. Les logs du serveur
3. La configuration DNS
4. Le firewall
5. Les permissions des fichiers
