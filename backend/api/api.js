import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';

import webinarRoutes from './routes/formations/webinarRoutes.js';
import webinarEnrollmentRoutes from './routes/formations/webinarEnrollmentRoutes.js';

import {
  servicesRoutes,
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

// Middleware
app.use(bodyParser.json());

// Middleware pour autoriser CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

// Routes

// ***************** Anciennes definitions de routes ******************************************
app.use('/fapi', webinarRoutes);
app.use('/fapi', webinarEnrollmentRoutes);

// ******************** Nouvelles routes *****************************************************
app.use('/fapi', paymentRoutes); // Ajout de la route Stripe
app.use('/fapi', servicesRoutes);
app.use('/fapi', authenticationRoutes);
app.use('/fapi', auditionRoutes);
app.use('/fapi', certificationRoutes);
app.use('/fapi', interactionRoutes);
app.use('/fapi', recruitmentRoutes);
app.use('/fapi', trainingRoutes);

// Middleware de gestion des erreurs à ajouter (ex: errorMiddleware.js)

export default app;
