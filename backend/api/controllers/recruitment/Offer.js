import Offer from '../../models/recruitment/offer.js'

export const createOffer = async (req, res) => {
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


export const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find();
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer toutes les offres d'emploi
export const getJobs = async (req, res) => {
    try {
        const jobs = await Offer.find({ type: 'Job' });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer toutes les offres de stage
export const getInternships = async (req, res) => {
    try {
        const internships = await Offer.find({ type: 'Internship' });
        res.status(200).json(internships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOfferById = async (req, res) => {
    try {
        console.log('Looking for offer with ID:', req.params.id); // Debug: ID recherché
        const offer = await Offer.findById(req.params.id);
        if (!offer) {
            console.warn('Offer not found for ID:', req.params.id); // Debug: offre non trouvée
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(offer);
    } catch (error) {
        console.error('Error fetching offer by ID:', error); // Debug: erreur de recherche
        res.status(500).json({ message: error.message });
    }
};


export const updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.status(200).json(offer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
