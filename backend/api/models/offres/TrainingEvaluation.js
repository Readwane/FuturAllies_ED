import mongoose from 'mongoose';

const trainingEvaluationSchema = new mongoose.Schema({
    training_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Training', required: true },
    method: { type: String, enum: ['quiz', 'project', 'exam'], required: true },
    description: { type: String },
}, {
    timestamps: true,
});

const TrainingEvaluation = mongoose.model('TrainingEvaluation', trainingEvaluationSchema);
export default TrainingEvaluation;
