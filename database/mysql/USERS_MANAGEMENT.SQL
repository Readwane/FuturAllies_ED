-- Table des utilisateurs : stocke les informations de base des utilisateurs
CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `password` varchar(128) NOT NULL,
    `last_login` datetime DEFAULT NULL,
    `is_superuser` tinyint(1) NOT NULL,
    `username` varchar(150) NOT NULL UNIQUE,
    `first_name` varchar(30) DEFAULT NULL,
    `last_name` varchar(30) DEFAULT NULL,
    `email` varchar(254) NOT NULL,
    `profile_type` ENUM('freemium', 'premium') NOT NULL DEFAULT 'freemium',
    `avatar_url` varchar(255),
    `preferred_language` VARCHAR(10) DEFAULT 'fr',
    `is_staff` tinyint(1) NOT NULL,
    `is_active` tinyint(1) NOT NULL,
    `date_joined` datetime NOT NULL,
    PRIMARY KEY (`id`),
    INDEX (`email`) -- Ajout d'un index sur l'email si vous faites souvent des requêtes par email
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `profiles` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `bio` text,
    `location` varchar(255),
    `birthdate` date,
    `phone` varchar(20),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    INDEX (`user_id`)  -- Ajout de l'index sur user_id
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `subscription` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `start_date` datetime NOT NULL,
    `end_date` datetime,
    `subscription_type` ENUM('freemium', 'premium') DEFAULT 'freemium',
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    INDEX (`user_id`),  -- Ajout de l'index sur user_id
    CHECK (`start_date` < `end_date`) -- Contrainte de validité pour les dates
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Table des groupes (groupes d'utilisateurs) : permet de regrouper les utilisateurs dans des groupes pour la gestion des permissions par groupe.
CREATE TABLE `groups` (
    `id` int(11) NOT NULL AUTO_INCREMENT,             -- Identifiant unique du groupe
    `name` varchar(150) NOT NULL UNIQUE,              -- Nom unique du groupe
    PRIMARY KEY (`id`)                                -- Définition de la clé primaire
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des permissions :  définit les permissions spécifiques que les utilisateurs ou groupes peuvent avoir.
CREATE TABLE `permissions` (
    `id` int(11) NOT NULL AUTO_INCREMENT,             -- Identifiant unique de la permission
    `name` varchar(255) NOT NULL,                     -- Nom de la permission
    `content_type_id` int(11) NOT NULL,               -- Type de contenu auquel s'applique la permission (référence à un modèle)
    `codename` varchar(100) NOT NULL,                 -- Code unique de la permission
    PRIMARY KEY (`id`),                               -- Définition de la clé primaire
    UNIQUE KEY `content_type_id_codename` (`content_type_id`, `codename`)  -- Clé unique combinée pour éviter les doublons
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des relations entre utilisateurs et groupes
CREATE TABLE `user_groups` (
    `id` int(11) NOT NULL AUTO_INCREMENT,             -- Identifiant unique de la relation
    `user_id` int(11) NOT NULL,                       -- Référence à l'utilisateur
    `group_id` int(11) NOT NULL,                      -- Référence au groupe
    PRIMARY KEY (`id`),                               -- Définition de la clé primaire
    UNIQUE KEY `user_id_group_id` (`user_id`, `group_id`),  -- Empêche un utilisateur d'appartenir plusieurs fois au même groupe
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, -- Clé étrangère, supprime la relation si l'utilisateur est supprimé
    FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE -- Clé étrangère, supprime la relation si le groupe est supprimé
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des relations entre utilisateurs et permissions
CREATE TABLE `user_permissions` (
    `id` int(11) NOT NULL AUTO_INCREMENT,             -- Identifiant unique de la relation
    `user_id` int(11) NOT NULL,                       -- Référence à l'utilisateur
    `permission_id` int(11) NOT NULL,                 -- Référence à la permission
    PRIMARY KEY (`id`),                               -- Définition de la clé primaire
    UNIQUE KEY `user_id_permission_id` (`user_id`, `permission_id`),  -- Empêche la duplication d'une même permission pour un utilisateur
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, -- Supprime la relation si l'utilisateur est supprimé
    FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE -- Supprime la relation si la permission est supprimée
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des relations entre groupes et permissions
CREATE TABLE `group_permissions` (
    `id` int(11) NOT NULL AUTO_INCREMENT,             -- Identifiant unique de la relation
    `group_id` int(11) NOT NULL,                      -- Référence au groupe
    `permission_id` int(11) NOT NULL,                 -- Référence à la permission
    PRIMARY KEY (`id`),                               -- Définition de la clé primaire
    UNIQUE KEY `group_id_permission_id` (`group_id`, `permission_id`), -- Empêche un groupe d'avoir plusieurs fois la même permission
    FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,  -- Supprime la relation si le groupe est supprimé
    FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE -- Supprime la relation si la permission est supprimée
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Table de gestion des sessions utilisateur
CREATE TABLE `user_sessions` (
    `user_id` int(11) DEFAULT NULL,  -- Ajout de la référence à l'utilisateur
    `session_key` varchar(40) NOT NULL,               -- Clé unique de session
    `session_data` longtext NOT NULL,                 -- Données de la session
    `expire_date` datetime NOT NULL,                  -- Date d'expiration de la session
    PRIMARY KEY (`session_key`),                       -- Clé primaire sur la clé de session
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des logs d'administration (historique des actions d'administration)
CREATE TABLE `user_navigate_logs` (
    `id` int(11) NOT NULL AUTO_INCREMENT,           -- Identifiant unique du log
    `user_ip` VARCHAR(45) DEFAULT NULL,          -- Adresse IP de l'utilisateur
    `action_time` datetime NOT NULL,                -- Date et heure de l'action
    `user_agent` VARCHAR(255) DEFAULT NULL,     -- Agent utilisateur (navigateur)
    `user_id` int(11) NOT NULL,                    -- Référence à l'utilisateur qui a effectué l'action
    `content_type_id` int(11) DEFAULT NULL,           -- Référence au type de contenu affecté
    `object_id` longtext DEFAULT NULL,                -- Identifiant de l'objet affecté
    `object_repr` varchar(200) NOT NULL,              -- Représentation textuelle de l'objet affecté
    `action_flag` smallint(5) unsigned NOT NULL,      -- Indicateur d'action (ajout, modification, suppression)
    `change_message` text NOT NULL,                   -- Description des modifications effectuées
    PRIMARY KEY (`id`),                               -- Clé primaire
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,  -- Supprime le log si l'utilisateur est supprimé
    FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`) ON DELETE SET NULL -- Définit le contenu à NULL si le type de contenu est supprimé
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `notifications` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `message` TEXT NOT NULL,
    `is_read` BOOLEAN DEFAULT FALSE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX (`user_id`) -- Ajout de l'index sur user_id
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `messages` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `sender_id` INT NOT NULL,
    `receiver_id` INT NOT NULL,
    `content` TEXT NOT NULL,
    `sent_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`receiver_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX (`sender_id`), -- Ajout de l'index sur sender_id
    INDEX (`receiver_id`) -- Ajout de l'index sur receiver_id
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

