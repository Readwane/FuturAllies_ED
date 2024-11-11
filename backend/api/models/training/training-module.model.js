import mongoose from 'mongoose';

const trainingModuleSchema = new mongoose.Schema({
  training_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Training', required: true }, // Référence à la formation associée
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

const TrainingModule = mongoose.model('TrainingModule', trainingModuleSchema);

export default TrainingModule;
