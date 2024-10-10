import {
    User, Profile, Subscription, Group, Permission,
    UserGroup, UserPermission, GroupPermission, UserSession,
    UserNavigateLog, Notification, Message, Domain, LearningPath,
    Course, CourseChapter, Lesson, LessonContent, Offer,
    Training, TrainerAssignment, TrainingEvaluation, TrainingFeedback,
    Job, OfferApplication, Internship, Webinar
  } from '../api/models/exportModels.js';
  
  export const resources = [
    {
      resource: User, 
      options: {
        parent: { name: 'User Management', icon: 'User' },
        listProperties: ['username', 'email', 'profileType', 'isSuperuser', 'isActive'], // Vue liste : Affiche le nom d'utilisateur, l'email, le type de profil, superuser et actif.
        editProperties: ['username', 'email', 'password', 'profileType', 'isSuperuser', 'firstName', 'lastName', 'avatarUrl', 'preferredLanguage', 'isStaff', 'isActive'], // Vue édition : Permet de modifier les informations personnelles, les permissions et le profil.
        showProperties: ['username', 'email', 'firstName', 'lastName', 'profileType', 'isSuperuser', 'isStaff', 'isActive', 'dateJoined', 'lastLogin'], // Vue détaillée : Affiche les détails de l'utilisateur, y compris les dates de création et de dernière connexion.
       
      },
    },
    {
      resource: Profile,
      options: {
        parent: { name: 'User Management', icon: 'User' },
        listProperties: ['userId', 'location', 'phone'], // Vue liste : Affiche l'utilisateur, l'emplacement et le numéro de téléphone.
        editProperties: ['bio', 'location', 'birthdate', 'phone'], // Vue édition : Permet de modifier la biographie, l'emplacement, la date de naissance et le téléphone.
        showProperties: ['userId', 'bio', 'location', 'birthdate', 'phone', 'createdAt', 'updatedAt'], // Vue détaillée : Affiche toutes les informations, y compris les dates de création et de mise à jour.
        filterProperties: ['userId', 'location', 'birthdate'], // Filtrage par utilisateur, emplacement et date de naissance.
      },
    },
    {
      resource: Subscription,
      options: {
        parent: { name: 'User Management', icon: 'User' },
        listProperties: ['userId', 'subscriptionType', 'startDate', 'endDate'], // Vue liste : Affiche l'utilisateur, le type d'abonnement, la date de début et la date de fin.
        editProperties: ['userId', 'subscriptionType', 'startDate', 'endDate'], // Vue édition : Permet de modifier l'utilisateur, le type d'abonnement, la date de début et de fin.
        showProperties: ['userId', 'subscriptionType', 'startDate', 'endDate', 'createdAt', 'updatedAt'], // Vue détaillée : Affiche toutes les informations, y compris les dates de création et de mise à jour.
        filterProperties: ['userId', 'subscriptionType', 'startDate', 'endDate'], // Filtrage par utilisateur, type d'abonnement, date de début et de fin.
      },
    },
    {
      resource: Group,
      options: {
        parent: { name: 'User Management', icon: 'User' },
        listProperties: ['name', 'createdAt', 'updatedAt'], // Vue liste : Nom du groupe et les dates de création/mise à jour.
        editProperties: ['name'], // Vue édition : Modification du nom uniquement.
        showProperties: ['name', 'createdAt', 'updatedAt'], // Vue détaillée : Affichage du nom et des informations de création/mise à jour.
        filterProperties: ['name', 'createdAt', 'updatedAt'], // Filtrage basé sur le nom et les dates.
      },
    },
    {
      resource: Permission,
      options: {
        parent: { name: 'User Management', icon: 'User' },
        listProperties: ['name', 'contentTypeId', 'codename'], // Vue liste : Affiche le nom de la permission, le type de contenu, et le codename unique.
        editProperties: ['name', 'contentTypeId', 'codename'], // Vue édition : Permet de modifier le nom, le type de contenu et le codename.
        showProperties: ['name', 'contentTypeId', 'codename', 'createdAt', 'updatedAt'], // Vue détaillée : Affiche toutes les informations, y compris les dates de création et de mise à jour.
        filterProperties: ['name', 'contentTypeId', 'codename'], // Filtrage par nom, type de contenu, et codename unique.
      },
    },
    {
      resource: UserGroup,
      options: {
        parent: { name: 'User Management', icon: 'User' },
        listProperties: ['userId', 'groupId'], // Vue liste : Affiche les ID de l'utilisateur et du groupe auquel il est associé.
        editProperties: ['userId', 'groupId'], // Vue édition : Permet de modifier les associations entre utilisateur et groupe.
        showProperties: ['userId', 'groupId', 'createdAt', 'updatedAt'], // Vue détaillée : Affiche les informations complètes, y compris les dates de création et de mise à jour.
        filterProperties: ['userId', 'groupId'], // Filtrage par utilisateur ou groupe.
      },
    },
    {
      resource: UserPermission,
      options: {
        parent: { name: 'User Management', icon: 'User' }, // Nom et icône pour la gestion des permissions utilisateur
        listProperties: ['userId', 'permissionId', 'createdAt'], // Vue liste : affiche l'utilisateur, la permission et la date de création
        editProperties: ['userId', 'permissionId'], // Vue édition : permet de modifier l'utilisateur et la permission
        showProperties: ['userId', 'permissionId', 'createdAt', 'updatedAt'], // Vue détaillée : affiche toutes les informations y compris les dates de création et de mise à jour
        filterProperties: ['userId', 'permissionId'], // Filtrage par utilisateur et permission
      },
    },
    {
      resource: GroupPermission,
      options: {
        parent: { name: 'User Management', icon: 'User' },
        listProperties: ['groupId', 'permissionId', 'createdAt', 'updatedAt'], // Vue liste : Affiche le groupe, la permission et les dates.
        editProperties: ['groupId', 'permissionId'], // Vue édition : Permet de modifier le groupe et la permission.
        showProperties: ['groupId', 'permissionId', 'createdAt', 'updatedAt'], // Vue détaillée : Affiche le groupe, la permission et les informations de création/mise à jour.
        filterProperties: ['groupId', 'permissionId', 'createdAt'], // Filtrage basé sur le groupe, la permission et la date de création.
      },
    },
    {
      resource: UserSession,
      options: {
        parent: { name: 'User Management', icon: 'User' }, // Nom et icône pour la gestion des sessions utilisateur
        listProperties: ['userId', 'sessionKey', 'expireDate', 'createdAt'], // Vue liste : affiche l'utilisateur, la clé de session, la date d'expiration et la date de création
        editProperties: ['userId', 'sessionKey', 'sessionData', 'expireDate'], // Vue édition : permet de modifier l'utilisateur, la clé de session, les données de session et la date d'expiration
        showProperties: ['userId', 'sessionKey', 'sessionData', 'expireDate', 'createdAt', 'updatedAt'], // Vue détaillée : affiche toutes les informations y compris les dates de création et de mise à jour
        filterProperties: ['userId', 'expireDate'], // Filtrage par utilisateur et date d'expiration
      },
    },
    {
      resource: UserNavigateLog,
      options: {
        parent: { name: 'User Management', icon: 'User' }, // Nom et icône pour la gestion des journaux d'activité utilisateur
        listProperties: ['userId', 'actionTime', 'actionFlag', 'objectRepr'], // Vue liste : affiche l'utilisateur, l'heure de l'action, le drapeau d'action et la représentation de l'objet
        editProperties: ['userId', 'actionTime', 'actionFlag', 'changeMessage'], // Vue édition : permet de modifier l'utilisateur, l'heure de l'action, le drapeau d'action et le message de changement
        showProperties: ['userId', 'actionTime', 'userIp', 'userAgent', 'objectId', 'objectRepr', 'actionFlag', 'changeMessage', 'createdAt', 'updatedAt'], // Vue détaillée : affiche toutes les informations, y compris les dates de création et de mise à jour
        filterProperties: ['userId', 'actionTime', 'actionFlag'], // Filtrage par utilisateur, heure d'action et drapeau d'action
      },
    },
    {
      resource: Notification,
      options: {
        parent: { name: 'User Management', icon: 'User' },
        listProperties: ['userId', 'message', 'isRead', 'createdAt'], // Vue liste : Affiche l'utilisateur, le message, le statut de lecture et la date de création.
        editProperties: ['userId', 'message', 'isRead'], // Vue édition : Permet de modifier l'utilisateur, le message et le statut de lecture.
        showProperties: ['userId', 'message', 'isRead', 'createdAt', 'updatedAt'], // Vue détaillée : Affiche toutes les informations pertinentes.
        filterProperties: ['userId', 'isRead', 'createdAt'], // Filtrage par utilisateur, statut de lecture et date de création.
      },
    },
    {
      resource: Message,
      options: {
        parent: { name: 'User Management', icon: 'User' },
        listProperties: ['senderId', 'receiverId', 'content', 'sentAt'], // Vue liste : Affiche l'expéditeur, le destinataire, le contenu du message, et la date d'envoi.
        editProperties: ['senderId', 'receiverId', 'content'], // Vue édition : Permet de modifier l'expéditeur, le destinataire et le contenu du message.
        showProperties: ['senderId', 'receiverId', 'content', 'sentAt', 'createdAt', 'updatedAt'], // Vue détaillée : Affiche toutes les informations pertinentes.
        filterProperties: ['senderId', 'receiverId', 'sentAt'], // Filtrage par expéditeur, destinataire et date d'envoi.
      },
    },
    // Ressources pour la gestion des cours libres
    {
      resource: Domain,
      options: { parent: { name: 'Catalogue Management', icon: 'Book' }},
    },
    {
      resource: LearningPath,
      options: { parent: { name: 'Catalogue Management', icon: 'Book' }},
    },
    {
      resource: Course,
      options: { parent: { name: 'Catalogue Management', icon: 'Book' }},
    },
    {
      resource: CourseChapter,
      options: { parent: { name: 'Catalogue Management', icon: 'Book' }},
    },
    {
      resource: Lesson,
      options: { parent: { name: 'Catalogue Management', icon: 'Book' }},
    },
    {
      resource: LessonContent,
      options: { parent: { name: 'Catalogue Management', icon: 'Book' }},
    },
    // Ressources pour la gestion des offres (formation, stage, emploi)
    {
      resource: Offer,
      options: {
        parent: { name: 'Offer Management', icon: 'fa fa-bullhorn' },
      },
    },
    {
      resource: Training,
      options: { parent: { name: 'Offer Management', icon: 'fa fa-bullhorn' }},
    },
    {
      resource: Job,
      options: { parent: { name: 'Offer Management', icon: 'fa fa-bullhorn' }},
    },
    {
      resource: Internship,
      options: { parent: { name: 'Offer Management', icon: 'fa fa-bullhorn' }},
    },
    {
      resource: OfferApplication,
      options: { parent: { name: 'Offer Management', icon: 'fa fa-bullhorn' }},
    },
    {
      resource: TrainerAssignment,
      options: { parent: { name: 'Offer Management', icon: 'fa fa-bullhorn' }},
    },
    {
      resource: TrainingEvaluation,
      options: { parent: { name: 'Offer Management', icon: 'fa fa-bullhorn' }},
    },
    {
      resource: TrainingFeedback,
      options: { parent: { name: 'Offer Management', icon: 'fa fa-bullhorn' }},
    },

    // Ressources pour la gestion des webinaires
    {
      resource: Webinar,
      options: {
        parent: { name: 'Webinar Management', icon: 'fa fa-video_call' },
      },
    },
  ];
  