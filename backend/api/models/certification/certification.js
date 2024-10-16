import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    path_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Path', required: true }, // Identifiant du parcours de formation associé
    issuer: { type: String, required: true },
    issue_date: { type: Date, required: true },
    expiration_date: { type: Date },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    requirements: { type: String, required: true },
    assessment_method: { type: String, enum: ['Quiz', 'Project', 'Exam', 'Other'], required: true },
    is_online: { type: Boolean, default: true },
    certificate_template_url: { type: String },
    badge_url: { type: String },
    status: { type: String, enum: ['Active', 'Expired', 'Pending', 'Revoked'], default: 'Active' },
    recipient_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skills_gained: [{ type: String }],
    language: { type: String, default: 'English' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Certification = mongoose.model('Certification', CertificationSchema);

export default Certification;
