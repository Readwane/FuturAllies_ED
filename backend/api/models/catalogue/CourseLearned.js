import mongoose from 'mongoose';

const CourseLearnedSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    progress: { type: Number, default: 0.00 },
    completed_at: { type: Date },
    started_at: { type: Date, default: Date.now },
    ended_at: { type: Date, default: Date.now }
});

const CourseLearned = mongoose.model('CourseLearned', CourseLearnedSchema);

export default CourseLearned;
