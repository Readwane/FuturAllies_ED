
import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from  '../../controllers/users/userController.js';
const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', createUser);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;