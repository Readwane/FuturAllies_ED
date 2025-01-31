import multer from 'multer';
import { gridFSBucket } from '../db/config.db.js';
import { File } from '../models/file.model.js';

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 16 * 1024 * 1024 } }).single('file');
const uploads = multer({ storage, limits: { fileSize: 16 * 1024 * 1024 } }).array('files', 10);

const uploadToGridFS = async (file) => {
  const uploadStream = gridFSBucket.openUploadStream(file.originalname);
  return new Promise((resolve, reject) => {
    uploadStream.on('error', reject);
    uploadStream.on('finish', () => resolve(uploadStream.id));
    uploadStream.end(file.buffer);
  });
};

const uploadFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur de téléchargement : ' + err.message });
    }

    // Vérifier si plusieurs fichiers ont été envoyés
    if (req.files) {
      return res.status(400).json({ message: 'Un seul fichier est autorisé pour cet endpoint.' });
    }

    const { file } = req;
    if (!file) {
      return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
    }

    try {
      const gridFSId = await uploadToGridFS(file);
      const newFile = new File({
        title: file.originalname,
        type: file.mimetype,
        fileSize: file.size,
        gridFSId,
      });

      const savedFile = await newFile.save();
      res.status(200).json({ message: 'Fichier téléchargé avec succès.', file: savedFile });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};


const uploadFiles = async (req, res) => {
  uploads(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur de téléchargement : ' + err.message });
    }

    const { files } = req;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
    }

    const uploadedFiles = [];
    try {
      for (const file of files) {
        const gridFSId = await uploadToGridFS(file);
        const newFile = new File({
          title: file.originalname,
          type: file.mimetype,
          fileSize: file.size,
          gridFSId,
        });

        const savedFile = await newFile.save();
        uploadedFiles.push(savedFile);
      }

      res.status(200).json({ message: 'Fichiers téléchargés avec succès.', files: uploadedFiles });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};


const getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'Fichier non trouvé' });
    }

    const downloadStream = gridFSBucket.openDownloadStream(file.gridFSId);
    res.set('Content-Type', file.type);
    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'Fichier non trouvé' });
    }

    await gridFSBucket.delete(file.gridFSId);
    await File.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFile = async (req, res) => {
  try {
    const oldFile = await File.findById(req.params.id);
    if (!oldFile) {
      return res.status(404).json({ message: 'Fichier non trouvé' });
    }

    await gridFSBucket.delete(oldFile.gridFSId);
    const newFile = req.file;
    const gridFSId = await uploadToGridFS(newFile);

    const updatedFile = await File.findByIdAndUpdate(
      req.params.id,
      {
        title: newFile.originalname,
        type: newFile.mimetype,
        fileSize: newFile.size,
        gridFSId,
      },
      { new: true }
    );

    res.status(200).json(updatedFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { uploadFile, uploadFiles, getFiles, getFileById, deleteFile, updateFile };