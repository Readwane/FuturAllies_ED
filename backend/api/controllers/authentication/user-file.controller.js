import UserFile from '../../models/authentication/user-file.model.js';  // Import du modèle UserFile
import { uploadFile } from './file.controller.js';  // Controller uploadFile pour gérer le téléchargement


// Créer un fichier lié à un utilisateur (par exemple un CV ou une photo de profil)
export const createUserFile = async (req, res) => {
  const { userId, purpose } = req.body;  // userId : ID de l'utilisateur, purpose : raison (CV, photo de profil, etc.)
  const { file } = req;  // Le fichier à télécharger

  if (!file) {
    console.error('Aucun fichier téléchargé');
    return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
  }

  if (!userId || !purpose) {
    console.error('Données manquantes : userId ou purpose');
    return res.status(400).json({ message: 'Les champs userId et purpose sont obligatoires.' });
  }

  try {
    console.log('Début du téléchargement du fichier...');
    // Appel à la méthode uploadFile pour gérer le téléchargement et obtenir l'objet file
    const uploadedFile = await uploadFile(req, res);

    if (!uploadedFile || !uploadedFile._id) {
      console.error('Échec de l\'upload du fichier, aucune référence à GridFS');
      return res.status(500).json({ message: 'Erreur lors du téléchargement du fichier dans GridFS' });
    }

    // Création d'une entrée dans UserFile pour associer le fichier à l'utilisateur
    const newUserFile = new UserFile({
      userId, 
      fileId: uploadedFile._id, 
      purpose,              
      status: 'Active',  // Par défaut, le fichier est actif
    });

    // Sauvegarde de l'entrée dans UserFile
    const savedUserFile = await newUserFile.save();
    console.log('Fichier lié à l\'utilisateur sauvegardé :', savedUserFile);
    res.status(201).json(savedUserFile);  // Réponse avec l'objet UserFile créé
  } catch (error) {
    console.error('Erreur lors de la création du fichier utilisateur :', error.message);
    res.status(400).json({ message: error.message });
  }
};




// Lire les fichiers liés à un utilisateur
export const getUserFiles = async (req, res) => {
  const { userId } = req.params;  // ID de l'utilisateur

  try {
    console.log('Récupération des fichiers pour l\'utilisateur ID:', userId);
    const userFiles = await UserFile.find({ userId })
      .populate('fileId')  // Peupler les informations du fichier
      .populate('userId'); // Peupler les informations de l'utilisateur
    
    res.status(200).json(userFiles);
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers de l\'utilisateur:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Lire un fichier spécifique lié à un utilisateur
export const getUserFileById = async (req, res) => {
  const { id } = req.params;  // ID du UserFile

  try {
    console.log('Recherche du fichier utilisateur avec ID:', id);
    const userFile = await UserFile.findById(id)
      .populate('fileId')  // Peupler les informations du fichier
      .populate('userId'); // Peupler les informations de l'utilisateur
    
    if (!userFile) {
      console.log('Fichier utilisateur non trouvé avec ID:', id);
      return res.status(404).json({ message: 'Fichier de l\'utilisateur non trouvé' });
    }

    console.log('Fichier utilisateur trouvé :', userFile);
    res.status(200).json(userFile);
  } catch (error) {
    console.error('Erreur lors de la récupération du fichier utilisateur par ID:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un fichier spécifique lié à un utilisateur
export const deleteUserFile = async (req, res) => {
  const { id } = req.params;  // ID du UserFile à supprimer

  try {
    console.log('Suppression du fichier utilisateur avec ID:', id);
    const deletedFile = await UserFile.findByIdAndDelete(id);
    if (!deletedFile) {
      console.log('Fichier de l\'utilisateur non trouvé pour suppression avec ID:', id);
      return res.status(404).json({ message: 'Fichier de l\'utilisateur non trouvé' });
    }

    console.log('Fichier utilisateur supprimé avec succès.');
    res.status(204).send();  // Suppression réussie, pas de contenu à renvoyer
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier utilisateur:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un fichier lié à un utilisateur
export const updateUserFile = async (req, res) => {
  const { id } = req.params;  // ID du UserFile à mettre à jour
  const { purpose, status } = req.body;  // Nouveau but ou statut du fichier

  try {
    console.log('Mise à jour du fichier utilisateur avec ID:', id);
    const updatedFile = await UserFile.findByIdAndUpdate(
      id, 
      { purpose  }, 
      { new: true }  // Retourner l'objet mis à jour
    );

    if (!updatedFile) {
      console.log('Fichier de l\'utilisateur non trouvé pour mise à jour avec ID:', id);
      return res.status(404).json({ message: 'Fichier de l\'utilisateur non trouvé' });
    }

    console.log('Fichier utilisateur mis à jour :', updatedFile);
    res.status(200).json(updatedFile);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du fichier utilisateur :', error.message);
    res.status(400).json({ message: error.message });
  }
};
