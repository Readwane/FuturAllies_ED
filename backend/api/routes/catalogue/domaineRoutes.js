import express from 'express';
import { getAllDomains, getDomainById, createDomain, updateDomain, deleteDomain } from '../controllers/catalogue/domainController.js';

const domaineRoutes = express.domaineRoutes();

domaineRoutes.get('/', getAllDomains);
domaineRoutes.get('/:id', getDomainById);
domaineRoutes.post('/', createDomain);
domaineRoutes.put('/:id', updateDomain);
domaineRoutes.delete('/:id', deleteDomain);

export default domaineRoutes;
