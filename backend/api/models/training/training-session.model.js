import mongoose from 'mongoose';

const trainingSessionSchema = new mongoose.Schema({
  trainingModule_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingModule', required: true }, // Référence au module de formation associé
  title: { type: String, required: true }, // Titre de la séance
  description: { type: String, required: true }, // Description détaillée de la séance
  duration: { type: Number, required: true }, // Durée de la séance en minutes
  sessionDate: { type: Date, required: true, default: Date.now }, // Date et heure de la séance
  order: { type: Number, required: true }, // Ordre de la séance dans le module
}, { timestamps: true }); // Ajoute les champs createdAt et updatedAt

const TrainingSession = mongoose.model('TrainingSession', trainingSessionSchema);

export default TrainingSession;
