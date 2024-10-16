import mongoose from 'mongoose';

const CourseLearnedSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Identifiant de l'utilisateur
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Identifiant du cours
    started_at: { type: Date, default: Date.now },
    completed_at: { type: Date },
    progress: { type: Number, default: 0.0 } // Progression (0.0 à 1.0)
});

const CourseLearned = mongoose.model('CourseLearned', CourseLearnedSchema);

export default CourseLearned;
