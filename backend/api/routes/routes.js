
import express from 'express';

// *************************** Imports pour la partie service (wwedo) **********************************
import {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from '../controllers/service/service.js'

// *************************** Imports pour la partie authentication **********************************
import { 
    getAllDocs,
    getDocById,
    createDoc,
    updateDoc,
    deleteDoc
} from '../controllers/authentication/doc.js';

import { 
    getAllGroups,   
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
} from '../controllers/authentication/group.js';

import { 
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile,
} from '../controllers/authentication/profile.js';

import { 
    getAllUserGroups,
    getUserGroupById,
    createUserGroup,
    deleteUserGroup
} from '../controllers/authentication/user-group.js';

import { 
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByUsername,
    getProfileByUserId
} from '../controllers/authentication/user.js';

// *************************** Imports pour la partie audittion ***************************************
import {
    getAllChapters,
    getChapterById,
    createChapter,
    updateChapter,
    deleteChapter
} from '../controllers/audition/chapter.js';

import {
    getAllContentTexts,
    getContentTextById,
    createContentText,
    updateContentText,
    deleteContentText
} from '../controllers/audition/content-text.js';

import {
    getAllContentVideos,
    getContentVideoById,
    createContentVideo,
    updateContentVideo,
    deleteContentVideo
} from '../controllers/audition/content-video.js';

import {
    getAllContents,
    getContentById,
    createContent,
    updateContent,
    deleteContent
} from '../controllers/audition/content.js';

import {
    getAllCorrectAnswers,
    getCorrectAnswerById,
    createCorrectAnswer,
    updateCorrectAnswer,
    deleteCorrectAnswer
} from '../controllers/audition/correct-answer.js';

import {
    getAllStudentAnswers,
    getStudentAnswerById,
    createStudentAnswer,
    updateStudentAnswer,
    deleteStudentAnswer
} from '../controllers/audition/student-answer.js';

import {
    getAllCoursesLearned,
    getCourseLearnedById,
    createCourseLearned,
    updateCourseLearned,
    deleteCourseLearned
} from '../controllers/audition/course-learned.js';

import {
    getAllCourseReviews,
    getCourseReviewById,
    createCourseReview,
    updateCourseReview,
    deleteCourseReview
} from '../controllers/audition/course-review.js';

import {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} from '../controllers/audition/course.js';

import {
    getAllDomains,
    getDomainById,
    createDomain,
    updateDomain,
    deleteDomain
} from '../controllers/audition/domain.js';

import {
    getAllModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule
} from '../controllers/audition/module.js';

import {
    getAllParts,
    getPartById,
    createPart,
    updatePart,
    deletePart
} from '../controllers/audition/part.js';

import {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
} from '../controllers/audition/question.js';

import {
    getAllQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz
} from '../controllers/audition/quiz.js';

// *************************** Imports pour la partie certification ***********************************
import {
    getAllCertificationsEvaluations,
    getCertificationEvaluationById,
    createCertificationEvaluation,
    updateCertificationEvaluation,
    deleteCertificationEvaluation
} from '../controllers/certification/certification-evaluation.js';

import {
    getAllCertificationsGiven,
    getCertificationGivenById,
    createCertificationGiven,
    updateCertificationGiven,
    deleteCertificationGiven
} from '../controllers/certification/certification-given.js';

import {
    createCertification,
    getAllCertifications,
    getCertificationById,
    updateCertification,
    deleteCertification
} from '../controllers/certification/certification.js';

// *************************** Imports pour la partie recruitment ************************************
import {
    createOfferApplication,
    getOfferApplications,
    getJobApplications, 
    getInternshipApplications,
    getOfferApplicationById,
    updateOfferApplication,
    deleteOfferApplication
} from '../controllers/recruitment/offer-application.js'

import {
    createOffer,
    getOffers,
    getJobs,
    getInternships,
    getOfferById,
    updateOffer,
    deleteOffer
} from '../controllers/recruitment/offer.js';


// **************************** Imports pour la partie training ************************************
import {
    // getWebinars,
    getInPersonTrainings,
    createTraining,
    getTrainings,
    getTrainingById,
    updateTraining,
    deleteTraining
} from '../controllers/training/training.js';

import {
    // getWebinarApplications, 
    getInPersonApplications,
    createTrainingApplication,
    getTrainingApplications,
    getTrainingApplicationById,
    updateTrainingApplication,
    deleteTrainingApplication
} from '../controllers/training/training-application.js';

// ******************************** Imports pour la partie paiement *****************************************
import {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransactionStatus
} from '../controllers/payment/transaction.controller.js';

import {
    getAllSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription
} from '../controllers/payment/subcription.controller.js';

import {
    getAllPaymentProviders,
    getPaymentProviderById,
    createPaymentProvider,
    updatePaymentProvider,
    deletePaymentProvider
} from '../controllers/payment/payment-provider.controller.js';

import{
    getAllPaymentProviderTransactions,
    getPaymentProviderTransactionById,
    createPaymentProviderTransaction,
    updatePaymentProviderTransaction,
    deletePaymentProviderTransaction
} from '../controllers/payment/payment-provider-transaction.controller.js';

import {
    getAllPaymentMethods,
    getPaymentMethodById,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
} from '../controllers/payment/payment-method.controller.js';

import {
    getAllPaymentLogs,
    getPaymentLogById,
    createPaymentLog,
    updatePaymentLog,
    deletePaymentLog
} from '../controllers/payment/payment-log.controller.js';

import {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice
} from '../controllers/payment/invoice.controller.js';



// ********************************* Deinition des routers pour chaque partie *******************************/
const servicesRoutes = express.Router();
const authenticationRoutes = express.Router();
const auditionRoutes = express.Router();
const certificationRoutes = express.Router();
const interactionRoutes = express.Router();
const recruitmentRoutes = express.Router();
const trainingRoutes = express.Router();
const paymentRoutes = express.Router();
// const webinarsRoutes = express.Router();


//******************************* Routes pour la partie authnetication *************************************/

// Routes pour Doc

servicesRoutes.post('/services/create', createService);
servicesRoutes.get('/services', getAllServices);
servicesRoutes.get('/services/:id', getServiceById);
servicesRoutes.put('/services/:id/update', updateService);
servicesRoutes.delete('/services/:id/delete', deleteService);

//******************************* Routes pour la partie authnetication *************************************/
// Routes pour Doc
authenticationRoutes.post('/docs/create', createDoc);
authenticationRoutes.get('/docs', getAllDocs);
authenticationRoutes.get('/docs/:id', getDocById);
authenticationRoutes.put('/docs/:id/update', updateDoc);
authenticationRoutes.delete('/docs/:id/delete', deleteDoc);

// Routes pour Group
authenticationRoutes.post('/groups/create', createGroup);
authenticationRoutes.get('/groups', getAllGroups);
authenticationRoutes.get('/groups/:id', getGroupById);
authenticationRoutes.put('/groups/:id/update', updateGroup);
authenticationRoutes.delete('/groups/:id/delete', deleteGroup);

// Routes pour Profile
authenticationRoutes.post('/profiles/create', createProfile);
authenticationRoutes.get('/profiles', getAllProfiles);
authenticationRoutes.get('/profiles/:id', getProfileById);
authenticationRoutes.put('/profiles/:id/update', updateProfile);
authenticationRoutes.delete('/profiles/:id/delete', deleteProfile);

// Routes pour UserGroup
authenticationRoutes.post('/user-groups/create', createUserGroup);
authenticationRoutes.get('/user-groups', getAllUserGroups);
authenticationRoutes.get('/user-groups/:id', getUserGroupById);
// authenticationRoutes.put('/user-groups/:id/update', updateUserGroup);
authenticationRoutes.delete('/user-groups/:id/delete', deleteUserGroup);

// Routes pour User
authenticationRoutes.post('/users/create', createUser);
authenticationRoutes.get('/users', getAllUsers);
authenticationRoutes.get('/users/:id', getUserById);
authenticationRoutes.put('/users/:id/update', updateUser);
authenticationRoutes.delete('/users/:id/delete', deleteUser);
authenticationRoutes.get('/users/rep/:username', getUserByUsername);
authenticationRoutes.get('users/byUser/rip/:userId', getProfileByUserId);

//******************************* Routes pour la partie audition *************************************/
// Routes pour Chapter
auditionRoutes.post('/chapters/create', createChapter);
auditionRoutes.get('/chapters', getAllChapters);
auditionRoutes.get('/chapters/:id', getChapterById);
auditionRoutes.put('/chapters/:id/update', updateChapter);
auditionRoutes.delete('/chapters/:id/delete', deleteChapter);

// Routes pour ContentText
auditionRoutes.post('/content-texts/create', createContentText);
auditionRoutes.get('/content-texts', getAllContentTexts);
auditionRoutes.get('/content-texts/:id', getContentTextById);
auditionRoutes.put('/content-texts/:id/update', updateContentText);
auditionRoutes.delete('/content-texts/:id/delete', deleteContentText);

// Routes pour ContentVideo
auditionRoutes.post('/content-videos/create', createContentVideo);
auditionRoutes.get('/content-videos', getAllContentVideos);
auditionRoutes.get('/content-videos/:id', getContentVideoById);
auditionRoutes.put('/content-videos/:id/update', updateContentVideo);
auditionRoutes.delete('/content-videos/:id/delete', deleteContentVideo);

// Routes pour Content
auditionRoutes.post('/contents/create', createContent);
auditionRoutes.get('/contents', getAllContents);
auditionRoutes.get('/contents/:id', getContentById);
auditionRoutes.put('/contents/:id/update', updateContent);
auditionRoutes.delete('/contents/:id/delete', deleteContent);

// Routes pour CorrectAnswer
auditionRoutes.post('/correct-answers/create', createCorrectAnswer);
auditionRoutes.get('/correct-answers', getAllCorrectAnswers);
auditionRoutes.get('/correct-answers/:id', getCorrectAnswerById);
auditionRoutes.put('/correct-answers/:id/update', updateCorrectAnswer);
auditionRoutes.delete('/correct-answers/:id/delete', deleteCorrectAnswer);

// Routes pour StudentAnswer
auditionRoutes.post('/student-answers/create', createStudentAnswer);
auditionRoutes.get('/student-answers', getAllStudentAnswers);
auditionRoutes.get('/student-answers/:id', getStudentAnswerById);
auditionRoutes.put('/student-answers/:id/update', updateStudentAnswer);
auditionRoutes.delete('/student-answers/:id/delete', deleteStudentAnswer);

// Routes pour CourseLearned
auditionRoutes.post('/courses-learned/create', createCourseLearned);
auditionRoutes.get('/courses-learned', getAllCoursesLearned);
auditionRoutes.get('/courses-learned/:id', getCourseLearnedById);
auditionRoutes.put('/courses-learned/:id/update', updateCourseLearned);
auditionRoutes.delete('/courses-learned/:id/delete', deleteCourseLearned);

// Routes pour CourseReview
auditionRoutes.post('/course-reviews/create', createCourseReview);
auditionRoutes.get('/course-reviews', getAllCourseReviews);
auditionRoutes.get('/course-reviews/:id', getCourseReviewById);
auditionRoutes.put('/course-reviews/:id/update', updateCourseReview);
auditionRoutes.delete('/course-reviews/:id/delete', deleteCourseReview);

// Routes pour Course
auditionRoutes.post('/courses/create', createCourse);
auditionRoutes.get('/courses', getAllCourses);
auditionRoutes.get('/courses/:id', getCourseById);
auditionRoutes.put('/courses/:id/update', updateCourse);
auditionRoutes.delete('/courses/:id/delete', deleteCourse);

// Routes pour Domain
auditionRoutes.post('/domains/create', createDomain);
auditionRoutes.get('/domains', getAllDomains);
auditionRoutes.get('/domains/:id', getDomainById);
auditionRoutes.put('/domains/:id/update', updateDomain);
auditionRoutes.delete('/domains/:id/delete', deleteDomain);

// Routes pour Module
auditionRoutes.post('/modules/create', createModule);
auditionRoutes.get('/modules', getAllModules);
auditionRoutes.get('/modules/:id', getModuleById);
auditionRoutes.put('/modules/:id/update', updateModule);
auditionRoutes.delete('/modules/:id/delete', deleteModule);

// Routes pour Part
auditionRoutes.post('/parts/create', createPart);
auditionRoutes.get('/parts', getAllParts);
auditionRoutes.get('/parts/:id', getPartById);
auditionRoutes.put('/parts/:id/update', updatePart);
auditionRoutes.delete('/parts/:id/delete', deletePart);

// Routes pour Question
auditionRoutes.post('/questions/create', createQuestion);
auditionRoutes.get('/questions', getAllQuestions);
auditionRoutes.get('/questions/:id', getQuestionById);
auditionRoutes.put('/questions/:id/update', updateQuestion);
auditionRoutes.delete('/questions/:id/delete', deleteQuestion);

// Routes pour Quiz
auditionRoutes.post('/quizzes/create', createQuiz);
auditionRoutes.get('/quizzes', getAllQuizzes);
auditionRoutes.get('/quizzes/:id', getQuizById);
auditionRoutes.put('/quizzes/:id/update', updateQuiz);
auditionRoutes.delete('/quizzes/:id/delete', deleteQuiz);



//******************************* Routes pour la partie certification *************************************/
// Routes pour CertificationEvaluation
certificationRoutes.post('/certification-evaluations/create', createCertificationEvaluation);
certificationRoutes.get('/certification-evaluations', getAllCertificationsEvaluations);
certificationRoutes.get('/certification-evaluations/:id', getCertificationEvaluationById);
certificationRoutes.put('/certification-evaluations/:id/update', updateCertificationEvaluation);
certificationRoutes.delete('/certification-evaluations/:id/delete', deleteCertificationEvaluation);

// Routes pour CertificationGiven
certificationRoutes.post('/certifications-given/create', createCertificationGiven);
certificationRoutes.get('/certifications-given', getAllCertificationsGiven);
certificationRoutes.get('/certifications-given/:id', getCertificationGivenById);
certificationRoutes.put('/certifications-given/:id/update', updateCertificationGiven);
certificationRoutes.delete('/certifications-given/:id/delete', deleteCertificationGiven);

// Routes pour Certification
certificationRoutes.post('/certifications/create', createCertification);
certificationRoutes.get('/certifications', getAllCertifications);
certificationRoutes.get('/certifications/:id', getCertificationById);
certificationRoutes.put('/certifications/:id/update', updateCertification);
certificationRoutes.delete('/certifications/:id/delete', deleteCertification);

//******************************* Routes pour la partie recruitment *************************************/
// Routes pour OfferApplication
recruitmentRoutes.get('/offer-applications', getOfferApplications);
recruitmentRoutes.post('/jobs-applications', getJobApplications);
recruitmentRoutes.get('/internships-applications', getInternshipApplications);
recruitmentRoutes.post('/offer-applications/create', createOfferApplication);
recruitmentRoutes.get('/offer-applications/:id', getOfferApplicationById);
recruitmentRoutes.put('/offer-applications/:id/updte', updateOfferApplication);
recruitmentRoutes.delete('/offer-applications/:id/delete', deleteOfferApplication);

// Routes pour Offer
recruitmentRoutes.get('/offers', getOffers);
recruitmentRoutes.post('/jobs', getJobs);
recruitmentRoutes.get('/internships', getInternships);
recruitmentRoutes.post('/offers/create', createOffer);
recruitmentRoutes.get('/offers/:id', getOfferById);
recruitmentRoutes.put('/offers/:id/update', updateOffer);
recruitmentRoutes.delete('/offers/:id/delete', deleteOffer);

//******************************* Routes pour la partie training *************************************/
// Routes pour Training
trainingRoutes.post('/trainings', getTrainings);
// trainingRoutes.post('/webinars', getWebinars);
trainingRoutes.get('/in-person-trainings', getInPersonTrainings);
trainingRoutes.post('/trainings/create', createTraining);
trainingRoutes.get('/trainings/:id', getTrainingById);
trainingRoutes.put('/trainings/:id/update', updateTraining);
trainingRoutes.delete('/trainings/:id/delete', deleteTraining);



// Routes pour TrainingApplication
// trainingRoutes.post('/webinars-applications', getWebinarApplications);
trainingRoutes.get('/in-persons-applications', getInPersonApplications);
trainingRoutes.post('/training-applications/create', createTrainingApplication);
trainingRoutes.get('/training-applications', getTrainingApplications);
trainingRoutes.get('/training-applications/:id', getTrainingApplicationById);
trainingRoutes.put('/training-applications/:id/update', updateTrainingApplication);
trainingRoutes.delete('/training-applications/:id', deleteTrainingApplication);


//******************************* Routes pour la partie authnetication *************************************/
// Routes pour subcription
paymentRoutes.post('/subscriptions/create', createSubscription);
paymentRoutes.get('/subscriptions', getAllSubscriptions);
paymentRoutes.get('/subscriptions/:id', getSubscriptionById);
paymentRoutes.put('/subscriptions/:id/update', updateSubscription);
paymentRoutes.delete('/subscriptions/:id/delete', deleteSubscription);

// Routes pour transaction
paymentRoutes.post('/transactions/create', createTransaction);
paymentRoutes.get('/transactions', getAllTransactions);
paymentRoutes.get('/transactions/:id', getTransactionById);
paymentRoutes.put('/transactions/:id/status', updateTransactionStatus)
// paymentRoutes.put('/subscriptions/:id/update', updateSubscription);
// paymentRoutes.delete('/subscriptions/:id/delete', deleteSubscription);

// Routes pour payment-provider
paymentRoutes.post('/payment-providers/create', createPaymentProvider);
paymentRoutes.get('/payment-providers', getAllPaymentProviders);
paymentRoutes.get('/payment-providers/:id', getPaymentProviderById);
paymentRoutes.put('/payment-providers/:id/update', updatePaymentProvider);
paymentRoutes.delete('/payment-providers/:id/delete', deletePaymentProvider);

// Routes pour payment-provider-transaction   
paymentRoutes.post('/payment-provider-transactions/create', createPaymentProviderTransaction);
paymentRoutes.get('/payment-provider-transactions', getAllPaymentProviderTransactions);
paymentRoutes.get('/payment-provider-transactions/:id', getPaymentProviderTransactionById);
paymentRoutes.put('/payment-provider-transactions/:id/update', updatePaymentProviderTransaction);
paymentRoutes.delete('/payment-provider-transactions/:id/delete', deletePaymentProviderTransaction);

// Routes pour payment-methode
paymentRoutes.post('/payment-methods/create', createPaymentMethod);
paymentRoutes.get('/payment-methods', getAllPaymentMethods);
paymentRoutes.get('/payment-methods/:id', getPaymentMethodById);
paymentRoutes.put('/payment-methods/:id/update', updatePaymentMethod);
paymentRoutes.delete('/payment-methods/:id/delete', deletePaymentMethod);

// Routes pour payment-log
paymentRoutes.post('/payment-logs/create', createPaymentLog);
paymentRoutes.get('/payment-logs', getAllPaymentLogs);
paymentRoutes.get('/payment-logs/:id', getPaymentLogById);
paymentRoutes.put('/payment-logs/:id/update', updatePaymentLog);
paymentRoutes.delete('/payment-logs/:id/delete', deletePaymentLog);


// Routes pour invoice
paymentRoutes.post('/invoices/create', createInvoice);
paymentRoutes.get('/invoices', getAllInvoices);
paymentRoutes.get('/invoices/:id', getInvoiceById);
paymentRoutes.put('/invoices/:id/update', updateInvoice);
paymentRoutes.delete('/invoices/:id/delete', deleteInvoice);


// ****************************** Exportattion des diffrents routers *****************************************/
export {
    servicesRoutes,
    authenticationRoutes,
    auditionRoutes,
    certificationRoutes,
    interactionRoutes,
    recruitmentRoutes,
    trainingRoutes,
    paymentRoutes
};