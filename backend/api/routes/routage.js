
import express from 'express';
export const router = express.Router();

// Importer les contrôleurs spécifiques

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/authentication/user.js';

// Définir les routes pour les utilisateurs
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);