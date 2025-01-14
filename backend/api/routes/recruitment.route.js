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
// Routes pour les offres
recruitmentRoutes.get('/offers', getOffers); // Récupérer toutes les offres
recruitmentRoutes.get('/offers/:id', getOfferById); // Récupérer une offre par ID
recruitmentRoutes.post('/offers', createOffer); // Créer une nouvelle offre
recruitmentRoutes.put('/offers/:id', updateOffer); // Mettre à jour une offre par ID
recruitmentRoutes.delete('/offers/:id', deleteOffer); // Supprimer une offre par ID

// Routes pour les candidatures
recruitmentRoutes.get('/offer-applications', getOfferApplications); // Récupérer toutes les candidatures
recruitmentRoutes.get('/offer-applications/:id', getOfferApplicationById); // Récupérer une candidature par ID
recruitmentRoutes.get('/offer-applications/offer/:offerId', getOfferApplicationByOfferId); // Récupérer les candidatures pour une offre spécifique
recruitmentRoutes.post('/offer-applications', submiteOfferApplication); // Soumettre une candidature
recruitmentRoutes.put('/offer-applications/:id', updateOfferApplication); // Mettre à jour une candidature par ID
recruitmentRoutes.delete('/offer-applications/:id', deleteOfferApplication); // Supprimer une candidature par ID

// Routes pour les statistiques
recruitmentRoutes.get('/offer-stats', getOfferStats); // Récupérer toutes les statistiques
recruitmentRoutes.get('/offer-stats/:id', getOfferStatById); // Récupérer une statistique par ID
recruitmentRoutes.post('/offer-stats', createOfferStat); // Créer une nouvelle statistique
recruitmentRoutes.put('/offer-stats/:id', updateOfferStat); // Mettre à jour une statistique par ID
recruitmentRoutes.delete('/offer-stats/:id', deleteOfferStat); // Supprimer une statistique par ID


export default recruitmentRoutes;