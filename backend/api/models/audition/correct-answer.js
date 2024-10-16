const correctAnswerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answersList: { type: String, required: true }, // JSON string of answers
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

const CorrectAnswer = mongoose.model('CorrectAnswer', correctAnswerSchema);

export default CorrectAnswer;
