import mongoose from 'mongoose';  


const UserSchema = new mongoose.Schema({  
    username: { type: String, required: true, unique: true },  // Nom d'utilisateur  
    password: { type: String, required: true },  // Mot de passe (hashé)  
    email: { type: String, required: true, unique: true },  // Adresse e-mail  
    firstName: { type: String},  // Prénom de l'utilisateur  
    lastName: { type: String},  // Nom de famille de l'utilisateur  
    phone: { type: String, required: true },  // Numéro de téléphone  
    accesType: { type: String, enum: ['Freemium', 'Premium'], default: 'Freemium'}, // Statut de la candidature
    biographie: { type: String },  // Courte biographie
    address: { type: String },  // Adresse de l'utilisateur
    birthDate: { type: Date },  // Date de naissance
    image: { type: String },  // URL de la photo de profil
    createdAt: { type: Date, default: Date.now },  // Date de création de l'utilisateur  
    updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour  
});


const UserGroupSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Référence vers l'utilisateur
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },  // Référence vers le groupe
    createdAt: { type: Date, default: Date.now },  // Date de création de l'utilisateur  
    updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour  
});


const GroupSchema = new mongoose.Schema({
    name: { type: String, enum: ['Student', 'Instructor', 'Employer', 'Enterprise'], required: true},  // Nom du groupe
    description: { type: String },  // Description du groupe
    createdAt: { type: Date, default: Date.now },  // Date de création de l'utilisateur  
    updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour 
});


const User = mongoose.models.User || mongoose.model('User', UserSchema); 
const UserGroup = mongoose.models.UserGroup || mongoose.model('UserGroup', UserGroupSchema);
const Group = mongoose.models.Group || mongoose.model('Group', GroupSchema);


export {Group, User, UserGroup};
