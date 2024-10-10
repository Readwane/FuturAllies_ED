import mongoose from 'mongoose';

const trainingFeedbackSchema = new mongoose.Schema({
    training_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Training', required: true },
    feedbacker_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    feedback_for: { type: String, enum: ['for_training', 'for_trainer'], required: true },
    rating: { type: Number, min: 1, max: 5 },
    feedback: { type: String },
}, {
    timestamps: true,
});

const TrainingFeedback = mongoose.model('TrainingFeedback', trainingFeedbackSchema);
export default TrainingFeedback;
