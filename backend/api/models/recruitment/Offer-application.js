import mongoose from 'mongoose';

// Schéma de l'offre
const OfferSchema = new mongoose.Schema({
  enterpriseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Enterprise', 
    required: true 
  },  // Référence à l'entreprise
  title: { 
    type: String, 
    required: true 
  },  // Titre de l'offre
  description: { 
    type: String, 
    required: true 
  },  // Description de l'offre
  domain: { 
    type: String, 
    required: true 
  },  // Domaine de l'offre
  location: { 
    type: String, 
    required: true 
  },  // Localisation de l'offre
  salary: Number,  // Salaire (facultatif)
  duration: Number,  // Durée en mois (facultatif)
  type: { 
    type: String, 
    enum: ['Job', 'Internship', 'Other'], 
    required: true 
  },  // Type de l'offre
  requirements: String,  // Exigences (facultatif)
  responsibilities: String,  // Responsabilités (facultatif)
  educationLevel: String,  // Niveau d'éducation requis (facultatif)
  experienceLevel: String,  // Niveau d'expérience requis (facultatif)
  contractType: { 
    type: String, 
    enum: ['CDI', 'CDD'], 
    required: true 
  },  // Type de contrat
  contactEmail: { 
    type: String, 
    required: true 
  },  // Email de contact
  postedDate: { 
    type: Date, 
    default: Date.now 
  },  // Date de publication
  expirationDate: { 
    type: Date, 
    required: true 
  },  // Date d'expiration
  status: { 
    type: String, 
    enum: ['Open', 'Closed', 'Pending'], 
    default: 'Open' 
  },  // Statut de l'offre
  isRemote: { 
    type: Boolean, 
    default: false 
  },  // Indique si le poste est en télétravail
  applicationMode: { 
    type: String, 
    enum: ['Online', 'Physical', 'Both'], 
    default: 'Online' 
  },  // Mode de candidature
  physicalAddress: String,  // Adresse physique (facultatif)
  isRequiredCvDoc: { 
    type: Boolean, 
    default: true 
  },  // CV requis
  isRequiredMlDoc: { 
    type: Boolean, 
    default: false 
  },  // Lettre de motivation requise
  canAddOthersDoc: { 
    type: Boolean, 
    default: false 
  }  // Possibilité d'ajouter d'autres documents
}, { timestamps: true });

// Vérification si le modèle existe déjà
const Offer = mongoose.models.Offer || mongoose.model('Offer', OfferSchema);

export default Offer;
