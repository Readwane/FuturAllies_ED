import { getValues, getValueById, createValue, updateValue, deleteValue } from '../controllers/value.controller.js';
import express from 'express';

const valueRoutes = express.Router();

// Define routes for values
valueRoutes.get('/values', getValues);  
valueRoutes.get('/values/:id', getValueById);
valueRoutes.post('/values', createValue);
valueRoutes.put('/values/:id', updateValue);
valueRoutes.delete('/values/:id', deleteValue);

export default valueRoutes;

