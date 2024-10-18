# FuturAllies

## NB: Mettez votre navigateur en langue anglaise pour eviter toute confusion de noms
## Description
FuturAllies est une plateforme de collaboration éducative et professionnelle permettant de guider les étudiants et jeunes professionnels dans leur carrière. Elle intègre des fonctionnalités comme des cours, stages, offres d'emploi, et bien plus.

## Technologies
- Node.js / Django pour l'API
- Angular pour le frontend
- MySQL / MongoDB pour la base de données
- GitHub pour le versionnage de code

## Installation
1. Clonez le projet : `git clone https://github.com/Readwane/FuturAllies.git`
2. Installez les dépendances backend : `npm install`
3. Configurez vos variables d'environnement dans `.env`
4. Lancer le serveur : `npm start`


## Structure du code du projet

. /root_project
. ├── backend/         # Contient le code du backend (Node.js ou Django)
. ├── frontend/        # Contient le code du frontend (Angular)
. ├── api/             # Contient l'API (Node.js)
. ├── docs/            # Documentation du projet
. ├── database/        # Dossiers pour scripts SQL (si nécessaire)
. ├── tests/           # Tests unitaires ou de validation
. ├── scripts/         # Scripts d'automatisation (migrations, déploiement, etc.)
. ├── models/          # Modèles de données (schemas ou entités ORM)
. ├── public/          # Fichiers statiques (images, assets, etc.)
. └── README.md        # Document de présentation du projet

## Structure du code de la partie frontend

src/
├── app/
│   ├── core/
│   │   ├── guards/                # Auth et route guards (protection des routes)
│   │   ├── interceptors/          # HTTP interceptors pour gestion d'auth, erreurs
│   │   ├── services/              # Services partagés (authentification, utilisateur, etc.)
│   │   ├── models/                # Modèles de données (Typescript Interfaces)
│   │   ├── constants/             # Constantes globales de l'application
│   │   └── core.module.ts         # Module central pour injecter des services globaux
│   ├── shared/
│   │   ├── components/            # Composants réutilisables (boutons, modales, etc.)
│   │   ├── directives/            # Directives Angular personnalisées
│   │   ├── pipes/                 # Pipes personnalisés
│   │   └── shared.module.ts       # Module pour les composants/directives/pipes partagés
│   ├── features/
│   │   ├── authentication/
│   │   │   ├── components/        # Composants spécifiques à l'authentification (login, register)
│   │   │   ├── services/          # Services pour la gestion d'authentification (login, register, forgot password)
│   │   │   └── authentication.module.ts # Module d'authentification
│   │   ├── audition/
│   │   │   ├── components/        # Composants pour la gestion des cours (détails des cours)
│   │   │   ├── services/          # Services pour le catalogue (récupération des cours, filtres)
│   │   │   └── audition.module.ts # Module du catalogue
│   │   ├── training/
│   │   │   ├── components/        # Composants pour la gestion offres de formation
│   │   │   ├── services/          # Services pour la gestion offres de formation
│   │   │   └── training.module.ts    # Module des offres (emploi, stage)
│   │   ├── recruitment/
│   │   │   ├── components/        # Composants spécifiques aux recrutement des offres de stage et d'emploi
│   │   │   ├── services/          # Services pour les recrutement des offres de stage et d'emploi
│   │   │   └── recruitment.module.ts # Module pour les partenaires
│   │   ├── dashboard/
│   │   │   ├── admin-dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── admin-dashboard.module.ts
│   │   │   ├── user-dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── user-dashboard.module.ts
│   │   │   ├── employer-dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── employer-dashboard.module.ts
│   │   │   └── dashboard.module.ts # Module regroupant les dashboards
|   |   |   |...
│   ├── layouts/
│   │   ├── public-layout/         # Layout public (page login, signup)
│   │   ├── admin-layout/          # Layout privé (espace utilisateur, employeur)
│   │   ├── partner-layout/        # Layout spécifique aux partenaires
│   │   └── ...                    # Autres layouts (mobile-friendly, etc.)
│   ├── app-routing.module.ts      # Fichier de routage principal de l'application
│   └── app.module.ts              # Module racine de l'application
├── assets/                        # Images, fichiers, etc.
│   ├── styles/                    # Fichiers CSS/SCSS globaux
│   └── i18n/                      # Fichiers de traduction pour l'internationalisation
├── environments/                  # Configurations pour environnements (prod, dev)
├── index.html                     # Fichier HTML principal
└── main.ts                        # Point d'entrée de l'application



