const studentAnswerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answersList: { type: String, required: true }, // JSON string of answers
    isCorrect: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

const StudentAnswer = mongoose.model('StudentAnswer', studentAnswerSchema);

export default StudentAnswer;
