CREATE TABLE Service (
    id INT AUTO_INCREMENT PRIMARY KEY,              -- Identifiant unique du service
    title VARCHAR(255) NOT NULL,                    -- Nom du service proposé
    picture_url VARCHAR(255) NOT NULL,              -- URL de l'image de fond du service
    description TEXT NOT NULL,                       -- Description détaillée du service
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,    -- Date et heure de création
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Date et heure de mise à jour
);

-- Index pour améliorer les performances des requêtes (optionnel)
CREATE INDEX idx_service_title ON Service(title);
