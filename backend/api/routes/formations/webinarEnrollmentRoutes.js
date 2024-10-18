import express from 'express';
import { 
  getAllWebinarEnrollments, 
  getWebinarEnrollmentById, 
  createWebinarEnrollment, 
  updateWebinarEnrollment, 
  deleteWebinarEnrollment 
} from '../../controllers/training/webinar-application.js'; // Assurez-vous que le chemin est correct

const webinarEnrollmentRoutes = express.Router();

// Récupérer toutes les inscriptions
webinarEnrollmentRoutes.get('webinarEnrollments/', getAllWebinarEnrollments);

// Récupérer une inscription par ID
webinarEnrollmentRoutes.get('webinarEnrollments/:id', getWebinarEnrollmentById);

// Créer une nouvelle inscription
webinarEnrollmentRoutes.post('webinarEnrollments/enroll', createWebinarEnrollment); // Notez l'utilisation de '/enroll'

// Mettre à jour une inscription existante
webinarEnrollmentRoutes.put('webinarEnrollments/:id', updateWebinarEnrollment);

// Supprimer une inscription
webinarEnrollmentRoutes.delete('webinarEnrollments/:id', deleteWebinarEnrollment);

export default webinarEnrollmentRoutes;
