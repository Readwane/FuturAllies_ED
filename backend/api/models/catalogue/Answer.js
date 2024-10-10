import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    answer_text: { type: String, required: true },
    is_correct: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

const Answer = mongoose.model('Answer', AnswerSchema);

export default Answer;