# Structure des offres de formation
offre de formations
│   ├── presentielles
│   │   ├── futur-allies ou programme-talent (gratuit)            
│   │   ├── cafe-allies ou Conférences      (gratuit)  
│   │   ├── pack-entreprise ou formation-spéciale  (payant)          
│   ├── webinaires/
│   │   ├── ouvert à tous             (gratuit) 

shared/
|__components/
|  |__bounton/
|  |  |__bounton.component.css
|  |  |__bounton.component.html
|  |  |__bounton.component.spect.ts
|  |  |__bounton.component.ts
|  |__dropdown-link/
|  |  |__dropdown-link.component.css
|  |  |__dropdown-link.component.html
|  |  |__dropdown-link.component.spect.ts
|  |  |__dropdown-link.component.ts
|  |__login-link/
|  |  |__login-link.component.css
|  |  |__login-link.component.html
|  |  |__login-link.component.spect.ts
|  |  |__login-link.component.ts
|  |__simple-link/
|  |  |__simple-link.component.css
|  |  |__simple-link.component.html
|  |  |__simple-link.component.spect.ts
|  |  |__simple-link.component.ts
|__models/
|  |__bounton.model.ts
|  |__simple-link.model.ts
|  |__dropdown-link.model.ts
|  |__login-link.model.ts
|__shared-routing.module.ts
|__shared.module.ts
|__shared.service.spect.ts
|__sharedd.service.ts


src/
├── app/
│   ├── features/
│   │   ├── dashboard/
│   │   │   ├── admin-dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── admin-dashboard.module.ts
│   │   │   ├── user-dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── user-dashboard.module.ts
│   │   │   ├── employer-dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── employer-dashboard.module.ts
│   │   │   └── dashboard.module.ts # Module regroupant les dashboards




## Contributions
1. cloner le projet à partir de la branche develop: `git clone https://github.com/Readwane/FuturAllies.git`

2. Aller dans la branch develop: `git checkout develop`

3. Créez une nouvelle branche de developpment de fonctionnalité: `git checkout -b feature/nom-fonctionnalite`

4. Faites vos modifications dans cette branch

5. Poussez d'abord vos apports dans la branche `feature/nom-fonctionnalite`
   - ``git add .`` # pour ajouter toutes les modifications
   - ``git commit -m "Commentaire sur votre commit"`` # pour commiter votre travail
   - ``git push origin feature/nom-fonctionnalite`` # Pour deposer votre modification dans cette branche

6. Pousser ensuite dans la branche develop si votre travail merite d'etre dans cette branche
   - ``git checkout develop`` # Pour basculer sur la branche develop
   - ``git pull origin develop`` # Pour recuperer les dernières modifications de develop
   - ``git merge feature/nom-fonctionnalite`` # Pour fusionner la branche feature/nom-fonctionnalite_que_vous_voulez_contribuer dans develop
   - ``git push origin develop`` # git push origin develop

7. La branche feature/nom-fonctionnalite_que_vous_voulez_contribuer peut etre supprimer si vous avez fini d'apporter votre contribution de fonctionnalié par:
   - ``git branch -d feature/nom-fonctionnalite`` # pour supprimer localement la branche
   - ``git push origin --delete feature/nom-fonctionnalite`` # Pour supprimer la branche du depot distant

8. Une fois jugé propre, le code dans la branche develop peut etre pousser dans la branche main pour après contribuer à une release de l'application
Pour cela on procède comme suite (Bien avec le consentement des propritaires du depot):
    - demander une pull requeste directement dans github et proceder à la fusion
    - le faire a travers les commandes git:
         - ``git checkout main`` # pivoter sur la branche main
         -`` git pull origin main``
         - ``git merge develop``
         - ``git push origin develop``



Pour la gestion de tout le contenu et des services de la plateforme FuturAllies, les bonnes pratiques en matière de gestion et de structuration de tableaux de bord suggèrent généralement de diviser les tableaux de bord en plusieurs catégories. Voici les principaux types de tableaux de bord qui seraient pertinents pour une plateforme comme FuturAllies :

