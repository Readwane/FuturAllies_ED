import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },  // Prénom de l'utilisateur
  lastName: { type: String, required: true },  // Nom de famille de l'utilisateur
  email: { type: String, required: true, unique: true },  // Adresse email
  password: { type: String, required: true },  // Mot de passe (probablement hashé)
  role: { type: String, enum: ['learner', 'instructor', 'admin', 'partner'], required: true },  // Rôle de l'utilisateur
  registrationDate: { type: Date, default: Date.now },  // Date d'inscription sur la plateforme
  lastLoginDate: { type: Date },  // Dernière date de connexion
  bio: { type: String },  // Biographie (optionnel)
  profilePictureUrl: { type: String },  // URL de la photo de profil (optionnel)
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
