import mongoose from 'mongoose';  
import { File } from '../models/file.model.js';
import {handleFileUpload} from '../middlewares/file.middleware.js'
import {uploadToGridFS} from '../services/file.service.js'
import {User} from '../models/user.model.js'; // Importer le modèle User
import {Mail} from '../models/interaction.model.js'; // Importer le modèle Mail
import { sendEmail } from '../services/mail.service.js'; // Importer le service d'envoi d'e-mails

import {
    Offer, 
    OfferApplication, 
} from '../models/offer.model.js';


const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find(); // Remplir le champ enterpriseId avec les données correspondantes
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getOfferById = async (req, res) => {
    try {
      // Vérifier que l'ID est un ObjectId valide
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        console.log('ID de l\'offre invalide');
        return res.status(400).json({ message: 'Offre non trouvé par id invalide, dans getOfferById' });
      }
  
      // Récupérer l'offre par son ID
      const offer = await Offer.findById(req.params.id);
      if (!offer) {
        return res.status(404).json({ message: 'Offre non trouvée dans getOfferById' });
      }
  
      // Retourner l'offre
      res.status(200).json(offer);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'offre :', error);
      res.status(500).json({ message: error.message });
    }
};

const createOffer = async (req, res) => {
  try {
      console.log('Received data for creating offer:', req.body); // Debug: données reçues

      // Validation des champs obligatoires
      const requiredFields = [
          'profil', 'topic', 'company', 'companyLocation', 'description', 'domain', 
          'location', 'type', 'contractType', 'contactEmail', 'createdBy'
      ];
      for (const field of requiredFields) {
          if (!req.body[field]) {
              return res.status(400).json({ message: `Le champ ${field} est requis.` });
          }
      }

      // Validation des enums
      const validTypes = ['Job', 'Internship', 'Other'];
      if (!validTypes.includes(req.body.type)) {
          return res.status(400).json({ message: `Le champ type doit être l'une des valeurs suivantes : ${validTypes.join(', ')}.` });
      }

      const validContractTypes = ['CDI', 'CDD'];
      if (!validContractTypes.includes(req.body.contractType)) {
          return res.status(400).json({ message: `Le champ contractType doit être l'une des valeurs suivantes : ${validContractTypes.join(', ')}.` });
      }

      // Validation de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.body.contactEmail)) {
          return res.status(400).json({ message: 'Le champ contactEmail doit être une adresse email valide.' });
      }

      // Validation de l'ID de l'utilisateur (createdBy)
      if (!mongoose.Types.ObjectId.isValid(req.body.createdBy)) {
          return res.status(400).json({ message: 'Le champ createdBy doit être un ObjectId valide.' });
      }

      // Création de l'offre
      const offerData = {
          ...req.body,
          isRemoteWorking: req.body.isRemoteWorking || false, // Valeur par défaut si non spécifié
          applicationMode: req.body.applicationMode || 'Online', // Valeur par défaut si non spécifié
          requiresCvDocument: req.body.requiresCvDocument || false, // Valeur par défaut si non spécifié
          requiresMotivationLetter: req.body.requiresMotivationLetter || false, // Valeur par défaut si non spécifié
          canAddAdditionalDocuments: req.body.canAddAdditionalDocuments || false, // Valeur par défaut si non spécifié
          postedDate: req.body.postedDate || Date.now(), // Valeur par défaut si non spécifié
          updatedDate: req.body.updatedDate || Date.now(), // Valeur par défaut si non spécifié
          expirationDate: req.body.expirationDate || null // Si expirationDate n'est pas fourni, il est mis à null
      };

      // Inclure les nouveaux champs ajoutés
      if (req.body.isPreselectionEnabled !== undefined) offerData.isPreselectionEnabled = req.body.isPreselectionEnabled;
      if (req.body.preselectionType) offerData.preselectionType = req.body.preselectionType;
      if (req.body.preselectionMode) offerData.preselectionMode = req.body.preselectionMode;
      if (req.body.isOnlineEvaluation !== undefined) offerData.isOnlineEvaluation = req.body.isOnlineEvaluation;
      if (req.body.evaluationMode) offerData.evaluationMode = req.body.evaluationMode;
      if (req.body.isPhysicalMeetingRequired !== undefined) offerData.isPhysicalMeetingRequired = req.body.isPhysicalMeetingRequired;
      if (req.body.meetingMode) offerData.meetingMode = req.body.meetingMode;
      if (req.body.meetingOnlineMode) offerData.meetingOnlineMode = req.body.meetingOnlineMode;

      const offer = new Offer(offerData);
      await offer.save();

      console.log('Offer created successfully:', offer); // Debug: offre créée
      res.status(201).json(offer);
  } catch (error) {
      console.error('Error creating offer:', error); // Debug: erreur de création

      // Gestion des erreurs de validation Mongoose
      if (error.name === 'ValidationError') {
          const errors = Object.values(error.errors).map(err => err.message);
          return res.status(400).json({ message: 'Erreur de validation', errors });
      }

      // Gestion des autres erreurs
      res.status(500).json({ message: 'Erreur interne du serveur' });
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


const submitOfferApplicationWithdSendMail = async (req, res) => {
  try {
    // Appeler le middleware pour gérer l'upload des fichiers
    handleFileUpload(req, res, async () => {
      console.log('Début de submitOfferApplication...');

      // 1. Vérification des fichiers joints
      console.log('Vérification des fichiers joints...');
      const files = req.files; // Les fichiers joints sont dans req.files (grâce à multer)
      console.log('Fichiers reçus :', files);

      if (!files || files.length === 0) {
        console.error('Aucun fichier joint.');
        return res.status(400).json({ message: 'Aucun fichier joint.' });
      }

      // 2. Upload des fichiers joints
      console.log('Début de l\'upload des fichiers...');
      const uploadedFiles = [];
      for (const file of files) {
        console.log('Traitement du fichier :', file.originalname);

        // Upload du fichier dans GridFS
        const gridFSId = await uploadToGridFS(file);
        console.log('Fichier uploadé dans GridFS avec ID :', gridFSId);

        // Sauvegarde des métadonnées du fichier dans la base de données
        const newFile = new File({
          title: file.originalname,
          type: file.mimetype,
          fileSize: file.size,
          gridFSId,
        });

        const savedFile = await newFile.save();
        console.log('Fichier enregistré dans la base de données :', savedFile);

        uploadedFiles.push(savedFile);
      }

      console.log('Tous les fichiers ont été uploadés avec succès.');

      // 3. Récupérer les IDs des fichiers uploadés
      console.log('Récupération des IDs des fichiers uploadés...');
      const submittedDocumentsIds = uploadedFiles.map((file) => file._id.toString());
      console.log('IDs des fichiers :', submittedDocumentsIds);

      // 4. Créer la candidature avec les IDs des fichiers
      console.log('Création de la candidature...');
      const applicationData = {
        ...req.body, // Les autres champs de la candidature (offerId, candidatId, message, etc.)
        submittedDocumentsIds, // Ajouter les IDs des fichiers joints
      };

      console.log('Données de la candidature :', applicationData);

      const application = new OfferApplication(applicationData);
      await application.save();
      console.log('Candidature enregistrée avec succès :', application);

      // 5. Récupérer le candidat via son ID
      console.log('Récupération du candidat...');
      const candidatId = req.body.candidatId; // ID du candidat
      const candidat = await User.findById(candidatId);
      if (!candidat) {
        console.error('Candidat non trouvé.');
        return res.status(404).json({ message: 'Candidat non trouvé.' });
      }
      console.log('Candidat trouvé :', candidat.email);

      // 6. Envoyer un e-mail de confirmation au candidat
      console.log('Envoi de l\'e-mail de confirmation...');
      const emailSubject = 'Confirmation de réception de votre candidature';
      const emailContent = `
        Bonjour ${candidat.firstName} ${candidat.lastName},
        
        Nous avons bien reçu votre candidature. Nous vous remercions pour l'intérêt que vous portez à notre entreprise.
        
        Cordialement,
        L'équipe de recrutement de Fidalli CBS Burkina
      `;

      const senderEmail = process.env.SERVICE_EMAIL;
      // Envoyer l'e-mail
      const emailSent = await sendEmail(senderEmail, candidat.email, emailSubject, emailContent);
      if (!emailSent) {
        // console.error('Erreur lors de l\'envoi de l\'e-mail.');
        return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
      }
      console.log('E-mail envoyé avec succès.');

      // 7. Sauvegarder l'e-mail dans la base de données
      console.log('Sauvegarde de l\'e-mail...');
      const newMail = new Mail({
        senderId: senderEmail, // ID de l'expéditeur (par exemple, un ID système)
        receiverId: candidatId, // ID du candidat
        content: emailContent,
        subject: emailSubject,
      });

      await newMail.save();
      console.log('E-mail sauvegardé avec succès.');

      // 8. Répondre avec la candidature créée
      res.status(201).json(application);
    });
  } catch (error) {
    console.error('Erreur dans submitOfferApplication :', error.message);
    res.status(500).json({ message: error.message });
  }
};

const submitOfferApplication = async (req, res) => {
    try {
      // Appeler le middleware pour gérer l'upload des fichiers
      handleFileUpload(req, res, async () => {
        console.log('Début de submitOfferApplication...');
  
        // 1. Vérifier si l'utilisateur a déjà postulé à cette offre
        const { offerId, candidatId } = req.body;
  
        const existingApplication = await OfferApplication.findOne({
          offerId: offerId,
          candidatId: candidatId,
        });
  
        if (existingApplication) {
          console.log('L\'utilisateur a déjà postulé à cette offre.');
          return res.status(400).json({ message: 'Vous avez déjà postulé à cette offre.' });
        }
  
        // 2. Vérification des fichiers joints
        console.log('Vérification des fichiers joints...');
        const files = req.files; // Les fichiers joints sont dans req.files (grâce à multer)
        console.log('Fichiers reçus :', files);
  
        if (!files || files.length === 0) {
          console.error('Aucun fichier joint.');
          return res.status(400).json({ message: 'Aucun fichier joint.' });
        }
  
        // 3. Upload des fichiers joints
        console.log('Début de l\'upload des fichiers...');
        const uploadedFiles = [];
        for (const file of files) {
          console.log('Traitement du fichier :', file.originalname);
  
          // Upload du fichier dans GridFS
          const gridFSId = await uploadToGridFS(file);
          console.log('Fichier uploadé dans GridFS avec ID :', gridFSId);
  
          // Sauvegarde des métadonnées du fichier dans la base de données
          const newFile = new File({
            title: file.originalname,
            type: file.mimetype,
            fileSize: file.size,
            gridFSId,
          });
  
          const savedFile = await newFile.save();
          console.log('Fichier enregistré dans la base de données :', savedFile);
  
          uploadedFiles.push(savedFile);
        }
  
        console.log('Tous les fichiers ont été uploadés avec succès.');
  
        // 4. Récupérer les IDs des fichiers uploadés
        console.log('Récupération des IDs des fichiers uploadés...');
        const submittedDocumentsIds = uploadedFiles.map((file) => file._id.toString());
        console.log('IDs des fichiers :', submittedDocumentsIds);
  
        // 5. Créer la candidature avec les IDs des fichiers
        console.log('Création de la candidature...');
        const applicationData = {
          ...req.body, // Les autres champs de la candidature (offerId, candidatId, message, etc.)
          submittedDocumentsIds, // Ajouter les IDs des fichiers joints
        };
  
        console.log('Données de la candidature :', applicationData);
  
        const application = new OfferApplication(applicationData);
        await application.save();
        console.log('Candidature enregistrée avec succès :', application);
  
        // 6. Répondre avec la candidature créée
        res.status(201).json(application);
      });
    } catch (error) {
      console.error('Erreur dans submitOfferApplication :', error.message);
      res.status(500).json({ message: error.message });
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
            return res.status(404).json({ message: 'Offre non trouvée dans updateOfferStatus' });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOfferApplications = async (req, res) => {
    try {
        // Récupérer toutes les candidatures et peupler les champs référencés
        const applications = await OfferApplication.find();
        // Renvoyer les candidatures peuplées
        res.status(200).json(applications);
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ message: error.message });
    }
};


const getCandidatsByOfferId = async (req, res) => {
    const { offerId } = req.params;
  
    try {
      // Validate the offerId
      if (!mongoose.Types.ObjectId.isValid(offerId)) {
        return res.status(400).json({ message: 'ID d\'offre invalide' });
      }
  
      // Find all applications for the specified offer and populate the candidatId field
      const applications = await OfferApplication.find({ offerId })
        .populate({
          path: 'candidatId',
          select: 'username firstName lastName email phone accesType biographie address birthDate image', // Select specific fields
        })
        .exec();
  
      // Check if any applications were found
      if (!applications || applications.length === 0) {
        return res.status(404).json({ message: 'Aucune candidature trouvée pour cette offre' });
      }
  
      // Return the applications with populated candidate information
      res.status(200).json(applications);
    } catch (error) {
      console.error('Erreur lors de la récupération des candidatures :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };


  const getOfferApplicationsByOfferId = async (req, res) => {
    try {
      console.log('I\'m in getOfferApplicationsByOfferId');
      const offerId = req.params.offerId;
  
      // Vérifier si l'ID de l'offre est valide
      if (!offerId) {
        return res.status(400).json({ message: 'L\'ID de l\'offre est requis' });
      }
      console.log(offerId);

      if (!mongoose.Types.ObjectId.isValid(offerId)) {
        return res.status(400).json({ message: 'ID d\'offre invalide' });
      }
  
      // Récupérer les candidatures pour l'offre spécifiée et peupler le champ candidatId
      const applications = await OfferApplication.find({ offerId })
        .populate('candidatId')
        .exec();
        console.log(applications.map((app)=>app.offerId));
  
      // Vérifier si des candidatures ont été trouvées
      if (applications.length === 0) {
        return res.status(404).json({ message: 'Aucune candidature trouvée pour cette offre' });
      }
  
      // Retourner les candidatures avec les informations du candidat peuplées
      res.status(200).json(applications);
    } catch (error) {
      console.error('Erreur lors de la récupération des candidatures :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };
  


const getOfferApplicationsByCandidatId = async (req, res) => {
  const { candidatId } = req.params;

  try {
    // Vérifier si le candidatId est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(candidatId)) {
      return res.status(400).json({ message: 'ID de candidat invalide' });
    }

    // Récupérer toutes les candidatures pour le candidat spécifié
    const applications = await OfferApplication.find({ candidatId })
      .populate({
        path: 'offerId', // Peupler le champ offerId avec les informations de l'offre
        select: 'title enterpriseName enterpriseLocation description domain location salary type contractType', // Champs à inclure
      })
      .exec();

    // Vérifier si des candidatures ont été trouvées
    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: 'Aucune candidature trouvée pour ce candidat' });
    }

    // Retourner les candidatures avec les informations de l'offre peuplées
    res.status(200).json(applications);
  } catch (error) {
    console.error('Erreur lors de la récupération des candidatures :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


const updateOfferApplicationStatus = async (req, res) => {
  console.log('Mise à jour de la candidature - Début');
  
  try {
      console.log('Recherche de la candidature avec ID:', req.params.applicationId);
      
      const application = await OfferApplication.findByIdAndUpdate(
          req.params.applicationId,
          { status: req.body.status },
          { new: true }
      );

      if (!application) {
          console.log('Candidature non trouvée pour ID:', req.params.applicationId);
          return res.status(404).json({ message: 'Candidature non trouvée' });
      }

      console.log('Candidature mise à jour avec succès:', application);
      res.status(200).json(application);
  } catch (error) {
      console.error('Erreur lors de la mise à jour de la candidature:', error.message);
      res.status(400).json({ message: error.message });
  }

  console.log('Mise à jour de la candidature - Fin');
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
        const offers = await Offer.find({ createdBy: req.params.creatorId });
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
};