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

// Modification pour accepter plusieurs fichiers (par exemple jusqu'à 10 fichiers)
const uploads = multer({
  storage: storage,
  limits: { fileSize: 16 * 1024 * 1024 }, // 16MB
}).array('files', 10); // Utilisation de plusieurs fichiers (le nom de champ est 'files')


export const uploadFile = async (req, res) => {
  console.log('Début du processus de téléchargement du fichier...');

  upload(req, res, async (err) => {
    if (err) {
      console.error('Erreur de téléchargement :', err.message);
      return res.status(500).json({ message: 'Erreur de téléchargement du fichier : ' + err.message });
    }

    const { file } = req;
    if (!file) {
      console.error('Aucun fichier téléchargé');
      return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
    }

    // Extraction des informations du fichier téléchargé
    const fileType = file.mimetype;
    const fileSize = file.size;
    console.log(`Fichier téléchargé : ${file.originalname}, Type: ${fileType}, Taille: ${fileSize} octets`);

    // Upload dans GridFS
    const uploadStream = gridFSBucket.openUploadStream(file.originalname);

    // Gestion des erreurs et de la fin du stream
    uploadStream.on('error', (error) => {
      console.error('Erreur lors de l\'upload du fichier :', error.message);
      return res.status(500).json({ message: 'Erreur lors de l\'upload du fichier : ' + error.message });
    });

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
        return res.status(200).json({
          message: 'Fichier téléchargé avec succès.',
          file: savedFile,
        });
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement du fichier :', error.message);
        return res.status(500).json({ message: error.message });
      }
    });

    // Écriture du buffer dans le stream
    uploadStream.end(file.buffer);
  });
};

export const uploadFiles = (req, res) => {
  console.log('Début du processus de téléchargement des fichiers...');

  return new Promise((resolve, reject) => {
    uploads(req, res, async (err) => {
      if (err) {
        console.error('Erreur de téléchargement :', err.message);
        reject(new Error('Erreur de téléchargement du fichier : ' + err.message));
        return;
      }

      const { files } = req;
      if (!files || files.length === 0) {
        console.error('Aucun fichier téléchargé');
        reject(new Error('Aucun fichier téléchargé.'));
        return;
      }

      const uploadedFiles = [];

      try {
        // Utiliser Promise.all pour uploader tous les fichiers en parallèle
        await Promise.all(files.map(async (file) => {
          // Extraction des informations du fichier téléchargé
          const fileType = file.mimetype;
          const fileSize = file.size;
          console.log(`Fichier téléchargé : ${file.originalname}, Type: ${fileType}, Taille: ${fileSize} octets`);

          // Upload dans GridFS
          const uploadStream = gridFSBucket.openUploadStream(file.originalname);

          await new Promise((resolveStream, rejectStream) => {
            uploadStream.on('error', (error) => {
              console.error('Erreur lors de l\'upload du fichier :', error.message);
              rejectStream(error);
            });

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
                uploadedFiles.push(savedFile);
                resolveStream();
              } catch (error) {
                console.error('Erreur lors de l\'enregistrement du fichier :', error.message);
                rejectStream(error);
              }
            });

            // Écriture du buffer dans le stream
            uploadStream.end(file.buffer);
          });
        }));

        // Résoudre la promesse avec les fichiers téléchargés
        resolve(uploadedFiles);

      } catch (error) {
        console.error('Erreur lors du traitement des fichiers:', error.message);
        reject(new Error('Erreur lors du traitement d\'un fichier : ' + error.message));
      }
    });
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
