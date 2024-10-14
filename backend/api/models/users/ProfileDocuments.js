import mongoose from 'mongoose';

const profileDocumentsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Lien vers l'utilisateur
  documentType: { type: String, required: true, enum: ['CV', 'lettre de motivation', 'attestation', 'autre'] },  // Type de document
  documentUrl: { type: String, required: true },  // URL où le document est stocké
  uploadedAt: { type: Date, default: Date.now },  // Date de téléchargement du document
}, { timestamps: true });

const ProfileDocuments = mongoose.model('UserProfileDocuments', profileDocumentsSchema);

export default ProfileDocuments;
