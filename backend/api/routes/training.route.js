import { get } from 'mongoose';
import {
    getTrainings,
    getWebinars,
    getInPersonTrainings,
    getTrainingById,
    updateTraining,
    deleteTraining,
    getTrainingModules,
    getTrainingModuleById,
    createTrainingModule,
    updateTrainingModule,
    deleteTrainingModule,
    getTrainingSessions,
    getTrainingSessionById,
    createTrainingSession,
    updateTrainingSession,
    deleteTrainingSession,
    getTrainingApplications,
    createTrainingApplication,
    getWebinarApplications,
    getInPersonApplications,
    getTrainingApplicationById,
    updateTrainingApplication,
    deleteTrainingApplication
} from '../controllers/training.controller.js';

import express from 'express';

const trainingRoutes = express.Router();


// Define routes for trainings
trainingRoutes.get('/trainings', getTrainings);
trainingRoutes.get('/webinars', getWebinars);
trainingRoutes.get('/in-person-trainings', getInPersonTrainings);
trainingRoutes.get('/trainings/:id', getTrainingById);
trainingRoutes.put('/trainings/:id', updateTraining);
trainingRoutes.delete('/trainings/:id', deleteTraining);
trainingRoutes.get('/training-modules', getTrainingModules);
trainingRoutes.get('/training-modules/:id', getTrainingModuleById);
trainingRoutes.post('/training-modules', createTrainingModule);
trainingRoutes.put('/training-modules/:id', updateTrainingModule);
trainingRoutes.delete('/training-modules/:id', deleteTrainingModule);
trainingRoutes.get('/training-sessions', getTrainingSessions);
trainingRoutes.get('/training-sessions/:id', getTrainingSessionById);
trainingRoutes.post('/training-sessions', createTrainingSession);
trainingRoutes.put('/training-sessions/:id', updateTrainingSession);
trainingRoutes.delete('/training-sessions/:id', deleteTrainingSession);
trainingRoutes.get('/training-applications', getTrainingApplications);
trainingRoutes.post('/training-applications', createTrainingApplication);
trainingRoutes.get('/webinar-applications', getWebinarApplications);
trainingRoutes.get('/in-person-applications', getInPersonApplications);
trainingRoutes.get('/training-applications/:id', getTrainingApplicationById);
trainingRoutes.put('/training-applications/:id', updateTrainingApplication);
trainingRoutes.delete('/training-applications/:id', deleteTrainingApplication);


export default trainingRoutes;
