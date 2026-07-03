# AcroGuess - Devine les acronymes tech !

Un jeu simple où il faut deviner la signification d'acronymes technologiques en mode contre-la-montre.

## ✨ Features

- **Mode contre-la-montre** : 1 minute pour deviner un maximum d'acronymes
- **30+ acronymes tech** : AWS, HDMI, NAT, DNS, TCP, HTTP, API, etc.
- **Design rétro années 80** : Couleurs néon, animations, police pixel art
- **Saisie libre** : Tape la signification complète (tolérance sur la casse et les espaces)
- **Feedback immédiat** : Indication correct/incorrect avec animation
- **Statistiques** : Score final avec nombre de bonnes/mauvaises réponses et pourcentage de réussite

## 🚀 Démarrer localement

```bash
# Cloner le dépôt
git clone https://github.com/jeremySrgt/acroguess.git
cd acroguess

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Le jeu sera disponible à http://localhost:3000
```

## 📦 Déploiement

### Sur Cloudflare Pages

1. Push le code sur GitHub
2. Dans Cloudflare Dashboard, crée un nouveau projet Pages
3. Connecte ton dépôt GitHub
4. Configuration du build :
   - Commande de build : `npm run build`
   - Dossier de sortie : `dist`
   - Environment : Node.js
5. Déploie !

### Sur Vercel

1. Push le code sur GitHub
2. Importe le projet dans Vercel
3. Vercel détectera automatiquement la configuration Vite
4. Déploie !

## 📁 Structure du projet

```
acroguess/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx      # Page d'accueil
│   │   ├── GamePage.jsx      # Page de jeu principale
│   │   └── EndPage.jsx       # Page de fin de partie
│   ├── data/
│   │   └── acronyms.json     # Liste des acronymes
│   ├── styles/
│   │   └── retro.css         # Styles rétro années 80
│   ├── App.jsx               # Composant principal
│   └── main.jsx              # Point d'entrée
├── public/
│   └── favicon.svg           # Icône du site
├── index.html                # HTML principal
├── package.json              # Dépendances
├── vite.config.js            # Configuration Vite
└── README.md                 # Documentation
```

## 🎮 Ajouter des acronymes

Édite le fichier `src/data/acronyms.json` et ajoute de nouveaux objets :

```json
{
  "acronym": "NOUV",
  "meaning": "Nouvelle Signification",
  "category": "Catégorie"
}
```

## 🎨 Personnalisation

- **Durée du jeu** : Modifie `GAME_DURATION` dans `GamePage.jsx`
- **Couleurs** : Modifie les variables CSS dans `:root` dans `retro.css`
- **Police** : Change la police dans `index.html` (actuellement Press Start 2P)

## 🛠 Technologies

- **Frontend** : React 18 + Vite
- **Styling** : CSS pur avec animations
- **Build** : Vite
- **Déploiement** : Cloudflare Pages / Vercel

## 📝 Roadmap (idées futures)

- [ ] Leaderboard global avec Firebase
- [ ] Mode multijoueur en temps réel
- [ ] Thèmes d'acronymes (Cloud, Réseau, Hardware, etc.)
- [ ] Mode entraînement (sans timer)
- [ ] Partage de scores sur les réseaux sociaux
- [ ] Ajout d'acronymes par la communauté
- [ ] Statistiques personnelles (localStorage)
- [ ] Difficulté réglable
- [ ] Son et effets audio

## 📄 License

MIT
Guess Tech acronyms
