import mongoose from 'mongoose';
import trainingModuleSchema from '../training/training-module.model.js';

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
  trainer: { type: String, required: true },
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
}, { timestamps: true });

const Training = mongoose.model('Training', trainingSchema);

export default Training;
