import mongoose from 'mongoose';  

// Définition du schéma pour l'offre  
const OfferSchema = new mongoose.Schema({  
  title: { type: String, required: true }, // Domaine de l'offre 
  enterprise: { type: String, required: true }, // Référence à l'entreprise    title: { type: String, required: true }, // Titre de l'offre  
  enterpriseLocation: { type: String, required: true }, // Lieu de l'entreprise
  enterWebsite: { type: String }, // Site web de l'entreprise
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
  contractType: {type: String, enum: ['CDI', 'CDD'], required: true, default: 'CDD'}, // Type de contrat  
  benefits: { type: String }, // Avantages associés à l'offre  
  contactEmail: { type: String, required: true }, // Email de contact pour les candidatures  
  status: { type: String, enum: ['Open', 'Closed', 'Pending'], default: 'Open' }, // Statut de l'offre  
  isRemote: { type: Boolean, default: false }, // Indique si le poste est en télétravail  
  applicationMode: {   type: String, enum: ['Online', 'Physical', 'Both'], default: 'Online'}, // Mode de dépôt des candidatures  
  onlineSubmission: { type: Boolean, default: true }, // Indique si la soumission peut être faite en ligne  
  isRequiredCvDoc: { type: Boolean, default: true }, // Indique si un CV est requis  
  isRequiredMlDoc: { type: Boolean, default: false }, // Indique si une lettre de motivation est requise  
  canAddOthersDoc: { type: Boolean, default: false }, // Permet d'ajouter des documents supplémentaires  
  applicationLink: { type: String }, // Lien vers le formulaire de candidature externe  
  additionalInfo: { type: String }, // Informations additionnelles à l'offre  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },// ID de l'utilisateur qui a créé l'offre
  postedDate: { type: Date, default: Date.now }, // Date de publication de l'offre  
  updatedAt: { type: Date, default: Date.now }, // Date de publication de l'offre  
  expirationDate: { type: Date }, // Date d'expiration de l'offre  
});  


const offerApplicationSchema = new mongoose.Schema({
  offerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
  candidatId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'In Review'], default: 'Pending' },
  message: { type: String, default: "Je suis très intéressé(e) par cette offre et je suis convaincu(e) que mes compétences et mon expérience correspondent aux attentes de votre entreprise. J'aimerais avoir l'opportunité de discuter de cette offre plus en détail et de contribuer au succès de votre équipe." },
  submittedDocumentsIds: { type: [String], required: true },
  applicationDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});


const OfferApplication = mongoose.models.OfferApplication || mongoose.model('OfferApplication', offerApplicationSchema);
const Offer = mongoose.models.Offer || mongoose.model('Offer', OfferSchema);  

export {Offer, OfferApplication};