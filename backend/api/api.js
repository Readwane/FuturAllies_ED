import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/users/userRoutes.js';
import webinarRoutes from './routes/formations/webinarRoutes.js';
import webinarEnrollmentRoutes from './routes/formations/webinarEnrollmentRoutes.js';
// import domainRoutes from './routes/catalogues/domainRoutes.js';
// import learningPathRoutes from './routes/catalogue/learningPathRoutes.js';

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
app.use('/users', userRoutes);
app.use('/webinars', webinarRoutes);
app.use('/webinarEnrollments', webinarEnrollmentRoutes);
// app.use('/fapi/learning-paths', learningPathRoutes);

// Middleware de gestion des erreurs à ajouter (ex: errorMiddleware.js)

export default app;
