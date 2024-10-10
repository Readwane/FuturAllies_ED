
CREATE TABLE partners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,                           -- Référence à l'utilisateur (lié au compte partenaire)
    logo_url VARCHAR(255),
    partner_type ENUM('company', 'school') NOT NULL, -- Type de partenaire (ex: entreprise, école)
    organization_name VARCHAR(255) NOT NULL,        -- Nom de l'organisation
    industry VARCHAR(255),                          -- Secteur d'activité (optionnel)
    website_url VARCHAR(255),                       -- Site web (optionnel)
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE companies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    partner_id INT NOT NULL,                        -- Référence à l'entrée dans la table partners
    company_registration_number VARCHAR(100) NOT NULL,  -- Numéro d'enregistrement de l'entreprise
    contact_person_name VARCHAR(100),               -- Nom de la personne de contact
    contact_email VARCHAR(255),                      -- E-mail de la personne de contact
    contact_phone VARCHAR(20),                       -- Téléphone de la personne de contact
    address VARCHAR(255),                            -- Adresse de l'entreprise
    established_year INT,                            -- Année de création
    FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE  -- Clé étrangère vers la table partners
) ENGINE=InnoDB;


CREATE TABLE schools (
    id INT PRIMARY KEY AUTO_INCREMENT,
    partner_id INT NOT NULL,                        -- Référence à l'entrée dans la table partners
    accreditation VARCHAR(255),                     -- Détails de l'accréditation
    programs_offered TEXT,                          -- Description des programmes offerts
    number_of_students INT,                         -- Nombre d'étudiants
    address VARCHAR(255),                           -- Adresse de l'école
    established_year INT,                           -- Année de création
    FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE  -- Clé étrangère vers la table partners
) ENGINE=InnoDB;


CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    partner_id INT NOT NULL,                       -- Référence à l'entrée dans la table partners
    name VARCHAR(100) NOT NULL,                   -- Nom du contact
    email VARCHAR(255),                            -- E-mail du contact
    phone VARCHAR(20),                             -- Téléphone du contact
    role VARCHAR(100),                             -- Rôle du contact au sein de l'organisation
    FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE  -- Clé étrangère vers la table partners
) ENGINE=InnoDB;


CREATE TABLE programs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    school_id INT NOT NULL,                        -- Référence à l'entrée dans la table schools
    program_name VARCHAR(255) NOT NULL,           -- Nom du programme
    bg_imgUrl VARCHAR(255),
    description TEXT,                              -- Description du programme
    duration INT,                                  -- Durée du programme (en mois)
    accreditation VARCHAR(255),                    -- Accréditation du programme
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE  -- Clé étrangère vers la table schools
) ENGINE=InnoDB;


