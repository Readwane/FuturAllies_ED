import express from 'express';
import session from 'express-session';

import app from './api/api.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = express();


// Middleware pour les fichiers statiques
server.use('/assets', express.static('assets'));

// Middleware pour les API
server.use('',  app);

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
