import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
    chapter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseChapter', required: true},
    title: { type: String, required: true },
    competency_assessed: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Quiz = mongoose.model('Quiz', QuizSchema);

export default Quiz;
