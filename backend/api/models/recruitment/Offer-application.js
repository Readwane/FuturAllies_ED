import mongoose from 'mongoose';

const OfferApplicationSchema = new mongoose.Schema({
  offerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true }, // Référence à l'offre
  candidatId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence au candidat
  applicationDate: { type: Date, default: Date.now }, // Date de candidature
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted', 'Rejected', 'In Review'], 
    default: 'Pending' 
  }, // Statut de la candidature
  message: { type: String, default: "Je suis très intéressé(e) par cette offre et je suis convaincu(e) que mes compétences et mon expérience correspondent aux attentes de votre entreprise. J'aimerais avoir l'opportunité de discuter de cette offre plus en détail et de contribuer au succès de votre équipe." }, // Message du candidat
  lastUpdated: { type: Date, default: Date.now }, // Date de dernière mise à jour
  submittedDocuments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doc' }] // Documents soumis par le candidat
}, { timestamps: true });

// Vérifier si le modèle existe déjà
const OfferApplication = mongoose.models.OfferApplication || mongoose.model('OfferApplication', OfferApplicationSchema);

export default OfferApplication;
