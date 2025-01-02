import mongoose from 'mongoose';

// Schéma de l'entreprise
const EnterpriseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },  // Nom de l'entreprise
  location: { 
    type: String, 
    required: true 
  },  // Localisation de l'entreprise
  email: { 
    type: String, 
    required: true 
  },  // Email de contact de l'entreprise
  size: { 
    type: String, 
    enum: ['SMALL', 'MEDIUM', 'LARGE'], 
    required: true 
  },  // Taille de l'entreprise
  website: String,  // URL du site web
  description: String,  // Description de l'entreprise
  industry: String,  // Secteur d'activité
  foundedYear: Number,  // Année de création
  headquartersLocation: String,  // Localisation du siège social
  numberOfEmployees: Number,  // Nombre d'employés
  companyCulture: String,  // Culture d'entreprise
  socialMediaLinks: { 
    type: Map, 
    of: String 
  },  // Liens vers les réseaux sociaux
  rating: { 
    type: Number, 
    min: 0, 
    max: 5 
  },  // Évaluation sur une échelle de 0 à 5
  awardsAndRecognition: [String],  // Prix et distinctions
  benefitsOverview: String,  // Aperçu des avantages
  logoUrl: String  // URL du logo de l'entreprise
}, { 
  timestamps: true  // Ajoute les champs createdAt et updatedAt automatiquement
});

// Vérification si le modèle existe déjà
const Enterprise = mongoose.models.Enterprise || mongoose.model('Enterprise', EnterpriseSchema);

export default Enterprise;
