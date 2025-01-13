import express from 'express';
import bodyParser from 'body-parser';
import {connectDB} from './db/config.db.js';
import cors from 'cors';


import auditionRoutes from './routes/audition.route.js';
import authRoutes from './routes/auth.route.js';
import certificationRoutes from './routes/certification.route.js';
import fileRoutes from './routes/file.route.js';
import interactionRoutes from './routes/interaction.route.js';
import paymentRoutes from './routes/payment.route.js';
import usersRoutes from './routes/user.route.js';
import valuesRoutes from './routes/value.route.js';
import recruitmentRoutes from './routes/recruitment.route.js';
import trainingRoutes from './routes/training.route.js';


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


// ******************** Nouvelles routes *****************************************************
app.use('/fapi', usersRoutes);
app.use('/fapi', authRoutes);
app.use('/fapi', paymentRoutes); 
app.use('/fapi', valuesRoutes);
app.use('/fapi', auditionRoutes);
app.use('/fapi', fileRoutes);
app.use('/fapi', certificationRoutes);
app.use('/fapi', interactionRoutes);
app.use('/fapi', recruitmentRoutes);
app.use('/fapi', trainingRoutes);

// Middleware de gestion des erreurs à ajouter (ex: errorMiddleware.js)

export default app;
