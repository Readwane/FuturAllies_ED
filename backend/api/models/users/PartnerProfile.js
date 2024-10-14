import mongoose from 'mongoose';

const partnerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Lien vers l'utilisateur
  companyName: { type: String, required: true },  // Nom de l'entreprise partenaire
  contactInfo: { type: String },  // Informations de contact
  collaborationDetails: { type: String },  // Détails de la collaboration
}, { timestamps: true });

const PartnerProfile = mongoose.model('PartnerProfile', partnerProfileSchema);

export default PartnerProfile;
