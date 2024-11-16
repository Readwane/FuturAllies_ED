import mongoose from 'mongoose';  

// Définition du schéma pour l'offre  
const OfferSchema = new mongoose.Schema({  
  // Association avec l'entreprise  
  enterpriseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Enterprise', required: true }, // Référence à l'entreprise    title: { type: String, required: true }, // Titre de l'offre  
  description: { type: String, required: true }, // Description de l'offre  
  domain: { type: String, required: true }, // Domaine de l'offre  
  location: { type: String, required: true }, // Lieu de l'offre (ville, pays)  
  salary: { type: Number }, // Salaire pour les emplois (optionnel)  
  duration: { type: Number }, // Durée en mois pour les stages (optionnel)  
  type: { type: String, enum: ['Job', 'Internship', 'Other'], required: true }, // Type d'offre  
  requirements: { type: String }, // Compétences et qualifications requises  
  responsibilities: { type: String }, // Responsabilités du poste  
  educationLevel: { type: String }, // Niveau d'études requis  
  experienceLevel: { type: String }, // Niveau d'expérience requis  
  contractType: {   
    type: String,   
    enum: ['Full-Time', 'Part-Time', 'Internship', 'Freelance', 'Temporary'],   
    required: true   
  }, // Type de contrat  
  benefits: { type: String }, // Avantages associés à l'offre  
  contactEmail: { type: String, required: true }, // Email de contact pour les candidatures  
  postedDate: { type: Date, default: Date.now }, // Date de publication de l'offre  
  expirationDate: { type: Date }, // Date d'expiration de l'offre  
  status: { type: String, enum: ['Open', 'Closed', 'Pending'], default: 'Open' }, // Statut de l'offre  

  // Remote and application details  
  isRemote: { type: Boolean, default: false }, // Indique si le poste est en télétravail  
  applicationMode: {   
    type: String,   
    enum: ['Online', 'Physical', 'Both'],   
    default: 'Online'   
  }, // Mode de dépôt des candidatures  
  onlineSubmission: { type: Boolean, default: true }, // Indique si la soumission peut être faite en ligne  
  physicalAddress: { type: String }, // Adresse physique pour le dépôt des candidatures  

  // Document requirements  
  isRequiredCvDoc: { type: Boolean, default: true }, // Indique si un CV est requis  
  isRequiredMlDoc: { type: Boolean, default: false }, // Indique si une lettre de motivation est requise  
  canAddOthersDoc: { type: Boolean, default: false }, // Permet d'ajouter des documents supplémentaires  

  // Additional offer info  
  applicationLink: { type: String }, // Lien vers le formulaire de candidature externe  
  additionalInfo: { type: String }, // Informations additionnelles à l'offre  
});  

// Vérifier si le modèle existe déjà avant de le définir à nouveau  
const Offer = mongoose.models.Offer || mongoose.model('Offer', OfferSchema);  

export default Offer;