import OfferApplication from '../../models/recruitment/offer-application.js'
import Offer from '../../models/recruitment/offer.js'

export const createOfferApplication = async (req, res) => {
    try {
        const application = new OfferApplication(req.body);
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getOfferApplications = async (req, res) => {
    try {
        const applications = await OfferApplication.find().populate('offer_id user_id');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer toutes les candidatures pour les offres de type "Job"
export const getJobApplications = async (req, res) => {
    try {
        // Trouver les offres de type "Job"
        const jobOffers = await Offer.find({ type: 'Job' });
        const jobOfferIds = jobOffers.map(offer => offer._id);

        // Trouver les candidatures associées à ces offres
        const jobApplications = await OfferApplication.find({ offer_id: { $in: jobOfferIds } })
            .populate('user_id', 'name email') // Peupler les informations de l'utilisateur

        res.status(200).json(jobApplications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer toutes les candidatures pour les offres de type "Internship"
export const getInternshipApplications = async (req, res) => {
    try {
        // Trouver les offres de type "Internship"
        const internshipOffers = await Offer.find({ type: 'Internship' });
        const internshipOfferIds = internshipOffers.map(offer => offer._id);

        // Trouver les candidatures associées à ces offres
        const internshipApplications = await OfferApplication.find({ offer_id: { $in: internshipOfferIds } })
            .populate('user_id', 'name email') // Peupler les informations de l'utilisateur

        res.status(200).json(internshipApplications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  

export const getOfferApplicationById = async (req, res) => {
    try {
        const application = await OfferApplication.findById(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOfferApplication = async (req, res) => {
    try {
        const application = await OfferApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteOfferApplication = async (req, res) => {
    try {
        const application = await OfferApplication.findByIdAndDelete(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
