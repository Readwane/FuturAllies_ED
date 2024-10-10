import express from 'express';
import { 
  getAllWebinarEnrollments, 
  getWebinarEnrollmentById, 
  createWebinarEnrollment, 
  updateWebinarEnrollment, 
  deleteWebinarEnrollment 
} from '../../controllers/formations/webinarEnrollmentController.js'; // Assurez-vous que le chemin est correct

const webinarEnrollmentRoutes = express.Router();

// Récupérer toutes les inscriptions
webinarEnrollmentRoutes.get('/', getAllWebinarEnrollments);

// Récupérer une inscription par ID
webinarEnrollmentRoutes.get('/:id', getWebinarEnrollmentById);

// Créer une nouvelle inscription
webinarEnrollmentRoutes.post('/enroll', createWebinarEnrollment); // Notez l'utilisation de '/enroll'

// Mettre à jour une inscription existante
webinarEnrollmentRoutes.put('/:id', updateWebinarEnrollment);

// Supprimer une inscription
webinarEnrollmentRoutes.delete('/:id', deleteWebinarEnrollment);

export default webinarEnrollmentRoutes;
