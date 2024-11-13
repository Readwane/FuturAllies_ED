import multer from 'multer';
import {gridFSBucket} from '../../config/db.js'; // Assurez-vous que vous avez correctement configuré GridFS
import File from '../../models/authentication/file.model.js';

// Configuration de Multer pour le stockage temporaire des fichiers
// Utilisation de la mémoire pour stocker les fichiers téléchargés temporairement
const storage = multer.memoryStorage(); 

// Définir une taille maximale de fichier, par exemple 16MB
const upload = multer({
  storage: storage,
  limits: { fileSize: 16 * 1024 * 1024 }, // 16MB
}).single('file'); // Utilisation d'un fichier unique

export const uploadFile = async (req, res) => {
  return new Promise((resolve, reject) => {
    console.log('Début du processus de téléchargement du fichier...');
    upload(req, res, async (err) => {
      if (err) {
        console.error('Erreur de téléchargement :', err.message);
        return reject({ message: 'Erreur de téléchargement du fichier : ' + err.message });
      }

      const { file } = req;
      if (!file) {
        console.error('Aucun fichier téléchargé');
        return reject({ message: 'Aucun fichier téléchargé.' });
      }

      // Extraction des informations du fichier téléchargé
      const fileType = file.mimetype;
      const fileSize = file.size;
      console.log(`Fichier téléchargé : ${file.originalname}, Type: ${fileType}, Taille: ${fileSize} octets`);

      // Upload dans GridFS
      const uploadStream = gridFSBucket.openUploadStream(file.originalname);
      uploadStream.end(file.buffer);

      uploadStream.on('finish', async () => {
        const newFile = new File({
          title: file.originalname,
          type: fileType,
          fileSize: fileSize,
          gridfs_id: uploadStream.id,
        });

        try {
          const savedFile = await newFile.save();
          console.log('Fichier enregistré dans la base de données:', savedFile);
          resolve(savedFile); // Résoudre la promesse avec l'objet `savedFile`
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement du fichier :', error.message);
          reject({ message: error.message });
        }
      });

      uploadStream.on('error', (error) => {
        console.error('Erreur lors de l\'upload du fichier :', error.message);
        reject({ message: 'Erreur lors de l\'upload du fichier : ' + error.message });
      });
    });
  }).catch((err) => {
    res.status(500).json(err); // Gérer l'erreur ici en cas de problème avec la promesse
  });
};



// Controller pour récupérer tous les fichiers
export const getFiles = async (req, res) => {
  try {
    const files = await File.find();  // Récupérer tous les fichiers de la base de données
    console.log('Récupération de tous les fichiers:', files);
    res.status(200).json(files);
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers:', error.message);  // Erreur lors de la récupération
    res.status(500).json({ message: error.message });
  }
};

// Controller pour récupérer un fichier spécifique par ID
export const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);  // Trouver le fichier par son ID
    if (!file) {
      console.log(`Fichier avec ID ${req.params.id} non trouvé`);
      return res.status(404).json({ message: 'Fichier non trouvé' });
    }
    console.log('Fichier trouvé:', file);
    res.status(200).json(file);  // Retourner le fichier trouvé
  } catch (error) {
    console.error('Erreur lors de la récupération du fichier par ID:', error.message);  // Erreur lors de la recherche du fichier
    res.status(500).json({ message: error.message });
  }
};

// Controller pour supprimer un fichier
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);  // Supprimer le fichier par son ID
    if (!file) {
      console.log(`Fichier avec ID ${req.params.id} non trouvé pour suppression`);
      return res.status(404).json({ message: 'Fichier non trouvé' });
    }
    console.log(`Fichier avec ID ${req.params.id} supprimé avec succès`);
    res.status(204).send();  // Répondre avec un statut de suppression réussie
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier:', error.message);  // Erreur lors de la suppression
    res.status(500).json({ message: error.message });
  }
};

// Controller pour mettre à jour un fichier (si nécessaire)
export const updateFile = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(req.params.id, req.body, { new: true });  // Mettre à jour un fichier par son ID
    if (!file) {
      console.log(`Fichier avec ID ${req.params.id} non trouvé pour mise à jour`);
      return res.status(404).json({ message: 'Fichier non trouvé' });
    }
    console.log('Fichier mis à jour:', file);
    res.status(200).json(file);  // Retourner le fichier mis à jour
  } catch (error) {
    console.error('Erreur lors de la mise à jour du fichier:', error.message);  // Erreur lors de la mise à jour
    res.status(400).json({ message: error.message });
  }
};
