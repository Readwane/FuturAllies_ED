import multer from 'multer';
import {gridFSBucket} from '../db/config.db.js';  // Importer le bucket GridFS
import {File, UserFile, CandidacyFile} from '../models/file.model.js'; 

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

// Upload d'un fichier unique
const uploadFile = async (req, res) => {
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



// Upload de plusieurs fichiers
const uploadFiles = (req, res) => {
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
const getFiles = async (req, res) => {
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
const getFileById = async (req, res) => {
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
const deleteFile = async (req, res) => {
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
const updateFile = async (req, res) => {
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



// Créer un fichier utilisateur
const createUserFile = async (req, res) => {
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
  const getUserFiles = async (req, res) => {
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
  const getUserFileById = async (req, res) => {
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
  const deleteUserFile = async (req, res) => {
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
  const updateUserFile = async (req, res) => {
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
  




// Créer une nouvelle candidature (CandidacyFile)
const createCandidacyFile = async (req, res) => {
  try {
    const { candidatId, fileId, purposeId, purposeType } = req.body;

    if (!candidatId || !fileId || !purposeType) {
      return res.status(400).json({ message: 'Les champs candidatId, fileId et purposeType sont requis.' });
    }

    const newCandidacyFile = new CandidacyFile({ 
      candidatId, 
      fileId, 
      purposeId, 
      purposeType 
    });

    const savedCandidacyFile = await newCandidacyFile.save();

    res.status(201).json({
      message: 'Candidature créée avec succès.',
      candidacyFile: savedCandidacyFile,
    });
  } catch (error) {
    console.error('Erreur lors de la création de la candidature:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};


// Récupérer toutes les candidatures
const getAllCandidacyFiles = async (req, res) => {
  try {
    const candidacyFiles = await CandidacyFile.find().populate('candidatId').populate('fileId');
    res.status(200).json(candidacyFiles);
  } catch (error) {
    console.error('Erreur lors de la récupération des candidatures:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Récupérer une candidature par ID
const getCandidacyFileById = async (req, res) => {
  try {
    const candidacyFile = await CandidacyFile.findById(req.params.id).populate('candidatId').populate('fileId');

    if (!candidacyFile) {
      return res.status(404).json({ message: 'Candidature non trouvée.' });
    }

    res.status(200).json(candidacyFile);
  } catch (error) {
    console.error('Erreur lors de la récupération de la candidature:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// ---------------------------- CONTROLLER - UPDATE -----------------------------

// Mettre à jour une candidature par ID
const updateCandidacyFile = async (req, res) => {
  try {
    const { candidatId, fileId, purposeId, purposeType } = req.body;

    const updatedCandidacyFile = await CandidacyFile.findByIdAndUpdate(
      req.params.id,
      { candidatId, fileId, purposeId, purposeType, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedCandidacyFile) {
      return res.status(404).json({ message: 'Candidature non trouvée.' });
    }

    res.status(200).json(updatedCandidacyFile);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la candidature:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};


// Supprimer une candidature par ID
const deleteCandidacyFile = async (req, res) => {
  try {
    const deletedCandidacyFile = await CandidacyFile.findByIdAndDelete(req.params.id);

    if (!deletedCandidacyFile) {
      return res.status(404).json({ message: 'Candidature non trouvée.' });
    }

    res.status(200).json({ message: 'Candidature supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la candidature:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};


export { 
    uploadFile, uploadFiles, getFiles, getFileById, deleteFile, updateFile, 
    createUserFile, getUserFiles, getUserFileById, deleteUserFile, updateUserFile, 
    createCandidacyFile, getAllCandidacyFiles, getCandidacyFileById, updateCandidacyFile, deleteCandidacyFile 
};