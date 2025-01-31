import multer from 'multer';

const storage = multer.memoryStorage(); // Stocker les fichiers en mémoire
const uploads = multer({ storage, limits: { fileSize: 16 * 1024 * 1024 } }).array('files', 10); // 'files' est le nom du champ dans le formulaire

const handleFileUpload = (req, res, next) => {
  uploads(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur de téléchargement : ' + err.message });
    }
    next(); // Passer au contrôleur suivant
  });
};

export {handleFileUpload};