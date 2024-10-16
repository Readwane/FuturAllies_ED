import StudentAnswer from '../../models/audition/student-answer.js';

// Récupérer toutes les réponses des étudiants
export const getAllStudentAnswers = async (req, res) => {
  try {
    const answers = await StudentAnswer.find().populate('question_id');
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une réponse d'étudiant par ID
export const getStudentAnswerById = async (req, res) => {
  try {
    const answer = await StudentAnswer.findById(req.params.id).populate('question_id');
    if (!answer) return res.status(404).json({ message: 'Réponse non trouvée' });
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle réponse d'étudiant
export const createStudentAnswer = async (req, res) => {
  const { question_id, answers_list, is_correct } = req.body;
  const answer = new StudentAnswer({ question_id, answers_list, is_correct });

  try {
    const savedAnswer = await answer.save();
    res.status(201).json(savedAnswer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une réponse d'étudiant
export const updateStudentAnswer = async (req, res) => {
  const { question_id, answers_list, is_correct } = req.body;

  try {
    const answer = await StudentAnswer.findByIdAndUpdate(req.params.id, {
      question_id,
      answers_list,
      is_correct,
      created_at: Date.now()
    }, { new: true });

    if (!answer) return res.status(404).json({ message: 'Réponse non trouvée' });
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une réponse d'étudiant
export const deleteStudentAnswer = async (req, res) => {
  try {
    const answer = await StudentAnswer.findByIdAndDelete(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Réponse non trouvée' });
    res.status(200).json({ message: 'Réponse supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
