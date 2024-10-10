import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    learning_path_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CertificationPathway' },
    description: { type: String },
    duration: { type: Number },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Certification = mongoose.model('Certification', CertificationSchema);

export default Certification;