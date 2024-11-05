import Doc from '../../models/authentication/doc.js'; 
import { gridFSBucket } from '../../config/db.js';


// Récupérer tous les documents  
export const getAllDocs = async (req, res) => {  
  try {  
    const docs = await Doc.find().populate('user_id');  
    res.status(200).json(docs);  
  } catch (error) {  
    res.status(500).json({ message: error.message });  
  }  
};  

// Récupérer un document par ID  
export const getDocById = async (req, res) => {  
  try {  
    const doc = await Doc.findById(req.params.id).populate('user_id');  
    if (!doc) return res.status(404).json({ message: 'Document non trouvé' });  
    res.status(200).json(doc);  
  } catch (error) {  
    res.status(500).json({ message: error.message });  
  }  
};  

// Créer un nouveau document  
export const createDoc = async (req, res) => {  
  const { user_id, title, type } = req.body;  
  const { file } = req;  // Supposons que vous utilisez multer pour gérer le fichier  

  if (!file) {  
    return res.status(400).json({ message: 'Aucun fichier téléchargé.' });  
  }  

  // Upload du fichier dans GridFS  
  const uploadStream = gridFSBucket.openUploadStream(file.originalname);  
  uploadStream.end(file.buffer);  // envoie le buffer du fichier  

  uploadStream.on('finish', async () => {  
    // Une fois le fichier uploadé, créez un document dans la collection des Docs  
    const doc = new Doc({  
      user_id,  
      title,  
      type,  
      gridfs_id: uploadStream.id,  // Stockez l'ID du fichier GridFS dans le document  
    });  

    try {  
      const savedDoc = await doc.save();  
      res.status(201).json(savedDoc);  
    } catch (error) {  
      res.status(400).json({ message: error.message });  
    }  
  });  

  uploadStream.on('error', (error) => {  
    return res.status(500).json({ message: 'Erreur lors de l\'upload : ' + error.message });  
  });  
};  

// Mettre à jour un document  
export const updateDoc = async (req, res) => {  
  const { user_id, title, type } = req.body;  

  try {  
    const doc = await Doc.findById(req.params.id);  
    if (!doc) return res.status(404).json({ message: 'Document non trouvé' });  

    // Mise à jour des informations du document  
    doc.user_id = user_id;  
    doc.title = title;  
    doc.type = type;  
    doc.uploaded_at = Date.now(); // Mettre à jour la date  

    // Sauvegarder les changements  
    const updatedDoc = await doc.save();  
    res.status(200).json(updatedDoc);  
  } catch (error) {  
    res.status(400).json({ message: error.message });  
  }  
};  

// Supprimer un document  
export const deleteDoc = async (req, res) => {  
  try {  
    const doc = await Doc.findByIdAndDelete(req.params.id);  
    if (!doc) return res.status(404).json({ message: 'Document non trouvé' });  

    // Supprimer le fichier de GridFS  
    await gridFSBucket.delete(doc.gridfs_id);  

    res.status(200).json({ message: 'Document et fichier supprimés avec succès' });  
  } catch (error) {  
    res.status(500).json({ message: error.message });  
  }  
};