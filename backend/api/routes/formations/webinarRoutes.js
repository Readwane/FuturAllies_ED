import express from 'express';
import {getAllWebinars, getWebinarById, createWebinar, updateWebinar, deleteWebinar } from  '../../controllers/formations/webinarController.js';
const webinarRoutes = express.Router();

webinarRoutes.get('/', getAllWebinars);
webinarRoutes.get('/:id', getWebinarById);
webinarRoutes.post('/', createWebinar);
webinarRoutes.put('/:id', updateWebinar);
webinarRoutes.delete('/:id', deleteWebinar);

export default webinarRoutes;