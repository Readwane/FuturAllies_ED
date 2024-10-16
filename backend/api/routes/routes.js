import express from 'express';
import {
    createCertificationEvaluation,
    getCertificationEvaluations,
    getCertificationEvaluationById,
    updateCertificationEvaluation,
    deleteCertificationEvaluation
} from './controllers/certificationEvaluationController';

import {
    createCertificationGiven,
    getCertificationsGiven,
    getCertificationGivenById,
    updateCertificationGiven,
    deleteCertificationGiven
} from './controllers/certificationGivenController';

import {
    createCertification,
    getCertifications,
    getCertificationById,
    updateCertification,
    deleteCertification
} from './controllers/certificationController';

import {
    createOfferApplication,
    getOfferApplications,
    getOfferApplicationById,
    updateOfferApplication,
    deleteOfferApplication
} from './controllers/offer';

import {
    createOffer,
    getOffers,
    getOfferById,
    updateOffer,
    deleteOffer
} from './controllers/offer';

import {
    createTraining,
    getTrainings,
    getTrainingById,
    updateTraining,
    deleteTraining
} from './controllers/trainingController.js';

import {
    createTrainingApplication,
    getTrainingApplications,
    getTrainingApplicationById,
    updateTrainingApplication,
    deleteTrainingApplication
} from './controllers/trainingApplicationController.js';

const router = express.Router();

// Routes pour CertificationEvaluation
router.post('/certification-evaluations', createCertificationEvaluation);
router.get('/certification-evaluations', getCertificationEvaluations);
router.get('/certification-evaluations/:id', getCertificationEvaluationById);
router.put('/certification-evaluations/:id', updateCertificationEvaluation);
router.delete('/certification-evaluations/:id', deleteCertificationEvaluation);

// Routes pour CertificationGiven
router.post('/certifications-given', createCertificationGiven);
router.get('/certifications-given', getCertificationsGiven);
router.get('/certifications-given/:id', getCertificationGivenById);
router.put('/certifications-given/:id', updateCertificationGiven);
router.delete('/certifications-given/:id', deleteCertificationGiven);

// Routes pour Certification
router.post('/certifications', createCertification);
router.get('/certifications', getCertifications);
router.get('/certifications/:id', getCertificationById);
router.put('/certifications/:id', updateCertification);
router.delete('/certifications/:id', deleteCertification);

// Routes pour OfferApplication
router.post('/offer-applications', createOfferApplication);
router.get('/offer-applications', getOfferApplications);
router.get('/offer-applications/:id', getOfferApplicationById);
router.put('/offer-applications/:id', updateOfferApplication);
router.delete('/offer-applications/:id', deleteOfferApplication);

// Routes pour Offer
router.post('/offers', createOffer);
router.get('/offers', getOffers);
router.get('/offers/:id', getOfferById);
router.put('/offers/:id', updateOffer);
router.delete('/offers/:id', deleteOffer);

// Routes pour Training
router.post('/trainings', createTraining);
router.get('/trainings', getTraining);
router.get('/trainings/:id', getTrainingById);
router.put('/trainings/:id', updateTraining);
router.delete('/trainings/:id', deleteTraining);

// Routes pour Training
router.post('/trainings', createTraining);
router.get('/trainings', getTrainings);
router.get('/trainings/:id', getTrainingById);
router.put('/trainings/:id', updateTraining);
router.delete('/trainings/:id', deleteTraining);

// Routes pour TrainingApplication
router.post('/training-applications', createTrainingApplication);
router.get('/training-applications', getTrainingApplications);
router.get('/training-applications/:id', getTrainingApplicationById);
router.put('/training-applications/:id', updateTrainingApplication);
router.delete('/training-applications/:id', deleteTrainingApplication);

export default router;
