import mongoose from 'mongoose';

const OfferApplicationSchema = new mongoose.Schema({
    offer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true }, // Référence à l'offre
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur (candidat)
    application_date: { type: Date, default: Date.now }, // Date de la candidature
    required_documents: { type: String }, // Liste des documents à fournir
    status: { 
        type: String, 
        enum: ['Pending', 'Accepted', 'Rejected', 'In Review'], 
        default: 'Pending' 
    }, // Statut de la candidature
    submitted_documents: { type: Map, of: String }, // Documents soumis (ex. { "cv": "url_cv.pdf", "coverLetter": "url_letter.pdf" })
    message: { type: String }, // Message de motivation du candidat
    review_notes: { type: String }, // Notes ou commentaires de l'examinateur
    last_updated: { type: Date, default: Date.now } // Dernière mise à jour de la candidature
});

const OfferApplication = mongoose.model('OfferApplication', OfferApplicationSchema);

export default OfferApplication;
