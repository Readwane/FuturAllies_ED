import mongoose from 'mongoose'; 
import {generateContentAI} from '../services/ai.service.js'
import {
    Content, 
    Evaluation, 
    RecruitmentQuiz, 
    RecruitmentQuizQuestion, 
    Section
} from '../models/evaluation.model.js';

// _____________________________ Quiz et evaluation _______________________________



// Exemple d'appel dans un contrôleur
const generateQuiz = async (req, res) => {
    try {
      const { quizPrompt } = req.body;
      const quiz = await generateContentAI(quizPrompt);
      if (quiz) {
        res.status(200).json({ success: true, quiz }); // Retourne le contenu généré si succès
      } else {
        res.status(500).json({ success: false, message: 'Erreur de génération du contenu' });
      }
    } catch (error) {
      console.error('Erreur serveur:', error);
      res.status(500).json({ success: false, message: 'Erreur de génération du contenu' });
    }
};
  

// Fonction API pour générer une évaluation
const generateEval = async (req, res) => {
  try {
    const { evaluationPrompt } = req.body;

    if (!evaluationPrompt) {
      return res.status(400).json({ success: false, message: "❌ Le prompt est requis." });
    }
    const evaluation = await generateContentAI(evaluationPrompt);
    if (evaluation) {
      console.log(evaluation)
      return res.status(200).json({ success: true, evaluation });
    } else {
      return res.status(503).json({
        success: false,
        message: "⚠️ Service temporairement indisponible. Veuillez réessayer plus tard.",
      });
    }
  } catch (error) {
    console.error("🔥 Erreur serveur:", error);
    return res.status(500).json({ success: false, message: "❌ Erreur interne du serveur." });
  }
};


const saveQuiz = async (req, res) => {
  try {
    const { quiz, questions } = req.body;

    // Vérification des données requises
    if (!quiz) {
      return res.status(400).json({ message: "Les données du quiz sont requises" });
    }
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Les questions du quiz sont requises" });
    }

    const { _id, ...quizData } = quiz; 

    // Vérification s'il existe un quiz pour l'offerId donné
    const existingQuizzes = await RecruitmentQuiz.find({ offerId: quizData.offerId });

    // Si un quiz existe déjà pour cette offre, retour erreur
    if (existingQuizzes.length > 0) {
      return res.status(400).json({ message: "Un quiz est déjà enregistré pour cette offre." });
    }

    // Sauvegarde du nouveau quiz
    const savedQuiz = await new RecruitmentQuiz(quizData).save();

    // Sauvegarde des questions du quiz
    const savedQuestions = await Promise.all(
      questions.map(async (question) => {
        const { _id, ...questionContent } = question;
        return await new RecruitmentQuizQuestion({
          ...questionContent,
          recruitmentQuizId: savedQuiz._id // Associe chaque question au quiz sauvegardé
        }).save();
      })
    );

    // Réponse avec le quiz sauvegardé et ses questions
    res.status(201).json({ quiz: savedQuiz, questions: savedQuestions });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur de serveur", error: error.message });
  }
};



const saveEvaluation = async (req, res) => {
  try {
    const { evaluation, sections, contents } = req.body;

    // Validation des données requises
    if (!evaluation) {
      return res.status(400).json({ message: "Les données du sujet sont requises" });
    }
    if (!Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({ message: "Les sections du sujet sont requises" });
    }
    if (!Array.isArray(contents) || contents.length === 0) {
      return res.status(400).json({ message: "Les contenus des sections du sujet sont requis" });
    }

    // Vérifier si un sujet existe déjà pour l'offre
    const { _id, ...evalData } = evaluation; 
    const existingEval = await Evaluation.findOne({ offerId: evalData.offerId });

    if (existingEval) {
      return res.status(400).json({ message: "Un sujet est déjà enregistré pour cette offre." });
    }

    // Sauvegarder l'évaluation
    const savedEval = await new Evaluation(evalData).save();

    // Sauvegarder les sections et les associer à l'évaluation
    const savedSections = await Promise.all(
      sections.map(async (section) => {
        const { _id, ...sect } = section;
        return await new Section({
          ...sect,
          evaluationId: savedEval._id
        }).save();
      })
    );

    // Sauvegarder les contenus et les associer aux sections
    const savedContents = await Promise.all(
      contents.map(async (content) => {
        const { _id, sectionId, ...cont } = content; // Assurez-vous de récupérer l'ID de section à partir du contenu
        
        // Trouver la section correspondante et associer l'ID de la section au contenu
        const section = savedSections.find(s => s._id.toString() === sectionId);
        if (!section) {
          throw new Error('Section non trouvée pour le contenu');
        }

        return await new Content({
          ...cont,
          sectionId: section._id
        }).save();
      })
    );

    // Retourner la réponse avec les données sauvegardées
    res.status(201).json({ evaluation: savedEval, sections: savedSections, contents: savedContents });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur de serveur", error: error.message });
  }
};




