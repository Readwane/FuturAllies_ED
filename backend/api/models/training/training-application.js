import mongoose from 'mongoose';

const trainingApplicationSchema = new mongoose.Schema({
    trainingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Training', required: true }, // Identifiant de la formation
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Identifiant de l'utilisateur qui s'inscrit
    enrollmentDate: { type: Date, required: true, default: Date.now }, // Date d'inscription
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], required: true, default: 'Pending' }, // Statut de l'inscription
}, { timestamps: true });

const TrainingApplication = mongoose.model('TrainingApplication', trainingApplicationSchema);

export default TrainingApplication;
