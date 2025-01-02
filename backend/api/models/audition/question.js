import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
    questionType: { type: String, enum: ['MCQ', 'UCQ'], required: true },
    options: { type: [String], required: true },
    CorrectOptions: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
