import OfferApplication from '../../models/recruitment/Offer-application.js';
import { uploadFile } from './file.controller.js';  // Controller uploadFile pour gérer le téléchargement

// Créer une candidature avec plusieurs fichiers soumis
// Créer une candidature avec plusieurs fichiers soumis
export const createOfferApplication = async (req, res) => {
    const { user_id, offerId, message } = req.body;
    const { files } = req;  // Le tableau de fichiers à télécharger

    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
    }
    try {
        // Tableau pour stocker les ID des fichiers téléchargés
        const uploadedFiles = [];
        // Traiter chaque fichier et appeler le controller pour le télécharger
        for (const file of files) {
            try {
                // Appel direct à uploadFile pour gérer chaque fichier
                const uploadedFile = await uploadFile(req, res);
                uploadedFiles.push(uploadedFile._id);  // Ajouter l'ID du fichier à la liste des fichiers téléchargés
            } catch (fileError) {
                // Si une erreur survient lors du téléchargement d'un fichier, arrêter le processus
                console.error(`Erreur lors du téléchargement du fichier ${file.originalname}: ${fileError.message}`);
                return res.status(400).json({ message: `Erreur lors du téléchargement du fichier: ${file.originalname}.` });
            }
        }
        // Créer la nouvelle candidature avec la liste des fichiers soumis
        const newOfferApplication = new OfferApplication({
            offerId,
            candidatId: user_id,
            message,
            submittedDocuments: uploadedFiles, // Associer tous les fichiers téléchargés à la candidature
        });
        // Sauvegarder la candidature
        const savedOfferApplication = await newOfferApplication.save();
        console.log('Candidature créée avec succès:', savedOfferApplication);
        res.status(201).json(savedOfferApplication);  // Répondre avec la candidature créée
    } catch (error) {
        // Gestion des erreurs générales
        console.error('Erreur lors de la création de la candidature :', error.message);
        res.status(400).json({ message: error.message });
    }
};



// Récupérer toutes les candidatures pour une offre donnée
export const getOfferApplications = async (req, res) => {
    try {
        const applications = await OfferApplication.find().populate('offerId userId');
        res.status(200).json(applications);
    } catch (error) {
        console.error('Erreur lors de la récupération des candidatures :', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Récupérer toutes les candidatures pour les offres de type "Job"
export const getJobApplications = async (req, res) => {
    try {
        console.log('Fetching job offers...');
        const jobOffers = await Offer.find({ type: 'Job' });
        const jobOfferIds = jobOffers.map(offer => offer._id);
        console.log('Job offer IDs found:', jobOfferIds);

        console.log('Fetching applications for job offers...');
        const jobApplications = await OfferApplication.find({ offerId: { $in: jobOfferIds } })
            .populate('userId', 'name email');
        console.log('Job applications found:', jobApplications);

        res.status(200).json(jobApplications);
    } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).json({ message: error.message });
    }
};

// Récupérer toutes les candidatures pour les offres de type "Internship"
export const getInternshipApplications = async (req, res) => {
    try {
        const internshipOffers = await Offer.find({ type: 'Internship' });
        const internshipOfferIds = internshipOffers.map(offer => offer._id);

        const internshipApplications = await OfferApplication.find({ offerId: { $in: internshipOfferIds } })
            .populate('userId', 'name email');
        
        res.status(200).json(internshipApplications);
    } catch (error) {
        console.error('Error fetching internship applications:', error);
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une candidature par ID
export const getOfferApplicationById = async (req, res) => {
    try {
        const application = await OfferApplication.findById(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(application);
    } catch (error) {
        console.error('Error fetching offer application by ID:', error);
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une candidature
export const updateOfferApplication = async (req, res) => {
    try {
        const application = await OfferApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(application);
    } catch (error) {
        console.error('Error updating offer application:', error);
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une candidature
export const deleteOfferApplication = async (req, res) => {
    try {
        const application = await OfferApplication.findByIdAndDelete(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting offer application:', error);
        res.status(500).json({ message: error.message });
    }
};