// Récupérer les quiz par ID de l'offre
const getQuizzesByOfferId = async (req, res) => {
  try {
    const { offerId } = req.params; // On récupère l'offerId à partir des paramètres de la requête

    if (!offerId) {
      return res.status(400).json({ message: 'L\'ID de l\'offre est requis' });
    }

    // Recherche des quiz qui correspondent à l'offerId
    const quizzes = await RecruitmentQuiz.find({ offerId });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'Aucun quiz trouvé pour cette offre.' });
    }

    // Retourne la liste des quiz trouvés
    return res.status(200).json(quizzes);
  } catch (error) {
    console.error('Erreur lors de la récupération des quiz:', error);
    return res.status(500).json({ message: 'Erreur du serveur', error: error.message });
  }
};



const getEvaluationByOfferId = async (req, res) => {
  try {
    const { offerId } = req.params;
    console.log('controller backend chez getEvaluationByOfferId, offerId recu est:', offerId)
    // Vérifier si l'offerId est fourni
    if (!offerId) {
      return res.status(400).json({ message: "L'ID de l'offre est requis." });
    }
    // Recherche des quiz qui correspondent à l'offerId
    const evaluations = await Evaluation.find({ offerId });

    if (evaluations.length === 0) {
      return res.status(404).json({ message: 'Aucun sujet trouvé pour cette offre.' });
    }

    // Retourne la liste des quiz trouvés
    return res.status(200).json(evaluations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur de serveur", error: error.message });
  }
};


  
// READ RecruitmentQuizzes
const getRecruitmentQuizzes = async (req, res) => {
  try {
      const quizzes = await RecruitmentQuiz.find().populate('questions');
      res.status(200).json(quizzes);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};
  
  // READ RecruitmentQuiz by Id
  const getRecruitmentQuizById = async (req, res) => {
    try {
        const quiz = await RecruitmentQuiz.findById(req.params.id).populate('questions');
        if (!quiz) return res.status(404).json({ message: 'Quiz non trouvé' });
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  // UPDATE RecruitmentQuiz
  const updateRecruitmentQuiz = async (req, res) => {
    const { title, description, questions } = req.body;
  
    if (!title || !description || !questions) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
  
    try {
        const quiz = await RecruitmentQuiz.findByIdAndUpdate(req.params.id, {
            title,
            description,
            questions,
            updatedAt: Date.now()
        }, { new: true });
  
        if (!quiz) return res.status(404).json({ message: 'Quiz non trouvé' });
        res.status(200).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
  
  // DELETE RecruitmentQuiz
  const deleteRecruitmentQuiz = async (req, res) => {
    try {
        const quiz = await RecruitmentQuiz.findByIdAndDelete(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz non trouvé' });
        res.status(200).json({ message: 'Quiz supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  
  // CREATE RecruitmentQuizQuestion
  const createRecruitmentQuizQuestion = async (req, res) => {
    const { quiz, question, options, correctOption } = req.body;
  
    if (!quiz || !question || !options || !correctOption) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
  
    try {
        const quizQuestion = new RecruitmentQuizQuestion(req.body);
        await quizQuestion.save();
        res.status(201).json(quizQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
  
  // READ RecruitmentQuizQuestions
  const getRecruitmentQuizQuestions = async (req, res) => {
    try {
        const quizQuestions = await RecruitmentQuizQuestion.find().populate('quiz');
        res.status(200).json(quizQuestions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
  
  // READ RecruitmentQuizQuestion by Id
  const getRecruitmentQuizQuestionById = async (req, res) => {
    try {
        const quizQuestion = await RecruitmentQuizQuestion.findById(req.params.id);
        if (!quizQuestion) return res.status(404).json({ message: 'Question non trouvée' });
        res.status(200).json(quizQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  // UPDATE RecruitmentQuizQuestion
  const updateRecruitmentQuizQuestion = async (req, res) => {
    const { quiz, question, options, correctOption } = req.body;
  
    if (!quiz || !question || !options || !correctOption) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
  
    try {
        const quizQuestion = await RecruitmentQuizQuestion.findByIdAndUpdate(req.params.id, {
            quiz,
            question,
            options,
            correctOption,
            updatedAt: Date.now()
        }, { new: true });
  
        if (!quizQuestion) return res.status(404).json({ message: 'Question non trouvée' });
        res.status(200).json(quizQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
  
  // DELETE RecruitmentQuizQuestion
  const deleteRecruitmentQuizQuestion = async (req, res) => {
    try {
        const quizQuestion = await RecruitmentQuizQuestion.findByIdAndDelete(req.params.id);
        if (!quizQuestion) return res.status(404).json({ message: 'Question non trouvée' });
        res.status(200).json({ message: 'Question supprimée' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  
  // READ Evaluations
  const getEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find().populate('content');
        res.status(200).json(evaluations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
  
  // READ Evaluation by Id
  const getEvaluationById = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id);
        if (!evaluation) return res.status(404).json({ message: 'Évaluation non trouvée' });
        res.status(200).json(evaluation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  // UPDATE Evaluation
  const updateEvaluation = async (req, res) => {
    const { content, score, date } = req.body;
  
    if (!content || !score || !date) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
  
    try {
        const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, {
            content,
            score,
            date,
            updatedAt: Date.now()
        }, { new: true });
  
        if (!evaluation) return res.status(404).json({ message: 'Évaluation non trouvée' });
        res.status(200).json(evaluation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
  
  // DELETE Evaluation
  const deleteEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.findByIdAndDelete(req.params.id);
        if (!evaluation) return res.status(404).json({ message: 'Évaluation non trouvée' });
        res.status(200).json({ message: 'Évaluation supprimée' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  
  // CREATE Section
  const createSection = async (req, res) => {
    const { evaluationId, title, order, points } = req.body;
  
    if (!evaluationId || !title || !order || !points) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
  
    try {
        const section = new Section(req.body);
        await section.save();
        res.status(201).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
  
  // READ Sections
  const getSections = async (req, res) => {
    try {
        const sections = await Section.find().populate('evaluationId');
        res.status(200).json(sections);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
  
  // READ Section by Id
  const getSectionById = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id).populate('evaluationId');
        if (!section) return res.status(404).json({ message: 'Section non trouvée' });
        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  // UPDATE Section
  const updateSection = async (req, res) => {
    const { evaluationId, title, order, points } = req.body;
  
    if (!evaluationId || !title || !order || !points) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
  
    try {
        const section = await Section.findByIdAndUpdate(req.params.id, {
            evaluationId,
            title,
            order,
            points,
            updatedAt: Date.now()
        }, { new: true });
  
        if (!section) return res.status(404).json({ message: 'Section non trouvée' });
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
  
  // DELETE Section
  const deleteSection = async (req, res) => {
    try {
        const section = await Section.findByIdAndDelete(req.params.id);
        if (!section) return res.status(404).json({ message: 'Section non trouvée' });
        res.status(200).json({ message: 'Section supprimée' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  
  // CREATE Content
  const createContent = async (req, res) => {
    const { title, body, author } = req.body;
  
    if (!title || !body || !author) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
  
    try {
        const content = new Content(req.body);
        await content.save();
        res.status(201).json(content);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
  
  // READ Content
  const getContents = async (req, res) => {
    try {
        const contents = await Content.find().populate('author');
        res.status(200).json(contents);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
  
  // READ Content by Id
  const getContentById = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) return res.status(404).json({ message: 'Contenu non trouvé' });
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  // UPDATE Content
  const updateContent = async (req, res) => {
    const { title, body, author } = req.body;
  
    if (!title || !body || !author) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
  
    try {
        const content = await Content.findByIdAndUpdate(req.params.id, {
            title,
            body,
            author,
            updatedAt: Date.now()
        }, { new: true });
  
        if (!content) return res.status(404).json({ message: 'Contenu non trouvé' });
        res.status(200).json(content);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
  
  // DELETE Content
  const deleteContent = async (req, res) => {
    try {
        const content = await Content.findByIdAndDelete(req.params.id);
        if (!content) return res.status(404).json({ message: 'Contenu non trouvé' });
        res.status(200).json({ message: 'Contenu supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

  
  export {
    generateQuiz,
    generateEval,
    createContent,
    getContents,
    getContentById,
    updateContent,
    deleteContent,

    getRecruitmentQuizzes,
    getRecruitmentQuizById,
    saveQuiz,
    getQuizzesByOfferId,
    updateRecruitmentQuiz,
    deleteRecruitmentQuiz,

    getRecruitmentQuizQuestions,
    getRecruitmentQuizQuestionById,
    createRecruitmentQuizQuestion,
    updateRecruitmentQuizQuestion,
    deleteRecruitmentQuizQuestion,

    getEvaluations,
    getEvaluationByOfferId,
    getEvaluationById,
    saveEvaluation,
    updateEvaluation,
    deleteEvaluation,

    getSections,
    getSectionById,
    createSection,
    updateSection,
    deleteSection,
  }