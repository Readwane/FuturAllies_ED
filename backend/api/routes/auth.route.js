import { register, login, authenticateToken } from '../controllers/auth.controller.js';

import express from 'express';

const authRoutes = express.Router();

// Define routes for authentication

authRoutes.post('/register', register); // Register
authRoutes.post('/login', login);       // Login
authRoutes.post('/authenticate', authenticateToken); // Authenticate


export default authRoutes;