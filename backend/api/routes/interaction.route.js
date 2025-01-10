import {
    createMail,
    getMails,
    getMailById,
    updateMail,
    deleteMail,
    createMessage,
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage,
    createNotification,
    getNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
} from '../controllers/interaction.controller.js';

import express from 'express';

const interactionRoutes = express.Router();

// Define routes for interactions
interactionRoutes.post('/mails', createMail);
interactionRoutes.get('/mails', getMails);
interactionRoutes.get('/mails/:id', getMailById);
interactionRoutes.put('/mails/:id', updateMail);
interactionRoutes.delete('/mails/:id', deleteMail);
interactionRoutes.post('/messages', createMessage);
interactionRoutes.get('/messages', getMessages);
interactionRoutes.get('/messages/:id', getMessageById);
interactionRoutes.put('/messages/:id', updateMessage);
interactionRoutes.delete('/messages/:id', deleteMessage);
interactionRoutes.post('/notifications', createNotification);
interactionRoutes.get('/notifications', getNotifications);
interactionRoutes.get('/notifications/:id', getNotificationById);
interactionRoutes.put('/notifications/:id', updateNotification);
interactionRoutes.delete('/notifications/:id', deleteNotification);


export default interactionRoutes;