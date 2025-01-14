import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Nom du fichier
  type: { type: String, required: true }, // Type du fichier (e.g., "image", "text", "video", "pdf")
  gridFSId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Référence à l'ID du fichier dans GridFS
  fileSize: { type: Number, required: true }, // Taille du fichier en octets
  createdAt: { type: Date, default: Date.now },  // Date de création de l'utilisateur  
  updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour  
}, { timestamps: true });

const UserFileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true }, // Référence à l'ID du fichier
  purpose: { type: String, enum: ['CV', 'ML', 'ATTESTATION', 'CERTIFICATION', 'OTHER'], required: true }, 
  createdAt: { type: Date, default: Date.now },  // Date de création de l'utilisateur  
  updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour
}, { timestamps: true });

const CandidacyFileSchema = new mongoose.Schema({
  candidatId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true }, // Référence à l'ID du fichier
  purposeId: { type: String}, 
  purposeType: { type: String, enum: ['Training', 'Job', 'Internship'], required: true },
  createdAt: { type: Date, default: Date.now },  // Date de création de l'utilisateur  
  updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour
}, { timestamps: true });

const CandidacyFile = mongoose.models.CandidacyFile || mongoose.model('CandidacyFile', CandidacyFileSchema);
const UserFile = mongoose.models.UserFile || mongoose.model('UserProfileFile', UserFileSchema);
const File =  mongoose.models.File || mongoose.model('File', FileSchema);

export {File, UserFile, CandidacyFile};
