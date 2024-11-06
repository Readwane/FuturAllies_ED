import mongoose from 'mongoose';  

const UserSchema = new mongoose.Schema({  
    _id: { type: String, required: true },  // Identifiant unique de l'utilisateur  
    username: { type: String, required: true, unique: true },  // Nom d'utilisateur  
    password: { type: String, required: true },  // Mot de passe (hashé)  
    email: { type: String, required: true, unique: true },  // Adresse e-mail  
    first_name: { type: String, required: true },  // Prénom de l'utilisateur  
    last_name: { type: String, required: true },  // Nom de famille de l'utilisateur  
    phone: { type: String, required: true },  // Numéro de téléphone  
    created_at: { type: Date, default: Date.now },  // Date de création de l'utilisateur  
    updated_at: { type: Date, default: Date.now }   // Date de la dernière mise à jour  
});  

// Middleware pour mettre à jour updated_at lors des modifications  
UserSchema.pre('save', function(next) {  
    this.updated_at = Date.now();  
    next();  
});  

const User = mongoose.model('User', UserSchema);  

export default User;