-- Table payment_methods
-- Cette table contient les méthodes de paiement associées aux utilisateurs.

CREATE TABLE payment_methods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('Carte Bancaire', 'Orange Money', 'Moov Money', 'PayPal', 'SankMoney') NOT NULL,
    details JSON NOT NULL, -- JSON pour stocker les détails spécifiques (ex. numéro de carte masqué)
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Table transactions
-- Cette table enregistre les informations sur chaque transaction effectuée par un utilisateur.
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    payment_method_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    provider_reference VARCHAR(255), -- Référence de la transaction chez le fournisseur
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id)
);

-- Table subscriptions
-- Cette table gère les abonnements des utilisateurs.
CREATE TABLE subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('Freemium', 'Premium') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('active', 'expired', 'canceled') DEFAULT 'active',
    recurring BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


--  Table invoices
-- Cette table stocke les factures générées pour chaque transaction.
CREATE TABLE invoices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    transaction_id INT NOT NULL,
    subscription_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status ENUM('paid', 'unpaid', 'overdue') DEFAULT 'unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (transaction_id) REFERENCES transactions(id),
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);


-- Table payment_providers
-- Cette table enregistre les informations sur les fournisseurs de paiement (ex. Stripe, PayPal, Mobile Money).
CREATE TABLE payment_providers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    api_endpoint VARCHAR(255) NOT NULL,
    credentials JSON NOT NULL, -- Stockage sécurisé des clés API
    fees DECIMAL(5, 2) NOT NULL, -- Pourcentage de frais par transaction (ex. 2.5)
    supported_methods JSON NOT NULL, -- Liste des méthodes de paiement supportées (ex. ["Carte Bancaire", "PayPal"])
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Table payment_provider_transactions
-- Cette table fait le lien entre les transactions locales et les références de transactions chez les fournisseurs de paiement.
CREATE TABLE payment_provider_transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id INT NOT NULL,
    provider_id INT NOT NULL,
    provider_reference VARCHAR(255) NOT NULL, -- Référence de la transaction du côté du fournisseur (ex. ID de transaction Stripe)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id),
    FOREIGN KEY (provider_id) REFERENCES payment_providers(id)
);


-- Table payment_logs (Optionnelle)
-- Pour le suivi des logs de paiement et la traçabilité
CREATE TABLE payment_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id INT NOT NULL,
    message TEXT NOT NULL, -- Message détaillé sur la transaction (erreurs, succès, etc.)
    log_type ENUM('info', 'error') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);
