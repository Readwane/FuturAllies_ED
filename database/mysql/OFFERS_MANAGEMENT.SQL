
--****************************** GESTION DES OFFRES *********************************************
-- Cette table stocke les informations communes à toutes les offres.
CREATE TABLE offers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL, -- Titre de l'offre
    description TEXT NOT NULL, -- Description de l'offre
    bg_imgUrl VARCHAR(255), -- Image de fond de l'offre
    requirements TEXT NOT NULL, -- Exigences de l'offre
    location VARCHAR(255) NOT NULL, -- Lieu de l'offre
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de création de l'offre
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Date de mise à jour de l'offre
    offerer_id INT, -- Référence à l'organisateur (partenaire)
    enrollment_deadline DATE NULL, -- Date limite d'inscription
    type ENUM('job', 'internship') NOT NULL, -- Type d'offre (emploi ou stage)
    FOREIGN KEY (offerer_id) REFERENCES partenaires(id) ON DELETE SET NULL -- Lien vers l'organisateur
) ENGINE=InnoDB;


-- Table 'trainings' : stocke les offres de formation
CREATE TABLE trainings (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Identifiant unique de la formation
    domain_id INT, -- Référence au domaine de la formation (clé étrangère vers la table "domains")
    offer_id INT, -- Référence vers l'offre de formation (clé étrangère vers la table "offers")
    title VARCHAR(255) NOT NULL, -- Titre de la formation
    type ENUM('presentiel', 'webinaire') NOT NULL, -- Type de formation
    categorie ENUM('Futur-Allies', 'Café-Allies', 'Pack-Entreprise') NOT NULL, -- Catégorie de formation
    picture_url VARCHAR(255) NULL, -- URL de l'icône de la formation (optionnel)
    description TEXT NOT NULL, -- Description de la formation
    duration VARCHAR(50) NOT NULL, -- Durée de la formation (ex: "10h", "3 jours")
    nb_modules INT NOT NULL, -- Nombre de modules dans la formation
    location VARCHAR(255) NOT NULL, -- Lieu de la formation
    price DECIMAL(10,2) DEFAULT 0.00, -- Prix de la formation (0.00 pour gratuit)
    language VARCHAR(50) NOT NULL DEFAULT 'French', -- Langue de la formation
    level ENUM('beginner', 'intermediate', 'advanced') NOT NULL, -- Niveau de la formation
    max_participants INT NULL, -- Nombre maximum de participants (peut être NULL pour illimité)
    start_date DATE NULL, -- Date de début de la formation (peut être NULL)
    end_date DATE NULL, -- Date de fin de la formation (peut être NULL)
    is_certifiable BOOLEAN DEFAULT FALSE, -- Indique si la formation est certifiable
    is_free BOOLEAN DEFAULT TRUE, -- Indique si la formation est gratuite
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de création de la formation
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Date de mise à jour de la formation
    FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE, -- Lien vers la table "domains"
    FOREIGN KEY (offer_id) REFERENCES offers(id) ON DELETE CASCADE -- Lien vers la table "offers"
) ENGINE=InnoDB;


-- Table 'trainer_assignments' : stocke les formateurs assignés à un cours ou à une offre de formation
CREATE TABLE trainer_assignments (
    user_id INT NOT NULL,                             -- Référence à l'utilisateur
    entity_type ENUM('training', 'course') NOT NULL, -- Type de l'entité (formation ou cours)
    training_id INT,                                  -- Référence à une formation (peut être NULL)
    course_id INT,                                    -- Référence à un cours (peut être NULL)
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,   -- Date d'assignation
    PRIMARY KEY (user_id, training_id, course_id),    -- Clé primaire composite empêchant les doublons
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- Référence à l'utilisateur
    FOREIGN KEY (training_id) REFERENCES trainings(id) ON DELETE CASCADE, -- Référence à la formation
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE, -- Référence au cours
    CHECK (training_id IS NOT NULL OR course_id IS NOT NULL), -- Un des deux doit être renseigné
    CHECK (NOT (training_id IS NOT NULL AND course_id IS NOT NULL)) -- Pas les deux à la fois
);

-- Cette table stocke les evaluations des inscrits à l'issue des formations
CREATE TABLE training_evaluations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    training_id INT NOT NULL, -- Référence à la formation
    method ENUM('quiz', 'project', 'exam') NOT NULL, -- Méthode d'évaluation
    description TEXT NULL, -- Description de la méthode d'évaluation (optionnelle)
    FOREIGN KEY (training_id) REFERENCES trainings(id) ON DELETE CASCADE -- Lien vers la formation
) ENGINE=InnoDB;

-- Cette table stocke les appreciations faites sur la formation.
CREATE TABLE training_feedbacks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    training_id INT NOT NULL, -- Référence à la formation
    feedbacker_id INT NOT NULL, -- Référence à l'acteur qui laisse le feedback (doit être un étudiant inscrit)
    feedback_for ENUM('for_training', 'for_trainer') NOT NULL, -- Type de feedback (pour la formation ou pour le formateur)
    rating INT CHECK (rating >= 1 AND rating <= 5), -- Note de la formation ou du formateur (par exemple de 1 à 5)
    feedback TEXT, -- Le texte du feedback
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date à laquelle le feedback a été laissé
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Date de dernière mise à jour
    FOREIGN KEY (training_id) REFERENCES trainings(id) ON DELETE CASCADE, -- Lien vers la formation
    FOREIGN KEY (feedbacker_id) REFERENCES actors(id) ON DELETE CASCADE -- Lien vers l'acteur qui laisse le feedback
) ENGINE=InnoDB;

-- Cette table stocke les offres d'emplois.
CREATE TABLE jobs (
    id INT PRIMARY KEY, -- Doit être le même que l'ID dans la table `offres`
    salary_range VARCHAR(100), -- Plage salariale (si applicable)
    type ENUM('full_time', 'part_time') NOT NULL, -- Type de contrat
    FOREIGN KEY (id) REFERENCES offers(id) ON DELETE CASCADE -- Lien vers l'offre
) ENGINE=InnoDB;

-- Cette table stocke les offres de stages.
CREATE TABLE internships (
    id INT PRIMARY KEY, -- Doit être le même que l'ID dans la table `offres`
    duration VARCHAR(100), -- Durée du stage
    compensation BOOLEAN DEFAULT FALSE, -- Indique si le stage est rémunéré
    FOREIGN KEY (id) REFERENCES offers(id) ON DELETE CASCADE -- Lien vers l'offre
) ENGINE=InnoDB;

-- Cette table stocke les candidatures des offres
CREATE TABLE offer_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    offer_id INT NOT NULL, -- Référence à l'offre (emploi ou stage)
    applicant_id INT NOT NULL, -- Référence à l'utilisateur qui postule
    application_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de la candidature
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending', -- Statut de la candidature
    FOREIGN KEY (offre_id) REFERENCES offres(id) ON DELETE CASCADE, -- Lien vers l'offre
    FOREIGN KEY (applicant_id) REFERENCES actors(id) ON DELETE CASCADE -- Lien vers l'acteur
) ENGINE=InnoDB;