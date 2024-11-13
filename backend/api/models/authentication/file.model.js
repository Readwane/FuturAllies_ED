import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Nom du fichier
  type: { type: String, required: true }, // Type du fichier (e.g., "image", "text", "video", "pdf")
  gridfs_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Référence à l'ID du fichier dans GridFS
  fileSize: { type: Number, required: true }, // Taille du fichier en octets
  uploadedAt: { type: Date, default: Date.now }, // Date de téléchargement
}, { timestamps: true });

const File = mongoose.model('File', FileSchema);

export default File;
