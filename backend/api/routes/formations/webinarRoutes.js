import express from 'express';
import {getAllWebinars, getWebinarById, createWebinar, updateWebinar, deleteWebinar } from  '../../controllers/training/webinar.js';
const webinarRoutes = express.Router();

webinarRoutes.get('webinars/', getAllWebinars);
webinarRoutes.get('webinars/:id', getWebinarById);
webinarRoutes.post('webinars/create', createWebinar);
webinarRoutes.put('webinars/:id', updateWebinar);
webinarRoutes.delete('webinars/:id', deleteWebinar);

export default webinarRoutes;