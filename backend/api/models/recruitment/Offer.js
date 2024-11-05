import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Titre de l'offre
    description: { type: String, required: true }, // Description de l'offre
    domain: { type: String, required: true }, // Titre de l'offre
    company: { type: String, required: true }, // Société proposant l'offre
    location: { type: String, required: true }, // Lieu de l'offre (ville, pays)
    salary: { type: Number }, // Salaire pour les emplois (optionnel)
    duration: { type: Number }, // Durée en mois pour les stages (optionnel)
    type: { type: String, enum: ['Job', 'Internship', 'Other'], required: true }, // Type d'offre
    requirements: { type: String }, // Compétences et qualifications requises
    responsibilities: { type: String }, // Responsabilités du poste
    education_level: { type: String }, // Niveau d'études requis
    experience_level: { type: String }, // Niveau d'expérience requis
    contract_type: { 
        type: String, 
        enum: ['Full-Time', 'Part-Time', 'Internship', 'Freelance', 'Temporary'], 
        required: true 
    }, // Type de contrat
    benefits: { type: String }, // Avantages associés à l'offre
    application_link: { type: String }, // Lien vers le formulaire de candidature externe
    contact_email: { type: String, required: true }, // Email de contact pour les candidatures
    is_remote: { type: Boolean, default: false }, // Indique si le poste est en télétravail
    posted_date: { type: Date, default: Date.now }, // Date de publication de l'offre
    expiration_date: { type: Date }, // Date d'expiration de l'offre
    status: { type: String, enum: ['Open', 'Closed', 'Pending'], default: 'Open' }, // Statut de l'offre
    application_mode: { 
        type: String, 
        enum: ['Online', 'Physical', 'Both'], 
        default: 'Online' 
    }, // Mode de dépôt des candidatures
    required_documents: { type: [String], default: [] }, // Liste des documents à fournir (CV, lettre de motivation, etc.)  
    physical_address: { type: String }, // Adresse physique pour le dépôt des candidatures
    online_submission: { type: Boolean, default: true }, // Indique si la soumission peut être faite en ligne
    additional_info: { type: String } // Informations additionnelles à l'offre
});

const Offer = mongoose.model('Offer', OfferSchema);

export default Offer;
