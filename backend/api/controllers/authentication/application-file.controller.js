import ApplicationFile from '../../models/authentication/application-file.model.js';
import { uploadFile } from './file.controller.js';  // L'importation du controller uploadFile

// Créer un fichier de candidature
export const createApplicationFile = async (req, res) => {
  const { applicationId, fileType } = req.body; // applicationId : ID de la candidature, fileType : Type du fichier (CV, Lettre de motivation, etc.)
  const { file } = req;  // Le fichier à télécharger

  if (!file) {
    console.error('Aucun fichier téléchargé');
    return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
  }

  // Optionnel : vous pouvez ajouter des validations supplémentaires sur le type du fichier
  const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];  // Exemple de types autorisés
  if (!allowedFileTypes.includes(file.mimetype)) {
    console.error('Type de fichier non autorisé:', file.mimetype);
    return res.status(400).json({ message: 'Type de fichier non autorisé.' });
  }

  try {
    console.log('Début du téléchargement du fichier de candidature...');
    // Appel à la méthode uploadFile pour gérer le téléchargement du fichier
    const uploadedFile = await uploadFile(req, res);

    if (!uploadedFile || !uploadedFile._id) {
      console.error('Échec de l\'upload du fichier, aucune référence GridFS');
      return res.status(500).json({ message: 'Erreur lors du téléchargement du fichier dans GridFS' });
    }

    // Création de l'entrée pour ApplicationFile
    const newApplicationFile = new ApplicationFile({
      applicationId,
      fileId: uploadedFile._id,  // Référence au fichier téléchargé dans GridFS
      type: fileType,  // Le type de fichier, tel que CV, Lettre de Motivation, etc.
    });

    // Sauvegarde du fichier de candidature
    const savedApplicationFile = await newApplicationFile.save();
    console.log('Fichier de candidature sauvegardé :', savedApplicationFile);
    res.status(201).json(savedApplicationFile);  // Répondre avec l'objet ApplicationFile créé
  } catch (error) {
    console.error('Erreur lors de la création du fichier de candidature :', error.message);
    res.status(400).json({ message: error.message });
  }
};


// Lire les fichiers de candidature
export const getApplicationFiles = async (req, res) => {
  try {
    console.log('Récupération des fichiers de candidature...');
    const files = await ApplicationFile.find()
      .populate('fileId')  // Peupler les informations du fichier à partir de l'ID
      .populate('applicationId');  // Peupler les informations de l'application à partir de l'ID
    
    res.status(200).json(files);
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers de candidature :', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un fichier de candidature
export const deleteApplicationFile = async (req, res) => {
  try {
    console.log('Suppression du fichier de candidature avec ID:', req.params.id);
    const deletedFile = await ApplicationFile.findByIdAndDelete(req.params.id);
    if (!deletedFile) {
      console.log('Fichier de candidature non trouvé avec ID:', req.params.id);
      return res.status(404).json({ message: 'Fichier de candidature non trouvé' });
    }

    console.log('Fichier de candidature supprimé avec succès.');
    res.status(204).send();  // Aucune donnée à renvoyer, suppression réussie
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier de candidature :', error.message);
    res.status(500).json({ message: error.message });  // Gestion d'erreur serveur
  }
};
