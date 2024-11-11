import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence vers le profil utilisateur associé
  trainingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Training', required: true },
  expertise: { type: [String], required: true }, // Liste des domaines d'expertise du formateur
  experienceYears: { type: Number, default: 0 }, // Années d'expérience dans le domaine de la formation
  certifications: { type: [String], default: [] }, // Certifications ou diplômes du formateur
  socialMediaLinks: { // Liens vers les réseaux sociaux ou le portfolio
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    personalWebsite: { type: String, default: '' },
  },
  rating: { type: Number, min: 0, max: 5, default: 0 }, // Note moyenne du formateur (ex. sur 5)
}, { timestamps: true }); // Ajoute les champs createdAt et updatedAt

const Trainer = mongoose.model('Trainer', trainerSchema);

export default Trainer;
