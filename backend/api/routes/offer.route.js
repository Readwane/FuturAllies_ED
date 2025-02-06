import express from 'express';

import {
    getOffers,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer,
    submitOfferApplication,
    getOfferApplications,
    getCandidatsByOfferId,
    getOfferApplicationsByCandidatId,
    getOfferApplicationsByOfferId,
    updateOfferApplicationStatus,
    filterOffers,
    updateOfferStatus,
    checkExpiredOffers,
    sendOfferNotification,
    getOffersByUser,
    exportOffersToCSV,
    importOffersFromCSV,
} from '../controllers/offer.controller.js';

const offerRoutes = express.Router();
const quizzRouter = express.Router();

offerRoutes.get('/offers', getOffers); // Récupérer toutes les offres
offerRoutes.get('/offers/:id', getOfferById); // Récupérer une offre par son ID
offerRoutes.post('/offers', createOffer); // Créer une nouvelle offre
offerRoutes.put('/offers/:id', updateOffer); // Mettre à jour une offre
offerRoutes.delete('/offers/:id', deleteOffer); // Supprimer une offre
offerRoutes.get('/offers/creator/:creatorId', getOffersByUser); // Récupérer les offres créées par un utilisateur

// Routes pour les candidatures
offerRoutes.get('/candidats/:candidatId/oapplications', getOfferApplicationsByCandidatId); // Récupérer toutes les candidatures
offerRoutes.get('/oapplications', getOfferApplications); // Récupérer toutes les candidatures
offerRoutes.get('/oapplications/:offerId', getOfferApplicationsByOfferId);
offerRoutes.post('/oapplications', submitOfferApplication); // Soumettre une candidature pour une offre
offerRoutes.put('/oapplications/:applicationId', updateOfferApplicationStatus); // Mettre à jour le statut d'une candidature
offerRoutes.get('/oapplications/:offerId/candidats', getCandidatsByOfferId);

// Routes pour les filtres
offerRoutes.get('/offers/filter', filterOffers); // Filtrer les offres

// Routes pour la gestion des statuts
offerRoutes.put('/offers/:offerId/status', updateOfferStatus); // Mettre à jour le statut d'une offre

// Routes pour les offres expirées
offerRoutes.get('/offers/expired', checkExpiredOffers); // Récupérer les offres expirées

// Routes pour les notifications
offerRoutes.post('/offers/notifications', sendOfferNotification); // Envoyer une notification

// Routes pour l'exportation et l'importation
offerRoutes.get('/offers/export/csv', exportOffersToCSV); // Exporter les offres en CSV
offerRoutes.post('/offers/import/csv', importOffersFromCSV); // Importer des offres à partir d'un CSV


export default offerRoutes;