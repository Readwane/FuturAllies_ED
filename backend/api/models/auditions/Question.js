import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    order: { type: Number, required: true },
    title: { type: String, required: true },
    questionType: {
        type: String,
        enum: ['multiple_choice', 'one_choice'],
        required: true
    },
    choicesList: { type: String, required: true }, // JSON string of choices
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
