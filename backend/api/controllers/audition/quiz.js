import Quiz from '../../models/audition/quiz.js';

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('chapter_id');
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('chapter_id');
    if (!quiz) return res.status(404).json({ message: 'Quiz non trouvé' });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createQuiz = async (req, res) => {
  const { chapter_id, title, questions } = req.body;

  if (!chapter_id || !title || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: 'Les champs chapter_id, title et questions sont requis.' });
  }

  const quiz = new Quiz({ chapter_id, title, questions });

  try {
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateQuiz = async (req, res) => {
  const { title, questions } = req.body;

  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { title, questions, updated_at: Date.now() },
      { new: true }
    );
    if (!quiz) return res.status(404).json({ message: 'Quiz non trouvé' });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz non trouvé' });
    res.status(200).json({ message: 'Quiz supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
