// Schema for course certifications
const courseCertificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
    }, // Reference to the course
    description: { type: String, default: null },
    duration: { type: Number, required: true }, // Duration of the course in hours
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
    }, { timestamps: true });

const CourseCertification = mongoose.model('CourseCertification', courseCertificationSchema);
