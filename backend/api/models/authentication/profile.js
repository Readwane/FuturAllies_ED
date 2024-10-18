import mongoose from 'mongoose';

const ProfilSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Référence vers l'utilisateur associé
    first_name: { type: String, required: true },  // Prénom de l'utilisateur
    last_name: { type: String, required: true },  // Nom de l'utilisateur
    type: { 
        type: String, 
        enum: ['Freemium', 'Premium'], 
        deft: 'Freemium'
    }, // Statut de la candidature
    bio: { type: String },  // Courte biographie
    phone_number: { type: String },  // Numéro de téléphone
    address: { type: String },  // Adresse de l'utilisateur
    birth_date: { type: Date },  // Date de naissance
    profile_picture_url: { type: String },  // URL de la photo de profil
    created_at: { type: Date, default: Date.now }  // Date de création
});

const Profile = mongoose.model('Profil', ProfilSchema);

export default Profile;
