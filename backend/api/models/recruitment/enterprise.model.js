import mongoose from 'mongoose';  

const EnterpriseSchema = new mongoose.Schema({  
  name: { type: String, required: true }, // Nom de l'entreprise  
  location: { type: String, required: true }, // Localisation de l'entreprise
  recruitmentEmail: { type: String, required: true }, 
  size: {   
    type: String,   
    enum: ['Small', 'Medium', 'Large'],   
    required: true   
  }, // Taille de l'entreprise  
  website: { type: String, required: true }, // URL du site web  
  description: { type: String }, // Description de l'entreprise  
  industry: { type: String }, // Secteur d'activité  
  foundedYear: { type: Number }, // Année de création  
  headquartersLocation: { type: String }, // Localisation du siège social  
  numberOfEmployees: { type: Number }, // Nombre d'employés  
  companyCulture: { type: String }, // Espace pour la culture d'entreprise  
  socialMediaLinks: { type: Map, of: String }, // Liens vers les réseaux sociaux  
  rating: { type: Number, min: 0, max: 5 }, // Évaluation sur 5  
  awardsAndRecognition: { type: [String] }, // Prix et distinctions  
  benefitsOverview: { type: String }, // Aperçu des avantages  
  logoUrl: { type: String } // URL du logo de l'entreprise  
}, {   
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Champs pour les dates de création et de mise à jour  
});  

const Enterprise = mongoose.model('Enterprise', EnterpriseSchema);  

export default Enterprise;