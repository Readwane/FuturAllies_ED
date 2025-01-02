import mongoose from 'mongoose';

const CourseLearnedSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Identifiant de l'utilisateur
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Identifiant du cours
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    progress: { type: Number, default: 0.0 } // Progression (0.0 à 1.0)
});


const CourseLearned = mongoose.model('CourseLearned', CourseLearnedSchema);

export default CourseLearned;
