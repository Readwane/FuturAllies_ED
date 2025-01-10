import { 
    uploadFile, uploadFiles, getFiles, getFileById, deleteFile, updateFile, 
    createUserFile, getUserFiles, getUserFileById, deleteUserFile, updateUserFile, 
    createCandidacyFile, getAllCandidacyFiles, getCandidacyFileById, updateCandidacyFile, deleteCandidacyFile 
} from '../controllers/file.controller.js';

import express from 'express';

const fileRoutes = express.Router();

// Define routes for files

fileRoutes.post('/files', uploadFile);
fileRoutes.post('/files', uploadFiles);
fileRoutes.get('/files', getFiles);
fileRoutes.get('/files/:id', getFileById);
fileRoutes.put('/files/:id', updateFile);   
fileRoutes.delete('/files/:id', deleteFile);
fileRoutes.post('/user-files', createUserFile);
fileRoutes.get('/user-files', getUserFiles);
fileRoutes.get('/user-files/:id', getUserFileById);
fileRoutes.put('/user-files/:id', updateUserFile);
fileRoutes.delete('/user-files/:id', deleteUserFile);
fileRoutes.post('/candidacy-files', createCandidacyFile);
fileRoutes.get('/candidacy-files', getAllCandidacyFiles);
fileRoutes.get('/candidacy-files/:id', getCandidacyFileById);
fileRoutes.put('/candidacy-files/:id', updateCandidacyFile);
fileRoutes.delete('/candidacy-files/:id', deleteCandidacyFile);


export default fileRoutes;