import mongoose from 'mongoose';

const DocSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Référence vers l'utilisateur propriétaire
    title: { type: String, required: true },  // Titre du document
    type: { 
        type: String, 
        enum: ['CV', 'MotivationLetter', 'Certificate', 'Other'], 
        required: true 
    },  // Type de document
    file_url: { type: String, required: true },  // URL du fichier stocké
    uploaded_at: { type: Date, default: Date.now }  // Date d'upload
});

const Doc = mongoose.model('Doc', DocSchema);

export default Doc;
