import express from 'express';
// Controllers methods importations
import {
    getDomains, getDomainById, createDomain, updateDomain, deleteDomain,
    getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
    getParts, getPartById, createPart, updatePart, deletePart,
    getChapters, getChapterById, createChapter, updateChapter, deleteChapter,
    getSections, getSectionById, createSection, updateSection, deleteSection,
    getContents, getContentById, createContent, updateContent, deleteContent,
    getQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz,
    getQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion,
    getCourseLearneds, getCourseLearnedById, createCourseLearned, updateCourseLearned, deleteCourseLearned,
    getCourseReviews, getCourseReviewById, createCourseReview, updateCourseReview, deleteCourseReview,
    updateCourseLearnedProgess
} from '../controllers/audition.controller.js';

const auditionRoutes = express.Router();

// Domain model routes
auditionRoutes.get('/domains', getDomains);
auditionRoutes.get('/domains/:id', getDomainById);
auditionRoutes.post('/domains', createDomain);
auditionRoutes.put('/domains/:id', updateDomain);
auditionRoutes.delete('/domains/:id', deleteDomain);

// Course model routes
auditionRoutes.get('/courses', getCourses);
auditionRoutes.get('/courses/:id', getCourseById);
auditionRoutes.post('/courses', createCourse);
auditionRoutes.put('/courses/:id', updateCourse);
auditionRoutes.delete('/courses/:id', deleteCourse);

// Part model routes
auditionRoutes.get('/parts', getParts);
auditionRoutes.get('/parts/:id', getPartById);
auditionRoutes.post('/parts', createPart);
auditionRoutes.put('/parts/:id', updatePart);
auditionRoutes.delete('/parts/:id', deletePart);

// Chapter model routes
auditionRoutes.get('/chapters', getChapters);
auditionRoutes.get('/chapters/:id', getChapterById);
auditionRoutes.post('/chapters', createChapter);
auditionRoutes.put('/chapters/:id', updateChapter);
auditionRoutes.delete('/chapters/:id', deleteChapter);

// Section model routes
auditionRoutes.get('/sections', getSections);
auditionRoutes.get('/sections/:id', getSectionById);
auditionRoutes.post('/sections', createSection);
auditionRoutes.put('/sections/:id', updateSection);
auditionRoutes.delete('/sections/:id', deleteSection);

// Content model routes
auditionRoutes.get('/contents', getContents);
auditionRoutes.get('/contents/:id', getContentById);
auditionRoutes.post('/contents', createContent);
auditionRoutes.put('/contents/:id', updateContent);
auditionRoutes.delete('/contents/:id', deleteContent);

// Quiz model routes
auditionRoutes.get('/quizzes', getQuizzes);
auditionRoutes.get('/quizzes/:id', getQuizById);
auditionRoutes.post('/quizzes', createQuiz);
auditionRoutes.put('/quizzes/:id', updateQuiz);
auditionRoutes.delete('/quizzes/:id', deleteQuiz);

// Question model routes
auditionRoutes.get('/questions', getQuestions);
auditionRoutes.get('/questions/:id', getQuestionById);
auditionRoutes.post('/questions', createQuestion);
auditionRoutes.put('/questions/:id', updateQuestion);
auditionRoutes.delete('/questions/:id', deleteQuestion);

// CourseLearned model routes
auditionRoutes.get('/courses-learned', getCourseLearneds);
auditionRoutes.get('/courses-learned/:id', getCourseLearnedById);
auditionRoutes.post('/courses-learned', createCourseLearned);
auditionRoutes.put('/courses-learned/:id', updateCourseLearned);
auditionRoutes.put('/courses-learned', updateCourseLearnedProgess);
auditionRoutes.delete('/courses-learned/:id', deleteCourseLearned);

// CourseReview model routes
auditionRoutes.get('/courses-reviews', getCourseReviews);
auditionRoutes.get('/courses-reviews/:id', getCourseReviewById);
auditionRoutes.post('/courses-reviews', createCourseReview);
auditionRoutes.put('/courses-reviews/:id', updateCourseReview);
auditionRoutes.delete('/courses-reviews/:id', deleteCourseReview);

export default auditionRoutes;