import mongoose from 'mongoose';

const StudentAnswerSchema = new mongoose.Schema({
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answers_list: [{ type: String, required: true }],
    is_correct: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

const StudentAnswer = mongoose.model('StudentAnswer', StudentAnswerSchema);

export default StudentAnswer;
