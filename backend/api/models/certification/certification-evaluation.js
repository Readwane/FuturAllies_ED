import mongoose from 'mongoose';

const CertificationEvaluationSchema = new mongoose.Schema({
    parcours_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Path', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['quiz', 'project', 'exam'], required: true },
    passing_score: { type: Number, required: true },
    max_attempts: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const CertificationEvaluation = mongoose.model('CertificationEvaluation', CertificationEvaluationSchema);

export default CertificationEvaluation;
