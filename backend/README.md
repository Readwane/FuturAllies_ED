backend/
│
├── api/             
│   ├── routes/               # Définit les routes de l'API
│   │   ├── userRoutes.js     # Routes liées aux utilisateurs
│   │   ├── courseRoutes.js    # Routes liées aux cours
│   │   └── authRoutes.js      # Routes d'authentification
│   │
│   ├── controllers/          # Contient la logique de traitement des requêtes
│   │   ├── userController.js  # Logique pour les utilisateurs
│   │   ├── courseController.js # Logique pour les cours
│   │   └── authController.js   # Logique pour l'authentification
│   │
│   ├── models/               # Modèles de données pour la base de données
│   │   ├── User.js           # Modèle de l'utilisateur
│   │   ├── Course.js         # Modèle des cours
│   │   └── Enrollment.js      # Modèle d'inscription
│   │
│   ├── middlewares/          # Middleware pour l'API
│   │   ├── authMiddleware.js  # Middleware d'authentification
│   │   └── errorMiddleware.js # Middleware de gestion des erreurs
│   │
│   ├── config/               # Fichiers de configuration
│   │   ├── db.js             # Configuration de la base de données
│   │   └── config.js         # Autres configurations (JWT, etc.)
│   │
│   ├── utils/                # Fonctions utilitaires
│   │   └── helpers.js        # Fonctions utilitaires diverses
│   │
│   └── app.js                # Fichier principal de l'API (initialisation de l'app)
│
├── dashboard/               
│   ├── src/                  # Code source du dashboard
│   │   ├── components/       # Composants React (ou autres)
│   │   │   ├── Header.js     # Composant d'en-tête
│   │   │   ├── Footer.js     # Composant de pied de page
│   │   │   ├── CourseList.js  # Composant pour afficher les cours
│   │   │   └── UserList.js    # Composant pour afficher les utilisateurs
│   │   │
│   │   ├── pages/            # Pages principales du dashboard
│   │   │   ├── Dashboard.js   # Page d'accueil du dashboard
│   │   │   ├── UserPage.js    # Page de gestion des utilisateurs
│   │   │   └── CoursePage.js   # Page de gestion des cours
│   │   │
│   │   ├── hooks/            # Hooks personnalisés (si vous utilisez React)
│   │   │   └── useAuth.js     # Hook d'authentification
│   │   │
│   │   ├── styles/           # Styles CSS ou fichiers SASS
│   │   │   └── main.css       # Style principal
│   │   │
│   │   └── index.js          # Point d'entrée de l'application React
│   │
│   ├── public/               # Fichiers publics accessibles
│   │   ├── index.html        # Fichier HTML principal
│   │   └── favicon.ico       # Icône de la page
│   │
│   ├── adminjs/              # Configuration d'AdminJS
│   │   └── adminOptions.js   # Options de configuration d'AdminJS
│   │
│   └── package.json          # Fichier de configuration du dashboard
│
├── package.json              # Fichier de configuration du projet principal
└── server.js                 # Point d'entrée du projet


1. Accès à l'api : http://localhost:3000/fapi/
1. Accès à la page d'administration:  http://localhost:3000/admin