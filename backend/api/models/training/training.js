import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: { type: Number, default: null }, // Durée totale de la formation (en heures ou jours)
    maxParticipants: { type: Number, required: true },
    currentParticipants: { type: Number, default: 0 }, // Nombre actuel de participants (optionnel)
    trainer: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Closed', 'Pending'], required: true },
    price: { type: Number, required: true },
    organizer: { type: String, required: true },
    prerequisites: { type: String, default: null }, // Compétences requises avant la formation
    learningObjectives: { type: String, default: null }, // Objectifs pédagogiques de la formation
    assessmentMethod: { type: String, default: null }, // Modalités d'évaluation
    trainingMaterials: { type: String, default: null }, // Supports pédagogiques fournis
    certificateIssued: { type: Boolean, required: true, default: false }, // Indique si un certificat est délivré
    language: { type: String, default: null }, // Langue de la formation
    type: { type: String, enum: ['webinar', 'in-person'], required: true }, // Type of the training
    category: { type: String, enum: ['Talent', 'Allies-cafe', 'Commercial-company', 'Commercial-student'], required: true }, // Category of the training
}, { timestamps: true });

const Training = mongoose.model('Training', trainingSchema);

export default Training;
