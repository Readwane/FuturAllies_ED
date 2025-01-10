import express from 'express';

// Importer les contrôleurs spécifiques
import {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

const usersRoutes = express.Router();

// Définir les routes pour les utilisateurs
usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/:id', getUserById);
usersRoutes.put('/users/:id', updateUser);
usersRoutes.delete('/users/:id', deleteUser);

export default usersRoutes;