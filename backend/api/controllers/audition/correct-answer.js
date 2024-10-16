import CorrectAnswer from '../../models/training/CorrectAnswer.js';

export const getAllCorrectAnswers = async (req, res) => {
  try {
    const correctAnswers = await CorrectAnswer.find().populate('question_id');
    res.status(200).json(correctAnswers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCorrectAnswerById = async (req, res) => {
  try {
    const correctAnswer = await CorrectAnswer.findById(req.params.id).populate('question_id');
    if (!correctAnswer) return res.status(404).json({ message: 'Réponse correcte non trouvée' });
    res.status(200).json(correctAnswer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCorrectAnswer = async (req, res) => {
  const { question_id, answers_list } = req.body;

  if (!question_id || !answers_list) {
    return res.status(400).json({ message: 'Les champs question_id et answers_list sont requis.' });
  }

  const correctAnswer = new CorrectAnswer({ question_id, answers_list });

  try {
    await correctAnswer.save();
    res.status(201).json(correctAnswer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCorrectAnswer = async (req, res) => {
  const { answers_list } = req.body;

  try {
    const correctAnswer = await CorrectAnswer.findByIdAndUpdate(
      req.params.id,
      { answers_list, updated_at: Date.now() },
      { new: true }
    );
    if (!correctAnswer) return res.status(404).json({ message: 'Réponse correcte non trouvée' });
    res.status(200).json(correctAnswer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCorrectAnswer = async (req, res) => {
  try {
    const correctAnswer = await CorrectAnswer.findByIdAndDelete(req.params.id);
    if (!correctAnswer) return res.status(404).json({ message: 'Réponse correcte non trouvée' });
    res.status(200).json({ message: 'Réponse correcte supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
