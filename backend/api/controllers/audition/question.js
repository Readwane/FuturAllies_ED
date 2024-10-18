import Question from '../../models/audition/question.js';

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('quiz_id');
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('quiz_id');
    if (!question) return res.status(404).json({ message: 'Question non trouvée' });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createQuestion = async (req, res) => {
  const { quiz_id, question_text, answers_list } = req.body;

  if (!quiz_id || !question_text || !Array.isArray(answers_list) || answers_list.length === 0) {
    return res.status(400).json({ message: 'Les champs quiz_id, question_text et answers_list sont requis.' });
  }

  const question = new Question({ quiz_id, question_text, answers_list });

  try {
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  const { question_text, answers_list } = req.body;

  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { question_text, answers_list, updated_at: Date.now() },
      { new: true }
    );
    if (!question) return res.status(404).json({ message: 'Question non trouvée' });
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question non trouvée' });
    res.status(200).json({ message: 'Question supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
