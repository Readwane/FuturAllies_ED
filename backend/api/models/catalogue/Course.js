import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    picture_url: { type: String },
    description: { type: String, required: true },
    learning_path_id: { type: mongoose.Schema.Types.ObjectId, ref: 'LearningPath' },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    duration: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    is_certifiable: { type: Boolean, default: false },
    is_online: { type: Boolean, default: true },
    is_archived: { type: Boolean, default: true },
    certification_type: { type: String, enum: ['free', 'paid'], default: 'free' }
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
