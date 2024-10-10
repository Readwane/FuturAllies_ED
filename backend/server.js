import express from 'express';
import session from 'express-session';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import adminJs from './admin/admin.js';
import app from './api/api.js';
import dotenv from 'dotenv';
import { authenticate } from './admin/authentication.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = express();

// Configuration de la session
server.use(session({
  secret: process.env.COOKIE_PASSWORD || 'somepassword',
  resave: false,
  saveUninitialized: true,
}));

// Middleware pour les fichiers statiques
server.use('/assets', express.static('assets'));

// Route pour AdminJS avec authentification
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate,  // Utilisation de la fonction `authenticate`
  cookieName: process.env.COOKIE_NAME || 'adminjs',
  cookiePassword: process.env.COOKIE_PASSWORD || 'cookiePassword',
}, null, {
  resave: false,
  saveUninitialized: true,
  secret: process.env.COOKIE_PASSWORD || 'cookiePassword',
});

server.use(adminJs.options.rootPath, adminRouter);

// Middleware pour les API
server.use('/fapi', app);

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
