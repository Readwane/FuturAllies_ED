import mongoose from 'mongoose';  

import {
    Offer, 
    OfferApplication, 
} from '../models/offer.model.js';

const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find().populate('enterprise'); // Remplir le champ enterpriseId avec les données correspondantes
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOfferById = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id).populate('enterprise');
        if (!offer) {
            return res.status(404).json({ message: 'Offre non trouvée' });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOffer = async (req, res) => {
    try {
        console.log('Received data for creating offer:', req.body); // Debug: données reçues
        const offer = new Offer(req.body);
        await offer.save();
        console.log('Offer created successfully:', offer); // Debug: offre créée
        res.status(201).json(offer);
    } catch (error) {
        console.error('Error creating offer:', error); // Debug: erreur de création
        res.status(400).json({ message: error.message });
    }
};

const updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!offer) {
            return res.status(404).json({ message: 'Offre non trouvée' });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offre non trouvée' });
        }
        res.status(200).json({ message: 'Offre supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const submitApplication = async (req, res) => {
    try {
        const application = new OfferApplication(req.body);
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateOfferStatus = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!offer) {
            return res.status(404).json({ message: 'Offre non trouvée' });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOfferApplications = async (req, res) => {
    try {
        // Récupérer toutes les candidatures et peupler les champs référencés
        const applications = await OfferApplication.find()
            .populate('offerId') // Peupler le champ offerId avec les données de l'offre
            .populate('candidatId') // Peupler le champ candidatId avec les données du candidat
            .populate('submittedDocumentsIds'); // Peupler le champ submittedDocumentsIds avec les documents

        // Renvoyer les candidatures peuplées
        res.status(200).json(applications);
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ message: error.message });
    }
};


const getOfferApplicationsByOfferId = async (req, res) => {
    try {
        const offerId = req.params.offerId;

        // Vérifier si l'ID de l'offre est valide
        if (!mongoose.Types.ObjectId.isValid(offerId)) {
            return res.status(400).json({ message: 'ID d\'offre invalide' });
        }

        // Récupérer les candidatures pour cette offre
        const applications = await OfferApplication.find({ offerId: offerId })
            .populate('candidatId') // Peupler les informations du candidat
            .populate('submittedDocumentsIds'); // Peupler les documents soumis

        // Vérifier si des candidatures ont été trouvées
        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'Aucune candidature trouvée pour cette offre' });
        }

        // Retourner les candidatures
        res.status(200).json(applications);
    } catch (error) {
        console.error('Erreur lors de la récupération des candidatures :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


const updateOfferApplicationStatus = async (req, res) => {
    try {
        const application = await OfferApplication.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!application) {
            return res.status(404).json({ message: 'Candidature non trouvée' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const filterOffers = async (req, res) => {
    try {
        const filters = req.query;
        const offers = await Offer.find(filters).populate('enterprise');
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const checkExpiredOffers = async (req, res) => {
    try {
        const expiredOffers = await Offer.find({ expirationDate: { $lt: new Date() } });
        res.status(200).json(expiredOffers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const sendOfferNotification = async (req, res) => {
    try {
        const { userId, message } = req.body;
        const notification = new Notification({ userId, message });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOffersByUser = async (req, res) => {
    try {
        const offers = await Offer.find({ createdBy: req.params.userId });
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const exportOffersToCSV = async (req, res) => {
    try {
        const offers = await Offer.find();
        const csv = offers.map(offer => `${offer.title},${offer.enterprise},${offer.location}`).join('\n');
        res.setHeader('Content-Type', 'text/csv');
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const importOffersFromCSV = async (req, res) => {
    try {
        const offers = req.body; // Supposons que les données CSV sont déjà parsées
        await Offer.insertMany(offers);
        res.status(201).json({ message: 'Offres importées avec succès' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export {
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
};