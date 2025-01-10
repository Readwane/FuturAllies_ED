import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    path: {type: String, required: true  }, // Identifiant du parcours de formation associé
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    requirements: { type: String, required: true },
    assessmentsMethod: { type: String, enum: ['Quiz', 'Project', 'Exam', 'Other'], required: true },
    certificate: { type: String },
    status: { type: String, enum: ['Active', 'Expired', 'Pending', 'Revoked'], default: 'Active' },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    language: { type: String, default: 'English' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


const CertificationGivenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    certificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Certification', required: true },
    certificationDate: { type: Date, default: Date.now },
    score: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


const CertificationEvaluationSchema = new mongoose.Schema({
    certificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Certification', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['quiz', 'project', 'exam'], required: true },
    passingScore: { type: Number, required: true },
    maxAttempts: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


const CertificationEvaluation = mongoose.models.CertificationEvaluation || mongoose.model('CertificationEvaluation', CertificationEvaluationSchema);
const CertificationGiven = mongoose.models.CertificationGiven || mongoose.model('CertificationGiven', CertificationGivenSchema);
const Certification = mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);

export {Certification, CertificationGiven, CertificationEvaluation};
