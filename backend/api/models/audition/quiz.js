import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
    partId: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
    title: { type: String, required: true },
    competencyAssessed: [{ type: String, required: true }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.model('Quiz', QuizSchema);

export default Quiz;
