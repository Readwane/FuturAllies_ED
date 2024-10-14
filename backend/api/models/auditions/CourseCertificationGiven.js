import mongoose from 'mongoose';

const CourseCertificationGivenSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    certification_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseCertification', required: true },
    certification_date: { type: Date, default: Date.now },
    certificate_url: { type: String },
    score: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const CourseCertificationGiven = mongoose.model('CourseCertificationGiven', PathCertificationGivenSchema);

export default CourseCertificationGiven;