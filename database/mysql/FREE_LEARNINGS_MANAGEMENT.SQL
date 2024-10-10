
--****************************** GESTION DES COURS LIBRES EN LIGNE *********************************************
-- Table 'domains' : stocke les catégories de cours
CREATE TABLE domains (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    picture_url VARCHAR(255),, -- URL de l'icône du domaine (optionnel)
    description TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
) ENGINE=InnoDB;


-- Table 'learning_paths' : stocke les parcours de formation offerts
CREATE TABLE learning_paths (
    id INT PRIMARY KEY AUTO_INCREMENT,
    domain_id INT, -- Référence au domaine du parcours
    title VARCHAR(255) NOT NULL, -- Titre du parcours
    picture_url VARCHAR(255), -- URL de l'icône du parcours (optionnel)
    description TEXT NOT NULL, -- Description du parcours
    duration VARCHAR(50) NOT NULL, -- Durée du parcours (ex: "6mois", "9mois")
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de création du parcours
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Date de dernière mise à jour
    certification_level ENUM('beginner', 'intermediate', 'advanced') NOT NULL, -- Niveau de certification
    FOREIGN KEY (domain_id) REFERENCES domains(id) -- Clé étrangère vers la table 'domains'
) ENGINE=InnoDB;


-- Table 'courses' : stocke les cours offerts sur la plateforme
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL, -- Titre du cours
    picture_url VARCHAR(255), -- URL de l'icon de la formation (optionnel)
    description TEXT NOT NULL, -- Description du cours
    learning_path_id INT, -- Référence au parcours de formation
    level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner', -- Niveau de difficulté du cours
    duration VARCHAR(50) NOT NULL, -- Durée du cours
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de création du cours
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Dernière date de mise à jour du cours
    is_certifiable BOOLEAN DEFAULT FALSE, -- Indique si le cours est certifiable
    is_online BOOLEAN DEFAULT TRUE, -- Indique si le cours est en ligne
    is_archived  BOOLEAN DEFAULT TRUE, -- Indique si le est toujours en valable ou archivé
    certification_type ENUM('free', 'paid') DEFAULT 'free', -- Type de certification (gratuite ou payante)
    FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id) -- Clé étrangère vers la table 'formations'
) ENGINE=InnoDB;

-- Table 'course_chapters' : divise un cours en plusieurs modules
CREATE TABLE course_chapters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT, -- Référence au cours auquel appartient le module
    title VARCHAR(255) NOT NULL, -- Titre du chapitre
    description TEXT NULL, -- Description du chapitre
    order INT NOT NULL, -- Ordre du chapitre dans le cours
    nb_lessons INT NOT NULL, -- Nombre de leçons dans le chapitre
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de création du chapitre
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Dernière date de mise à jour du chapitre
    FOREIGN KEY (course_id) REFERENCES courses(id) -- Clé étrangère vers la table 'courses'
) ENGINE=InnoDB;

-- Table 'lessons' : chaque module de cours contient plusieurs leçons
CREATE TABLE lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    chapter_id INT, -- Référence au module auquel appartient la leçon
    title VARCHAR(255) NOT NULL, -- Titre de la leçon
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de création de la leçon
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Dernière date de mise à jour de la leçon
    FOREIGN KEY (chapter_id) REFERENCES course_chapters(id) -- Clé étrangère vers la table 'course_chapters'
) ENGINE=InnoDB;

-- Table 'lesson_contents' : stocke les types de contenus d'une leçon
CREATE TABLE lesson_contents(
    id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT NOT NULL, -- Référence à la leçon
    type ENUM('text', 'video') NOT NULL, -- Type du contenu de la leçon
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) -- Clé étrangère vers la table 'lessons'
) ENGINE=InnoDB;

-- Table 'content_texts' : contient les textes des leçons
CREATE TABLE content_texts(
    id INT PRIMARY KEY AUTO_INCREMENT,
    content_id INT NOT NULL, -- Référence au contenu de la leçon
    content TEXT NOT NULL, -- Texte du contenu
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de création du contenu
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Dernière date de mise à jour du contenu
    FOREIGN KEY (content_id) REFERENCES lesson_contents(id) -- Clé étrangère vers la table 'lesson_contents'
) ENGINE=InnoDB;

