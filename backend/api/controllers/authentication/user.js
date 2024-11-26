import User from '../../models/authentication/user.js';
import Profile from '../../models/authentication/profile.js';
import bcrypt from 'bcrypt';  

// Créer un nouvel utilisateur  
export const createUser = async (req, res) => {  
  const { username, password, email, first_name, last_name, phone } = req.body; // Ajout des champs manquants  
  console.log("Données pour le nouvel utilisateur:", { username, email, first_name, last_name, phone });  
  // Hachage du mot de passe  
  const hashedPassword = await bcrypt.hash(password, 10);  
  const user = new User({   
    username,   
    password: hashedPassword,   
    email,   
    first_name,   
    last_name,   
    phone   
  });  
  try {  
    const savedUser = await user.save();  
    console.log("Utilisateur créé avec succès:", savedUser);  
    res.status(201).json(savedUser);  
  } catch (error) {  
    console.error("Erreur lors de la création de l'utilisateur:", error);  
    res.status(400).json({ message: error.message });  
  }  
};


// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    console.log("Tentative de récupération de tous les utilisateurs.");
    const users = await User.find();
    console.log("Utilisateurs récupérés avec succès:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ message: error.message });
  }
};


// Récupérer tous les utilisateurs avec pagination
export const getAllUsersPaginated = async (req, res) => {
  try {
    // Extraction des paramètres de pagination
    const page = parseInt(req.query.page, 10) || 1; // Par défaut, page = 1
    const pageSize = parseInt(req.query.pageSize, 10) || 10; // Par défaut, pageSize = 10

    console.log(`Récupération des utilisateurs - Page : ${page}, Taille : ${pageSize}`);

    // Calculer le décalage (skip) et la limite
    const skip = (page - 1) * pageSize;

    // Récupérer les utilisateurs paginés
    const users = await User.find().skip(skip).limit(pageSize);

    // Compter le nombre total d'utilisateurs
    const totalItems = await User.countDocuments();

    console.log("Utilisateurs récupérés :", users);
    console.log("Nombre total d'utilisateurs :", totalItems);

    // Réponse avec les données paginées et le total
    res.status(200).json({
      data: users,
      totalItems,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ message: error.message });
  }
};


// Récupérer un utilisateur par ID
export const getUserById = async (req, res) => {
  try {
    console.log(`Tentative de récupération de l'utilisateur avec l'ID: ${req.params.id}`);
    const user = await User.findById(req.params.id);
    if (!user) {
      console.warn("Utilisateur non trouvé avec l'ID:", req.params.id);
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    console.log("Utilisateur récupéré:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    res.status(500).json({ message: error.message });
  }
};


// Récupérer le nom d'un utilisateur par son ID
export const getUserNameById = async (req, res) => {
  try {
    console.log(`Tentative de récupération du nom de l'utilisateur avec l'ID: ${req.params.id}`);
    
    // Recherche de l'utilisateur par son ID
    const user = await User.findById(req.params.id, 'first_name last_name'); // Sélectionne uniquement les champs nécessaires

    // Vérification si l'utilisateur a été trouvé
    if (!user) {
      console.warn("Utilisateur non trouvé avec l'ID:", req.params.id);
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Combine les champs pour former le nom complet
    const fullName = `${user.first_name} ${user.last_name}`;

    console.log("Nom de l'utilisateur récupéré:", fullName);

    // Réponse avec le nom complet
    res.status(200).json({ name: fullName });
  } catch (error) {
    // Gestion des erreurs
    console.error("Erreur lors de la récupération du nom de l'utilisateur:", error);
    res.status(500).json({ message: error.message });
  }
};


// Récupérer un utilisateur par nom d'utilisateur (username)
export const getUserByUsername = async (req, res) => {
  try {
    console.log(`Tentative de récupération de l'utilisateur avec le Username: ${req.params.username}`);
    
    // Recherche de l'utilisateur par son nom d'utilisateur
    const user = await User.findOne({ username: req.params.username });

    // Vérification si l'utilisateur a été trouvé
    if (!user) {
      console.warn("Utilisateur non trouvé avec le username:", req.params.username);
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Si l'utilisateur est trouvé, retourner les détails de l'utilisateur
    res.status(200).json(user);
  } catch (error) {
    // Gestion des erreurs
    console.error("Erreur lors de la récupération de l'utilisateur par son nom:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getProfileByUserId = async (req, res) => {
  try {
    console.log("Requête pour le profil de l'utilisateur avec ID:", req.params.userId);

    const profile = await Profile.findOne({ user_id: req.params.userId }).populate('user_id');
    if (!profile) {
      console.warn("Aucun profil trouvé pour l'ID utilisateur:", req.params.userId);
      return res.status(404).json({ message: 'Profil non trouvé pour cet utilisateur' });
    }

    console.log("Profil trouvé:", profile);
    res.status(200).json(profile);
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    res.status(500).json({ message: error.message });
  }
};

 
// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  try {
    console.log(`Tentative de mise à jour de l'utilisateur avec le nom: ${req.params.username}`);

    // Extraction des champs de la requête
    const { username, email, first_name, last_name, phone, password } = req.body;

    // Construction des données à mettre à jour
    const updatedData = {};
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;
    if (first_name) updatedData.first_name = first_name;
    if (last_name) updatedData.last_name = last_name;
    if (phone) updatedData.phone = phone;

    // Hachage du mot de passe si nécessaire
    if (password) {
      if (password.trim() === "") {
        return res.status(400).json({ message: "Le mot de passe ne peut pas être vide." });
      }
      updatedData.password = await bcrypt.hash(password, 10);
    }

    // Ajout du champ updated_at
    updatedData.updated_at = Date.now();

    // Mise à jour de l'utilisateur
    const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    // Vérification si l'utilisateur existe
    if (!user) {
      console.warn("Utilisateur non trouvé pour mise à jour avec l'ID:", req.params.id);
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    console.log("Utilisateur mis à jour avec succès:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};


// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    console.log(`Tentative de suppression de l'utilisateur avec l'ID: ${req.params.id}`);
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      console.warn("Utilisateur non trouvé pour suppression avec l'ID:", req.params.id);
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    console.log("Utilisateur supprimé avec succès:", user);
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res.status(500).json({ message: error.message });
  }
};

