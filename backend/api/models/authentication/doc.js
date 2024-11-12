import mongoose from 'mongoose';

const DocSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },  // Référence vers l'utilisateur propriétaire
    title: { 
        type: String, 
        required: true 
    },  // Titre du document
    type: { 
        type: String, 
        enum: ['CV', 'ML', 'ATTESTATION', 'CERTIFICATION', 'OTHER'], 
        required: true 
    },  // Type de document
    gridfs_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },  // ID du fichier stocké dans GridFS
    uploaded_at: { 
        type: Date, 
        default: Date.now 
    }  // Date d'upload
});

const Doc = mongoose.model('Doc', DocSchema);

export default Doc;
