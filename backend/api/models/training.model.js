import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slogan: { type: String, default: '' },
  description: { type: String, required: true },
  domain: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: Number, default: null },
  maxParticipants: { type: Number, required: true },
  currentParticipants: { type: Number, default: 0 },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Open', 'Closed', 'Pending'], default: 'Open' },
  price: { type: Number, required: true },
  organizer: { type: String, required: true },
  prerequisites: { type: String, default: '' },
  learningObjectives: { type: String, default: '' },
  assessmentMethod: { type: String, default: '' },
  trainingMaterials: { type: String, default: '' },
  certificateIssued: { type: Boolean, default: false },
  language: { type: String, default: '' },
  type: { type: String, enum: ['webinar', 'in-person'], required: true },
  category: { type: String, enum: ['Talent', 'Allies-cafe', 'Commercial-company', 'Commercial-student'], required: true },
  createdAt: { type: Date, default: Date.now },  // Date de création de l'utilisateur  
  updatedAt: { type: Date , default: Date.now},   // Date de la dernière mise à jour 
  closeddAt: { type: Date},   // Date de la dernière mise à jour 
}, { timestamps: true });

const trainingModuleSchema = new mongoose.Schema({
  trainingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Training', required: true }, // Référence à la formation associée
  title: { type: String, required: true }, // Titre du module
  description: { type: String, required: true }, // Description détaillée du module
  duration: { type: Number, required: true }, // Durée du module en heures
  order: { type: Number, required: true }, // Ordre du module dans la formation
  objectives: { type: [String], required: true }, // Objectifs pédagogiques du module
  content: { type: String, required: true }, // Contenu principal du module
  resources: { type: [String], default: [] }, // Liens ou références vers des ressources supplémentaires
  assessment: { type: String, required: true }, // Méthode d'évaluation pour ce module
  prerequisites: { type: [String], default: [] }, // Prérequis nécessaires avant de suivre ce module
}, { timestamps: true }); // Ajoute les champs createdAt et updatedAt

const trainingSessionSchema = new mongoose.Schema({
  trainingModule_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingModule', required: true }, // Référence au module de formation associé
  title: { type: String, required: true }, // Titre de la séance
  description: { type: String, required: true }, // Description détaillée de la séance
  duration: { type: Number, required: true }, // Durée de la séance en minutes
  sessionDate: { type: Date, required: true, default: Date.now }, // Date et heure de la séance
  order: { type: Number, required: true }, // Ordre de la séance dans le module
}, { timestamps: true }); // Ajoute les champs createdAt et updatedAt


const trainingApplicationSchema = new mongoose.Schema({
    trainingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Training', required: true }, // Identifiant de la formation
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Identifiant de l'utilisateur qui s'inscrit
    enrollmentDate: { type: Date, required: true, default: Date.now }, // Date d'inscription
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], required: true, default: 'Pending' }, // Statut de l'inscription
}, { timestamps: true });


const TrainingApplication = mongoose.models.TrainingApplication || mongoose.model('TrainingApplication', trainingApplicationSchema);
const TrainingSession = mongoose.models.TrainingSession || mongoose.model('TrainingSession', trainingSessionSchema);
const TrainingModule = mongoose.models.TrainingModule || mongoose.model('TrainingModule', trainingModuleSchema);
const Training = mongoose.models.Training || mongoose.model('Training', trainingSchema);

export {Training, TrainingModule, TrainingSession, TrainingApplication};
