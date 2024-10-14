import mongoose from 'mongoose';

const PathCertificationGivenSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    certification_id: { type: mongoose.Schema.Types.ObjectId, ref: 'learningPathCertification', required: true },
    certification_date: { type: Date, default: Date.now },
    certificate_url: { type: String },
    score: { type: Number },
    givenDate: { type: Date, default: Date.now },
});

const PathCertificationGiven = mongoose.model('CertificationGiven', PathCertificationGivenSchema);

export default PathCertificationGiven;