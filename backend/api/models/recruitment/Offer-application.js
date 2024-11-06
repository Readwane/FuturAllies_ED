import mongoose from 'mongoose';  

// Définition du schéma pour les candidatures aux offres d'emploi  
const OfferApplicationSchema = new mongoose.Schema({  
  offer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true }, // Référence à l'offre  
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur (candidat)  
  application_date: { type: Date, default: Date.now }, // Date de la candidature  
  status: {   
    type: String,   
    enum: ['Pending', 'Accepted', 'Rejected', 'In Review'],   
    default: 'Pending' // Correction de l'erreur de frappe, maintenant 'Pending'  
  }, // Statut de la candidature  
  submitted_documents: { type: Map, of: String, default: {} }, // Documents soumis (ex. { "cv": "url_cv.pdf", "coverLetter": "url_letter.pdf" })  
  message: { type: String, default: '' }, // Message de motivation du candidat  
  last_updated: { type: Date, default: Date.now } // Dernière mise à jour de la candidature  
});  

// Création du modèle à partir du schéma  
const OfferApplication = mongoose.model('OfferApplication', OfferApplicationSchema);  

export default OfferApplication;