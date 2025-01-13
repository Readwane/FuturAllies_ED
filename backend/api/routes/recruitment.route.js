import {
    getOffers,
    createOffer,
    getJobs,
    getInternships,
    getOfferById,
    updateOffer,
    deleteOffer,
    submiteOfferApplication,
    getOfferApplications,
    getJobApplications,
    getInternshipApplications,
    getOfferApplicationById,
    getOfferApplicationByOfferId,
    updateOfferApplication,
    deleteOfferApplication,
    getOfferStats,
    createOfferStat,
    getOfferStatById,
    updateOfferStat,
    deleteOfferStat
} from '../controllers/recruitment.controller.js';

import express from 'express';

const recruitmentRoutes = express.Router();

// Define routes for recruitment
recruitmentRoutes.get('/offers', getOffers);
recruitmentRoutes.get('/jobs', getJobs);
recruitmentRoutes.get('/internships', getInternships);
recruitmentRoutes.get('/offers/:id', getOfferById);
recruitmentRoutes.post('/offers', createOffer);
recruitmentRoutes.put('/offers/:id', updateOffer);
recruitmentRoutes.delete('/offers/:id', deleteOffer);
recruitmentRoutes.post('/offer-applications', submiteOfferApplication);
recruitmentRoutes.get('/offer-applications', getOfferApplications);
recruitmentRoutes.get('/jobs-applications', getJobApplications);
recruitmentRoutes.get('/internships-applications', getInternshipApplications);
recruitmentRoutes.get('/offer-applications/:id', getOfferApplicationById);
recruitmentRoutes.get('/offer-applications/offer/:id', getOfferApplicationByOfferId);
recruitmentRoutes.put('/offer-applications/:id', updateOfferApplication);
recruitmentRoutes.delete('/offer-applications/:id', deleteOfferApplication);
recruitmentRoutes.get('/offer-stats', getOfferStats);
recruitmentRoutes.post('/offer-stats', createOfferStat);
recruitmentRoutes.get('/offer-stats/:id', getOfferStatById);
recruitmentRoutes.put('/offer-stats/:id', updateOfferStat);
recruitmentRoutes.delete('/offer-stats/:id', deleteOfferStat);


export default recruitmentRoutes;