import mongoose from 'mongoose';

const CorrectAnswerSchema = new mongoose.Schema({
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, // Identifiant de la question associée
    answers_list: { type: String, required: true }, // Liste des réponses correctes (formatée en chaîne)
    created_at: { type: Date, default: Date.now }
});

const CorrectAnswer = mongoose.model('CorrectAnswer', CorrectAnswerSchema);

export default CorrectAnswer;
