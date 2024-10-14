import mongoose from 'mongoose';

// Schema for learning path certifications
const learningPathCertificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    learningPathId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'LearningPath', 
        required: true 
    }, // Reference to the learning path
    description: { type: String, default: null },
    duration: { type: Number, required: true }, // Total duration of the learning path in hours
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

const LearningPathCertification = mongoose.model('LearningPathCertification', learningPathCertificationSchema);
