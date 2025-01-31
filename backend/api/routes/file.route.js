import { 
    uploadFile, uploadFiles, getFiles, getFileById, deleteFile, updateFile, 
} from '../controllers/file.controller.js';

import express from 'express';

const fileRoutes = express.Router();

// Define routes for files

fileRoutes.post('/files/upload', uploadFile);
fileRoutes.post('/files/uploads', uploadFiles);
fileRoutes.get('/files', getFiles);
fileRoutes.get('/files/:id', getFileById);
fileRoutes.put('/files/:id', updateFile);   
fileRoutes.delete('/files/:id', deleteFile);

export default fileRoutes;