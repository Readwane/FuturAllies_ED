import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    title: { type: String, required: true },
    question_type: { type: String, enum: ['multiple_choice', 'one_choice'], required: true },
    choices_list: [{ type: String, required: true }],
    order: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
