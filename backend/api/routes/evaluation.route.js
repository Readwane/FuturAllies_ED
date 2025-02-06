import express from 'express';
import multer from 'multer';
const upload = multer();
import {
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
} from '../controllers/evaluation.controller.js';

const quizRouter = express.Router();
quizRouter.get('/quiz', getRecruitmentQuizzes);
quizRouter.get('/quizz/:offerId', getQuizzesByOfferId);
quizRouter.post('/quiz/gen', generateQuiz);
quizRouter.post('/quiz/save', upload.none(), saveQuiz);

// Assurez-vous que cette route est correctement définie dans ton backend
quizRouter.get('/eval/:offerId', getEvaluationByOfferId);
quizRouter.post('/eval/gen', generateEval);
quizRouter.post('/eval/save', upload.none(), saveEvaluation);
// quizRouter.post('/eval/save', upload.none(), saveEval);



export  {quizRouter};