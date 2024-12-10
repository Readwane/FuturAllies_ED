import express from 'express';
import bodyParser from 'body-parser';
import {connectDB} from './config/db.js';
import cors from 'cors';

import {router} from './routes/routage.js';

import webinarRoutes from './routes/formations/webinarRoutes.js';
import webinarEnrollmentRoutes from './routes/formations/webinarEnrollmentRoutes.js';

import {
  valuesRoutes,
  authenticationRoutes,
  auditionRoutes,
  certificationRoutes,
  interactionRoutes,
  recruitmentRoutes,
  trainingRoutes,
  paymentRoutes,
} from './routes/routes.js'


const app = express();

// Connexion à la base de données
connectDB();
// Configuration des options CORS
const corsOptions = {
  origin: 'http://localhost:4200', // Autoriser uniquement les requêtes de cette origine
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true // Permettre l'envoi de cookies
};

// Utiliser CORS avec les options définies
app.use(cors(corsOptions));

// Middleware pour le body parser
app.use(bodyParser.json());

// Gestion des requêtes OPTIONS pour les pré-requêtes CORS
app.options('*', cors(corsOptions)); // Répond aux requêtes OPTIONS avec CORS

// Routes

// ***************** Anciennes definitions de routes ******************************************
// app.use('/fapi', router);
app.use('/fapi', webinarEnrollmentRoutes);

// ******************** Nouvelles routes *****************************************************
app.use('/fapi', paymentRoutes); // Ajout de la route Stripe
app.use('/fapi', valuesRoutes);
app.use('/fapi', authenticationRoutes);
app.use('/fapi', auditionRoutes);
app.use('/fapi', certificationRoutes);
app.use('/fapi', interactionRoutes);
app.use('/fapi', recruitmentRoutes);
app.use('/fapi', trainingRoutes);

// Middleware de gestion des erreurs à ajouter (ex: errorMiddleware.js)

export default app;
