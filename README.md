# WhatsApp Form - Formulaire d'authentification

## 🚀 Démarrage rapide

### Option 1 : Script automatique (Recommandé)
```bash
# Windows (double-clic)
start.bat

# PowerShell
.\start.ps1
```

### Option 2 : Commandes manuelles
```bash
# Installation des dépendances
npm install

# Construction du projet
npm run build

# Démarrage du serveur
npm start
```

### Option 3 : Mode développement
```bash
# Démarrage avec rechargement automatique
npm run dev
```

## 🌐 URLs d'accès

- **Production :** http://localhost:5176
- **Développement :** http://localhost:5173

## 📁 Structure du projet

```
project/
├── src/
│   ├── components/     # Composants React
│   ├── App.tsx         # Application principale
│   └── main.tsx        # Point d'entrée
├── dist/               # Build de production
├── server.js           # Serveur Express
└── package.json        # Configuration npm
```

## 🎨 Design

Le projet utilise :
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **React Phone Number Input** pour la saisie des numéros
- **Gradients et animations** pour un design moderne

## 🔧 Scripts disponibles

- `npm start` : Build + démarrage serveur
- `npm run dev` : Mode développement avec hot-reload
- `npm run build` : Construction du projet
- `npm run preview` : Aperçu du build
- `npm run setup` : Installation + build automatique

## ✅ Fonctionnalités

- ✅ Interface multilingue (Arabe/Français)
- ✅ Validation des numéros de téléphone
- ✅ Saisie de codes de vérification
- ✅ Intégration Telegram Bot
- ✅ Design responsive
- ✅ Animations fluides
