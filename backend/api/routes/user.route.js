import express from 'express';

// Importer les contrôleurs spécifiques
import {
    register,
    login,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/authentication/user.js';

const usersRoutes = express.Router();

// Définir les routes pour les utilisateurs
usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/:id', getUserById);
usersRoutes.post('/register', register); // Inscription
usersRoutes.post('/login', login);       // Connexion
usersRoutes.put('/users/:id', updateUser);
usersRoutes.delete('/users/:id', deleteUser);

export default usersRoutes;