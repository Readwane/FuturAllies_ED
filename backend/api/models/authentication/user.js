import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },  // Nom d'utilisateur
    password: { type: String, required: true },  // Mot de passe (hashé)
    email: { type: String, required: true, unique: true },  // Adresse e-mail
    created_at: { type: Date, default: Date.now }  // Date de création de l'utilisateur
});

const User = mongoose.model('User', UserSchema);

export default User;
