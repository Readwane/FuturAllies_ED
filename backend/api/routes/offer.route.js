import express from 'express';
import {
    getOffers,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer,
    submitApplication,
    getOfferApplications,
    getOfferApplicationsByOfferId,
    updateOfferApplicationStatus,
    filterOffers,
    updateOfferStatus,
    checkExpiredOffers,
    sendOfferNotification,
    getOffersByUser,
    exportOffersToCSV,
    importOffersFromCSV
} from '../controllers/offer.controller.js';

const offerRoutes = express.Router();

// Routes pour la gestion des offres
offerRoutes.get('/offers', getOffers); // Récupérer toutes les offres
offerRoutes.get('/offers/:offerId', getOfferById); // Récupérer une offre par son ID
offerRoutes.post('/offers', createOffer); // Créer une nouvelle offre
offerRoutes.put('/offers/:offerId', updateOffer); // Mettre à jour une offre
offerRoutes.delete('/offers/:offerId', deleteOffer); // Supprimer une offre

// Routes pour les candidatures
offerRoutes.get('/offers-applications', getOfferApplications); // Récupérer toutes les candidatures
offerRoutes.post('/offers/:offerId/applications', submitApplication); // Soumettre une candidature pour une offre
offerRoutes.get('/offers/:offerId/applications', getOfferApplicationsByOfferId); // Récupérer les candidatures pour une offre spécifique
offerRoutes.put('/offers/applications/:applicationId', updateOfferApplicationStatus); // Mettre à jour le statut d'une candidature

// Routes pour les filtres
offerRoutes.get('/offers/filter', filterOffers); // Filtrer les offres

// Routes pour la gestion des statuts
offerRoutes.put('/offers/:offerId/status', updateOfferStatus); // Mettre à jour le statut d'une offre

// Routes pour les offres expirées
offerRoutes.get('/offers/expired', checkExpiredOffers); // Récupérer les offres expirées

// Routes pour les notifications
offerRoutes.post('/offers/notifications', sendOfferNotification); // Envoyer une notification

// Routes pour les utilisateurs
offerRoutes.get('/offers/creator/:creatorId', getOffersByUser); // Récupérer les offres créées par un utilisateur

// Routes pour l'exportation et l'importation
offerRoutes.get('/offers/export/csv', exportOffersToCSV); // Exporter les offres en CSV
offerRoutes.post('/offers/import/csv', importOffersFromCSV); // Importer des offres à partir d'un CSV

export default offerRoutes;