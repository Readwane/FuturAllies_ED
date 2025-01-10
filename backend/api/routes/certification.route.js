import {
    getCertifications,
    getCertificationById,
    createCertification,
    updateCertification,
    deleteCertification,
    getCertificationsEvaluations,
    getCertificationEvaluationById,
    createCertificationEvaluation,
    updateCertificationEvaluation,
    deleteCertificationEvaluation,
    getCertificationsGiven,
    getCertificationGivenById,
    createCertificationGiven,
    updateCertificationGiven,
    deleteCertificationGiven
  } from '../controllers/certification.controller.js';

import express from 'express';

const certificationRoutes = express.Router();

// Define routes for certifications

certificationRoutes.get('/certifications', getCertifications);
certificationRoutes.get('/certifications/:id', getCertificationById);
certificationRoutes.post('/certifications', createCertification);
certificationRoutes.put('/certifications/:id', updateCertification);
certificationRoutes.delete('/certifications/:id', deleteCertification);
certificationRoutes.get('/certifications-evaluations', getCertificationsEvaluations);
certificationRoutes.get('/certifications-evaluations/:id', getCertificationEvaluationById);
certificationRoutes.post('/certifications-evaluations', createCertificationEvaluation);
certificationRoutes.put('/certifications-evaluations/:id', updateCertificationEvaluation);
certificationRoutes.delete('/certifications-evaluations/:id', deleteCertificationEvaluation);
certificationRoutes.get('/certifications-given', getCertificationsGiven);
certificationRoutes.get('/certifications-given/:id', getCertificationGivenById);
certificationRoutes.post('/certifications-given', createCertificationGiven);
certificationRoutes.put('/certifications-given/:id', updateCertificationGiven);
certificationRoutes.delete('/certifications-given/:id', deleteCertificationGiven);


export default certificationRoutes;