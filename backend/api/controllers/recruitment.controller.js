import {Offer, OfferApplication, OfferStats} from '../models/recruitment.model.js';


//----------------------------------- MODEL OFFER CONTROLLERS -----------------------------------//
const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find().populate('enterpriseId'); // Remplir le champ enterpriseId avec les données correspondantes
        res.status(200).json(offers);
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


const getJobs = async (req, res) => {
    try {
        const jobs = await Offer.find({ type: 'Job' });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getInternships = async (req, res) => {
    try {
        const internships = await Offer.find({ type: 'Internship' });
        res.status(200).json(internships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOfferById = async (req, res) => {
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


const updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.status(200).json(offer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//----------------------------------- MODEL OFFER APPLICATION CONTROLLERS -----------------------------------//

const submiteOfferApplication = async (req, res) => {
  try {
    const uploadedFiles = await uploadFiles(req, res);
    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
    }
    const { offerId, candidatId, message } = req.body;
    const uploadedFilesIds = uploadedFiles.map(file => file._id);
    const newOfferApplication = new OfferApplication({
      offerId,
      candidatId,
      message,
      submittedDocumentsIds: uploadedFilesIds, 
    });
    const savedOfferApplication = await newOfferApplication.save();
    console.log('Candidature créée avec succès:', savedOfferApplication);
    return res.status(201).json(savedOfferApplication);

  } catch (error) {
    console.error('Erreur lors de la création de la candidature :', error.message);
    return res.status(500).json({ message: 'Erreur lors de la création de la candidature : ' + error.message });
  }
};



const getOfferApplications = async (req, res) => {
    try {
        const applications = await OfferApplication.find()
        .populate('offerId candidatId');
        res.status(200).json(applications);
    } catch (error) {
        console.error('Erreur lors de la récupération des candidatures :', error.message);
        res.status(500).json({ message: error.message });
    }
};


const getJobApplications = async (req, res) => {
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

const getInternshipApplications = async (req, res) => {
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


const getOfferApplicationById = async (req, res) => {
    try {
        const application = await OfferApplication.findById(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(application);
    } catch (error) {
        console.error('Error fetching offer application by ID:', error);
        res.status(500).json({ message: error.message });
    }
};


const updateOfferApplication = async (req, res) => {
    try {
        const application = await OfferApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(application);
    } catch (error) {
        console.error('Error updating offer application:', error);
        res.status(400).json({ message: error.message });
    }
};


const deleteOfferApplication = async (req, res) => {
    try {
        const application = await OfferApplication.findByIdAndDelete(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting offer application:', error);
        res.status(500).json({ message: error.message });
    }
};

//----------------------------------- MODEL OFFER STATS CONTROLLERS -----------------------------------//

const getOfferStats = async (req, res) => {
    try {
      const offerStats = await OfferStats.find();
      res.status(200).json(offerStats);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques des offres:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };
  

const createOfferStat = async (req, res) => {
    try {
        const { name, stat } = req.body;

        if (!name || !stat) {
        return res.status(400).json({ message: 'Le nom et la statistique sont requis.' });
        }

        const newOfferStat = new OfferStats({ name, stat });

        const savedOfferStat = await newOfferStat.save();

        res.status(201).json({
        message: 'Statistique de l\'offre créée avec succès',
        offerStat: savedOfferStat
        });
    } catch (error) {
        console.error('Erreur lors de la création de la statistique de l\'offre:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

const getOfferStatById = async (req, res) => {
    try {
      const offerStat = await OfferStats.findById(req.params.id);
  
      if (!offerStat) {
        return res.status(404).json({ message: 'Statistique de l\'offre non trouvée' });
      }
  
      res.status(200).json(offerStat);
    } catch (error) {
      console.error('Erreur lors de la récupération de la statistique de l\'offre:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };

const updateOfferStat = async (req, res) => {
    try {
        const { name, stat } = req.body;

        if (!name || !stat) {
        return res.status(400).json({ message: 'Le nom et la statistique sont requis.' });
        }

        const updatedOfferStat = await OfferStats.findByIdAndUpdate(
        req.params.id,
        { name, stat, updatedAt: Date.now() },
        { new: true }
        );

        if (!updatedOfferStat) {
        return res.status(404).json({ message: 'Statistique de l\'offre non trouvée' });
        }

        res.status(200).json(updatedOfferStat);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la statistique de l\'offre:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
  

const deleteOfferStat = async (req, res) => {
    try {
      const deletedOfferStat = await OfferStats.findByIdAndDelete(req.params.id);
  
      if (!deletedOfferStat) {
        return res.status(404).json({ message: 'Statistique de l\'offre non trouvée' });
      }
  
      res.status(200).json({ message: 'Statistique de l\'offre supprimée avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la statistique de l\'offre:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
  
  
// all controllers
export {
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
    updateOfferApplication,
    deleteOfferApplication,
    getOfferStats,
    createOfferStat,
    getOfferStatById,
    updateOfferStat,
    deleteOfferStat
};