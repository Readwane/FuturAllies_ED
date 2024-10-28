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
1. Tous les services doivent-ils se trouver dans le dossier core?
Non , tous les services ne doivent pas se trouver dans le dossier core. Voici une approche recommandée :

Services globaux : Les services partagés dans toute l'application (comme l'authentification, la gestion des utilisateurs, ou des services communs) devraient être dans le dossier core. Ces services sont souvent injectés une seule fois via le module CoreModule.
Services spécifiques aux fonctionnalités : Si un service est propre à une fonctionnalité, comme la gestion des cours ou l'envoi de candidatures, il doit être situé dans le module de cette fonctionnalité. Cela permet de mieux organiser le code et de réduire le couplage entre les différentes parties de l'application.
2. Quels types de services mettre dans coreet lesquels laisser dans les modules spécifiques ?
Services à mettre dans core:

Services partagés à travers toute l'application (authentification, autorisation, gestion d'erreurs, gestion des notifications).
Services globaux comme la gestion de session, la gestion des utilisateurs connectés, ou des configurations globales (thèmes, paramètres d'application).
Services utilitaires (gestion de la logique métier commune, interception des requêtes HTTP via des intercepteurs).
Services à laisser dans les modules spécifiques :

Les services qui sont étroitement liés à une fonctionnalité particulière, comme :
AuthenticationServicedans le moduleauthentication
CourseServicedans le moduleaudition
RecruitmentServicedans le modulerecruitment
Ces services ne sont utilisés qu'au sein de leur propre module et ne doivent nécessairement pas être injectés au niveau global de l'application.
3. Chaque module doit-il avoir son propre routage ?
Pas avant tout , mais c'est souvent recommandé dans les grandes applications modulaires. Cela aide à diviser les responsabilités et permet une gestion plus souple des itinéraires. Voici comment le gérer :

Modules avec leur propre routage : Chaque module spécifique ( authentication, audition, training, recruitment, etc.) peut avoir son propre fichier de routage (par exemple, authentication-routing.module.ts), ce qui permet de configurer les routes spécifiques à ce module et de les charger de manière paresseuse ( lazy chargement ).

Gestion du routage global : Le fichier app-routing.module.tscentralise les routes principales et peut utiliser le lazy chargement pour charger les modules quand cela est nécessaire. Par exemple :


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'courses', loadChildren: () => import('./features/audition/audition.module').then(m => m.AuditionModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' } // Route de fallback
];

Cette approche permet de gérer facilement des modules indépendants tout en optimisant le chargement de l'application.

4. Détail de la structure avec plus de contexte
Voici une version plus détaillée de votre structure avec des exemples de contenu dans chaque répertoire :

src/
├── app/
│   ├── core/                              # Module central de l'application
│   │   ├── guards/                        # AuthGuards, AdminGuards, RouteGuards
│   │   │   ├── auth.guard.ts              # Guard pour la protection des routes
│   │   │   ├── admin.guard.ts             # Guard pour vérifier les rôles d'administrateur
│   │   ├── interceptors/                  # HTTP interceptors (gestion des erreurs, auth)
│   │   │   ├── auth.interceptor.ts        # Intercepteur pour ajouter les tokens aux requêtes
│   │   │   ├── error.interceptor.ts       # Intercepteur pour la gestion des erreurs
│   │   ├── services/                      # Services globaux (auth, utilisateur, config)
│   │   │   ├── auth.service.ts            # Service d'authentification partagé
│   │   │   ├── user.service.ts            # Service pour la gestion des utilisateurs
│   │   │   ├── config.service.ts          # Service pour la configuration globale
│   │   ├── models/                        # Modèles globaux (User, Token, etc.)
│   │   │   ├── user.model.ts
│   │   │   ├── token.model.ts
│   │   │   ├── role.model.ts
│   │   │   ├── notification.model.ts
│   │   ├── constants/                     # Constantes globales (ex: roles, API endpoints)
│   │   │   ├── roles.ts                   # Liste des rôles utilisateur (admin, user, etc.)
│   │   │   ├── endpoints.ts               # Points d'API utilisés dans l'application
│   │   └── core.module.ts                 # Module pour charger les services globaux
│   ├── shared/                            # Composants, pipes et directives partagés
│   │   ├── components/                    # Composants génériques réutilisables
│   │   │   ├── button/                    # Composants bouton (submit, cancel)
│   │   │   │   ├── button.component.ts    # Composant de bouton générique
│   │   │   ├── modal/                     # Modale réutilisable pour dialogues
│   │   │   │   ├── modal.component.ts     # Composant de modal générique
│   │   ├── directives/                    # Directives Angular personnalisées (ex: hide/show)
│   │   │   ├── toggle.directive.ts        # Directive pour afficher/masquer un élément
│   │   ├── pipes/                         # Pipes personnalisés (ex: format date)
│   │   │   ├── date-format.pipe.ts        # Pipe pour formater les dates
│   │   └── shared.module.ts               # Module pour composants, pipes et directives partagés
│   ├── features/                          # Modules spécifiques aux fonctionnalités
│   │   ├── authentication/
│   │   │   ├── components/                # Composants de login, inscription, reset password
│   │   │   │   ├── login.component.ts     # Composant pour la page de connexion
│   │   │   │   ├── register.component.ts  # Composant pour la page d'inscription
│   │   │   ├── services/                  # Services spécifiques à l'authentification
│   │   │   │   ├── login.service.ts       # Service pour gérer les connexions
│   │   │   ├── authentication.module.ts   # Module d'authentification
│   │   │   ├── authentication-routing.module.ts  # Routage pour l'authentification
│   │   ├── audition/                      # Module pour la gestion des cours
│   │   │   ├── components/                # Composants pour cours (liste, détails, filtres)
│   │   │   │   ├── course-list.component.ts # Liste des cours
│   │   │   │   ├── course-detail.component.ts # Détails d'un cours
│   │   │   ├── services/                  # Services de gestion des cours
│   │   │   │   ├── course.service.ts      # Service pour la gestion des cours
│   │   │   ├── audition.module.ts         # Module pour les cours
│   │   │   ├── audition-routing.module.ts # Routage pour les cours
│   │   ├── dashboard/
│   │   │   ├── admin-dashboard/           # Dashboard pour les administrateurs
│   │   │   │   ├── components/
│   │   │   │   │   ├── admin-home.component.ts # Composant pour la page d'accueil admin
│   │   │   │   │   ├── user-management.component.ts # Gestion des utilisateurs
│   │   │   │   ├── services/
│   │   │   │   │   ├── admin.service.ts   # Service pour les fonctionnalités admin
│   │   │   │   └── admin-dashboard.module.ts # Module pour le dashboard admin
│   │   │   ├── user-dashboard/            # Dashboard pour les utilisateurs
│   │   │   │   ├── components/
│   │   │   │   │   ├── user-home.component.ts # Page d'accueil pour les utilisateurs
│   │   │   │   │   ├── progress-tracker.component.ts # Suivi de la progression
│   │   │   │   ├── services/
│   │   │   │   │   ├── user-dashboard.service.ts # Service pour les fonctionnalités user
│   │   │   │   └── user-dashboard.module.ts # Module pour le dashboard utilisateur
│   │   │   ├── employer-dashboard/        # Dashboard pour les employeurs
│   │   │   │   ├── components/
│   │   │   │   │   ├── employer-home.component.ts # Page d'accueil pour les employeurs
│   │   │   │   │   ├── job-postings.component.ts # Gestion des offres d'emploi
│   │   │   │   ├── services/
│   │   │   │   │   ├── employer-dashboard.service.ts # Service pour les fonctionnalités employeurs
│   │   │   │   └── employer-dashboard.module.ts # Module pour le dashboard employeurs
│   │   │   ├── dashboard.module.ts        # Module regroupant les dashboards
│   │   │   ├── dashboard-routing.module.ts # Routage pour les dashboards (avec lazy loading)
│   │   ├── ...
│   ├── layouts/                           # Layouts (public, admin, employeur)
│   │   ├── public-layout/                 # Layout public (login, register)
│   │   │   ├── public-layout.component.ts # Layout des pages publiques
│   │   ├── admin-layout/                  # Layout pour les admins
│   │   │   ├── admin-layout.component.ts  # Layout des pages pour admin
│   │   ├── partner-layout/                # Layout spécifique pour les partenaires
│   ├── app-routing.module.ts              # Fichier de routage principal avec lazy loading
│   └── app.module.ts                      # Module racine de l'application
├── assets/                                # Fichiers statiques (images, styles)
├── environments/                          # Configurations d'environnement (prod, dev)
├── index.html                             # Fichier HTML principal
└── main.ts                                # Point d'entrée de l'application



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