-- Table 'content_videos' : contient les vidéos des leçons
CREATE TABLE content_videos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    content_id INT NOT NULL, -- Référence au contenu de la leçon
    content_url VARCHAR(255) NULL, -- URL du contenu vidéo (optionnel)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de création de la vidéo
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Dernière date de mise à jour de la vidéo
    FOREIGN KEY (content_id) REFERENCES lesson_contents(id) -- Clé étrangère vers la table 'lesson_contents'
) ENGINE=InnoDB;

-- Table 'quizzes' : associe un quiz à un chapitre spécifique
CREATE TABLE quizzes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    chapter_id INT, -- Référence au module auquel le quiz est associé
    title VARCHAR(255) NOT NULL, -- Titre du quiz
    competency_assessed VARCHAR(255) NOT NULL, -- Compétence évaluée par le quiz : C'est le titre du chapitre concerné
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de création du quiz
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Dernière date de mise à jour du quiz
    FOREIGN KEY (chapter_id) REFERENCES course_chapters(id) -- Clé étrangère vers la table 'course_chapters'
) ENGINE=InnoDB;

-- Table 'questions' : stocke les questions des quiz
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order INT NOT NULL, -- Ordre de la question dans le quiz
    quiz_id INT, -- Référence au quiz auquel la question appartient
    title TEXT NOT NULL, -- Texte de la question
    question_type ENUM('multiple_choice', 'one_choice') NOT NULL, -- Type de la question
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de création de la question
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Dernière date de mise à jour de la question
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) -- Clé étrangère vers la table 'quizzes'
) ENGINE=InnoDB;

-- Table 'answers' : stocke les réponses possibles pour chaque question
CREATE TABLE answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT, -- Référence à la question associée
    answer_text TEXT NOT NULL, -- Texte de la réponse
    is_correct BOOLEAN DEFAULT FALSE, -- Indique si la réponse est correcte
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de création de la réponse
    FOREIGN KEY (question_id) REFERENCES questions(id) -- Clé étrangère vers la table 'questions'
) ENGINE=InnoDB;

-- Table 'cour_suivis' : enregistre les cours suivis par les utilisateurs
CREATE TABLE cour_suivis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT, -- Référence à l'utilisateur
    course_id INT, -- Référence au cours
    progress DECIMAL(5, 2) NOT NULL DEFAULT 0.00, -- Progression du cours en pourcentage
    completed_at DATETIME NULL, -- Date de fin du cours
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de début du cours
    ended_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Dernière date de mise à jour
    FOREIGN KEY (user_id) REFERENCES users(id), -- Clé étrangère vers la table 'users'
    FOREIGN KEY (course_id) REFERENCES courses(id) -- Clé étrangère vers la table 'courses'
) ENGINE=InnoDB;

CREATE TABLE certifications (
    id INT PRIMARY KEY AUTO_INCREMENT,              -- Identifiant unique de la certification
    name VARCHAR(255) NOT NULL,                     -- Nom de la certification
    learning_path_id INT NOT NULL,                  -- Référence au parcours de formation (clé étrangère)
    description TEXT,                               -- Description de la certification
    duration INT,                                   -- Durée de la certification (en heures ou mois)
    level ENUM('beginner', 'intermediate', 'advanced'), -- Niveau de la certification
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Date de création de l'enregistrement
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Dernière date de mise à jour de l'enregistrement
    FOREIGN KEY (learning_path_id) REFERENCES certification_pathway(id) -- Clé étrangère vers la table 'certification_pathway'
) ENGINE=InnoDB;


-- Table 'certification_givens' : stocke les certifications attribuées aux utilisateurs
CREATE TABLE certification_givens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL, -- Référence à l'utilisateur ayant reçu la certification
    certification_id INT NOT NULL, -- Référence au parcours ou au cours de certification complété
    certification_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date d'attribution de la certification
    certificate_url VARCHAR(255) NULL, -- URL du certificat délivré (optionnel) à telecharger
    score DECIMAL(5, 2) NULL, -- Score final obtenu lors de la certification
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date de création de l'enregistrement
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Dernière date de mise à jour de l'enregistrement
    FOREIGN KEY (user_id) REFERENCES users(id), -- Clé étrangère vers la table 'users'
    FOREIGN KEY (certification_issue_id) REFERENCES certification_pathway(id) -- Clé étrangère vers la table 'certification_pathway'
) ENGINE=InnoDB;

