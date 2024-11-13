import mongoose from 'mongoose';

const UserFileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true }, // Référence à l'ID du fichier
  purpose: { type: String, enum: ['CV', 'ProfilePicture', 'Other'], required: true }, // Utilisation du fichier (CV, photo de profil, etc.)
}, { timestamps: true });

const UserFile = mongoose.model('UserProfileFile', UserFileSchema);

export default UserFile;