1. Tableau de bord Administrateur Général
Objectif : Fournir une vue d'ensemble sur les statistiques globales de la plateforme.
Contenu :
Nombre total d'utilisateurs (Freemium, Premium)
Statistiques de fréquentation de la plateforme (visites, utilisateurs actifs)
Revenus générés (abonnements premium, paiements pour formations, etc.)
Performance des serveurs (état des services, latence, uptime)
Alertes de sécurité et incidents.
Utilisateurs Cibles : Administrateur de la plateforme.
2. Tableau de bord Utilisateur (Apprenant)
Objectif : Permettre aux apprenants de suivre leur progression dans les cours et les parcours de formation.
Contenu :
Cours en cours et terminés
Certifications obtenues
Progression dans les parcours (pourcentage de complétion, temps passé)
Notifications (nouveaux cours, mises à jour)
Historique des paiements et abonnements.
Utilisateurs Cibles : Apprenants.
3. Tableau de bord Formateur/Intervenant
Objectif : Permettre aux formateurs de gérer leurs cours et de suivre la progression de leurs apprenants.
Contenu :
Liste des cours proposés
Statistiques sur l'engagement des apprenants (nombre d'inscrits, taux de complétion)
Feedbacks et évaluations des cours
Gestion des ressources (ajout/modification de contenus)
Notifications concernant les questions des apprenants.
Utilisateurs Cibles : Formateurs et intervenants.
4. Tableau de bord Employeur/Entreprise Partenaire
Objectif : Offrir aux entreprises un espace pour gérer les offres d'emploi et de stage, et suivre les candidatures.
Contenu :
Gestion des offres publiées (stage, emploi)
Liste des candidats et état de leurs candidatures
Statistiques sur les candidatures (nombre de candidatures, profil des candidats)
Options de communication avec les candidats (messagerie interne).
Utilisateurs Cibles : Employeurs, entreprises partenaires.
5. Tableau de bord Gestionnaire de Contenus
Objectif : Faciliter la gestion de tous les contenus de la plateforme (cours, vidéos, documents).
Contenu :
Liste des cours et modules de formation
Gestion des catégories de contenu (ajout, modification, suppression)
Statistiques d'engagement sur chaque contenu (nombre de vues, taux de complétion)
Historique des modifications et mises à jour.
Utilisateurs Cibles : Équipe de gestion des contenus.
6. Tableau de bord Financier
Objectif : Gérer les aspects financiers liés aux paiements, abonnements, et flux de trésorerie.
Contenu :
Suivi des revenus (abonnements premium, formations, autres services)
Tableau de suivi des paiements et factures
Relevés mensuels, trimestriels et annuels
Gestion des remboursements et réclamations.
Utilisateurs Cibles : Comptable, responsable financier.
7. Tableau de bord Support/Service Client
Objectif : Permettre une gestion efficace des demandes de support des utilisateurs.
Contenu :
Liste des tickets de support ouverts, en cours, et résolus
Temps de réponse moyen
Statistiques sur les types de problèmes rencontrés
Outils de communication directe avec les utilisateurs (chat, email).
Utilisateurs Cibles : Équipe de support client.
Conclusion
Les 7 types de tableaux de bord ci-dessus permettent de couvrir les différents aspects de la gestion de la plateforme FuturAllies. Cette segmentation permet de mieux répondre aux besoins spécifiques de chaque groupe d'utilisateurs (administrateurs, apprenants, formateurs, entreprises, gestionnaires de contenu, équipe financière, support client) et de maintenir une gestion efficace et structurée de la plateforme.

src/
├── app/
│   ├── features/
│   │   ├── dashboard/
│   │   │   ├── admin-dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── admin-dashboard.module.ts
│   │   │   ├── content-Manager-dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── user-dashboard.module.ts
│   │   │   ├── content-Manager-dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── content-Manager-dashboard.module.ts
│   │   │   ├── user-dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── user-dashboard.module.ts
│   │   │   ├── employer-dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── employer-dashboard.module.ts
│   │   │   ├── service-support-dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── service-support-dashboard.module.ts
│   │   │   └── dashboard.module.ts # Module regroupant les dashboards
