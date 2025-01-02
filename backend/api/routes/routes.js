
import express from 'express';

// *************************** Imports pour la partie service (wwedo) **********************************


// *************************** Imports pour la partie authentication **********************************
import { 
    getAllDocs,
    getDocById,
    createDoc,
    updateDoc,
    deleteDoc
} from '../controllers/authentication/doc.js';

import { 
    getAllGroups,   
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
} from '../controllers/authentication/group.js';

import { 
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile,
} from '../controllers/authentication/profile.js';

import { 
    getAllUserGroups,
    getUserGroupById,
    createUserGroup,
    deleteUserGroup
} from '../controllers/authentication/user-group.js';

import { 
    getUsers,
    getAllUsersPaginated,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserNameById,
    getUserByUsername,
    getProfileByUserId,
    login,
    authenticateToken,
} from '../controllers/authentication/user.js';

// *************************** Imports pour la partie audittion ***************************************

// *************************** Imports pour la partie certification ***********************************
import {
    getAllCertificationsEvaluations,
    getCertificationEvaluationById,
    createCertificationEvaluation,
    updateCertificationEvaluation,
    deleteCertificationEvaluation
} from '../controllers/certification/certification-evaluation.js';

import {
    getAllCertificationsGiven,
    getCertificationGivenById,
    createCertificationGiven,
    updateCertificationGiven,
    deleteCertificationGiven
} from '../controllers/certification/certification-given.js';

import {
    createCertification,
    getAllCertifications,
    getCertificationById,
    updateCertification,
    deleteCertification
} from '../controllers/certification/certification.js';

// *************************** Imports pour la partie recruitment ************************************
import {
    createOfferApplication,
    submiteOfferApplication,
    getOfferApplications,
    getJobApplications, 
    getInternshipApplications,
    getOfferApplicationById,
    updateOfferApplication,
    deleteOfferApplication
} from '../controllers/recruitment/Offer-application.js'

import {
    createOffer,
    getOffers,
    getJobs,
    getInternships,
    getOfferById,
    updateOffer,
    deleteOffer
} from '../controllers/recruitment/offer.js';



import {  
    createEnterprise,  
    getEnterprises,  
    getEnterpriseById,  
    updateEnterprise,  
    deleteEnterprise  
} from '../controllers/recruitment/enterprise.controller.js';  


// **************************** Imports pour la partie training ************************************
import {
    createTraining,
    getTrainings,
    getWebinars,
    getInPersonTrainings,
    getTrainingById,
    updateTraining,
    deleteTraining,
    getTrainingTrainersById,
    getTrainingModulesById,
    getAllTrainingModuleSessions
} from '../controllers/training/training.js';

import {
    createTrainingApplication,
    getTrainingApplications,
    getWebinarApplications, 
    getInPersonApplications,
    getTrainingApplicationById,
    updateTrainingApplication,
    deleteTrainingApplication
} from '../controllers/training/training-application.js';

import {
    getAllTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer,
} from '../controllers/training/trainer.controller.js';

import {
    getAllTrainingModules,
    getTrainingModuleById,
    createTrainingModule,
    updateTrainingModule,
    deleteTrainingModule,
} from '../controllers/training/training-module.controller.js';

import {
    getAllTrainingSessions,
    getTrainingSessionById,
    createTrainingSession,
    updateTrainingSession,
    deleteTrainingSession,
} from '../controllers/training/training-session.controller.js';


// ******************************** Imports pour la partie paiement *****************************************
import {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransactionStatus
} from '../controllers/payment/transaction.controller.js';

import {
    getAllSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription
} from '../controllers/payment/subcription.controller.js';

import {
    getAllPaymentProviders,
    getPaymentProviderById,
    createPaymentProvider,
    updatePaymentProvider,
    deletePaymentProvider
} from '../controllers/payment/payment-provider.controller.js';

import{
    getAllPaymentProviderTransactions,
    getPaymentProviderTransactionById,
    createPaymentProviderTransaction,
    updatePaymentProviderTransaction,
    deletePaymentProviderTransaction
} from '../controllers/payment/payment-provider-transaction.controller.js';

import {
    getAllPaymentMethods,
    getPaymentMethodById,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
} from '../controllers/payment/payment-method.controller.js';

import {
    getAllPaymentLogs,
    getPaymentLogById,
    createPaymentLog,
    updatePaymentLog,
    deletePaymentLog
} from '../controllers/payment/payment-log.controller.js';

import {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice
} from '../controllers/payment/invoice.controller.js';


import {
    createApplicationFile,
    getApplicationFiles,
    deleteApplicationFile
} from '../controllers/authentication/application-file.controller.js';

import {
    uploadFile,
    uploadFiles,
    getFiles,
    getFileById,
    deleteFile,
    updateFile
} from '../controllers/authentication/file.controller.js'


import {
    createUserFile,
    getUserFiles,
    getUserFileById,
    deleteUserFile,
    updateUserFile
} from '../controllers/authentication/user-file.controller.js'

import { 
    createValue, 
    deleteValue, 
    getAllValues, 
    getValueById,
    updateValue 
} from '../controllers/value/value.js';


// ********************************* Deinition des routers pour chaque partie *******************************/
const valuesRoutes = express.Router();
const authenticationRoutes = express.Router();
const auditionRoutes = express.Router();
const certificationRoutes = express.Router();
const interactionRoutes = express.Router();
const recruitmentRoutes = express.Router();
const trainingRoutes = express.Router();
const paymentRoutes = express.Router();
// const webinarsRoutes = express.Router();


//******************************* Routes pour la partie authnetication *************************************/

// Routes pour Doc

valuesRoutes.post('/values/', createValue);
valuesRoutes.get('/values', getAllValues);
valuesRoutes.get('/values/:id', getValueById);
valuesRoutes.put('/values/:id/', updateValue);
valuesRoutes.delete('/values/:id/', deleteValue);

//******************************* Routes pour la partie authnetication *************************************/
// Routes pour Doc en utilisant des conventions REST  
authenticationRoutes.post('/docs', createDoc); // Créer un document  
authenticationRoutes.get('/docs', getAllDocs); // Récupérer tous les documents  
authenticationRoutes.get('/docs/:id', getDocById); // Récupérer un document par ID  
authenticationRoutes.put('/docs/:id', updateDoc); // Mettre à jour un document par ID  
authenticationRoutes.delete('/docs/:id', deleteDoc); // Supprimer un document par ID

// Routes pour File
authenticationRoutes.post('/files/upload', uploadFile);
authenticationRoutes.post('/uploads', uploadFiles);
authenticationRoutes.get('/files', getFiles);
authenticationRoutes.get('/files/:id', getFileById);
authenticationRoutes.put('/files/:id/update', updateFile);
authenticationRoutes.delete('/files/:id/delete', deleteFile);


// Routes pour User-file
authenticationRoutes.post('/user-files/create', createUserFile);
authenticationRoutes.get('/user-files', getUserFiles);
authenticationRoutes.get('/user-files/:id', getUserFileById);
authenticationRoutes.put('/user-files/:id/update', updateUserFile);
authenticationRoutes.delete('/user-files/:id/delete', deleteUserFile);


// Routes pour Group
authenticationRoutes.post('/application-files/create', createApplicationFile);
authenticationRoutes.get('/application-files', getApplicationFiles);
authenticationRoutes.get('/application-files/:id', deleteApplicationFile);
// authenticationRoutes.put('/application-files/:id/update', updateGroup);
// authenticationRoutes.delete('/application-files/:id/delete', deleteGroup);

// Routes pour Group
authenticationRoutes.post('/groups/create', createGroup);
authenticationRoutes.get('/groups', getAllGroups);
authenticationRoutes.get('/groups/:id', getGroupById);
authenticationRoutes.put('/groups/:id/update', updateGroup);
authenticationRoutes.delete('/groups/:id/delete', deleteGroup);

// Routes pour Profile
authenticationRoutes.post('/profiles/create', createProfile);
authenticationRoutes.get('/profiles', getAllProfiles);
authenticationRoutes.get('/profiles/:id', getProfileById);
authenticationRoutes.put('/profiles/:id/update', updateProfile);
authenticationRoutes.delete('/profiles/:id/delete', deleteProfile);

// Routes pour UserGroup
authenticationRoutes.post('/user-groups/create', createUserGroup);
authenticationRoutes.get('/user-groups', getAllUserGroups);
authenticationRoutes.get('/user-groups/:id', getUserGroupById);
// authenticationRoutes.put('/user-groups/:id/update', updateUserGroup);
authenticationRoutes.delete('/user-groups/:id/delete', deleteUserGroup);

// Routes pour User
authenticationRoutes.post('/users/admin-login', login);
authenticationRoutes.post('/users', createUser);
// authenticationRoutes.get('/users', authenticateToken, getAllUsers);
authenticationRoutes.get('/users', getUsers);
authenticationRoutes.get('/users/paginated', getAllUsersPaginated);
authenticationRoutes.get('/users/:id', getUserById);
authenticationRoutes.put('/users/:id', updateUser);
authenticationRoutes.get('/users/gnbId/:id', getUserNameById);
authenticationRoutes.delete('/users/:id', deleteUser);
authenticationRoutes.get('/users/rep/:username', getUserByUsername);
authenticationRoutes.get('users/byUser/rip/:userId', getProfileByUserId);





//******************************* Routes pour la partie certification *************************************/
// Routes pour CertificationEvaluation
certificationRoutes.post('/certification-evaluations/create', createCertificationEvaluation);
certificationRoutes.get('/certification-evaluations', getAllCertificationsEvaluations);
certificationRoutes.get('/certification-evaluations/:id', getCertificationEvaluationById);
certificationRoutes.put('/certification-evaluations/:id/update', updateCertificationEvaluation);
certificationRoutes.delete('/certification-evaluations/:id/delete', deleteCertificationEvaluation);

// Routes pour CertificationGiven
certificationRoutes.post('/certifications-given/create', createCertificationGiven);
certificationRoutes.get('/certifications-given', getAllCertificationsGiven);
certificationRoutes.get('/certifications-given/:id', getCertificationGivenById);
certificationRoutes.put('/certifications-given/:id/update', updateCertificationGiven);
certificationRoutes.delete('/certifications-given/:id/delete', deleteCertificationGiven);

// Routes pour Certification
certificationRoutes.post('/certifications/create', createCertification);
certificationRoutes.get('/certifications', getAllCertifications);
certificationRoutes.get('/certifications/:id', getCertificationById);
certificationRoutes.put('/certifications/:id/update', updateCertification);
certificationRoutes.delete('/certifications/:id/delete', deleteCertification);

//******************************* Routes pour la partie recruitment *************************************/
  // Routes pour OfferApplication
  recruitmentRoutes.get('/offer-applications', getOfferApplications);
  recruitmentRoutes.get('/applications/jobs`', getJobApplications);
  recruitmentRoutes.get('/applications/internships', getInternshipApplications);
  recruitmentRoutes.post('/offer-applications/create', submiteOfferApplication);
//   recruitmentRoutes.post('/offer-applications/create', createOfferApplication);
  recruitmentRoutes.get('/offer-applications/:id', getOfferApplicationById);
  recruitmentRoutes.put('/offer-applications/:id/updte', updateOfferApplication);
  recruitmentRoutes.delete('/offer-applications/:id/delete', deleteOfferApplication);

 // Routes pour Offer
 recruitmentRoutes.get('/offers', getOffers);
 recruitmentRoutes.get('offers', getJobs);
 recruitmentRoutes.get('offers/internships', getInternships);
 recruitmentRoutes.post('/offers', createOffer);
 recruitmentRoutes.get('/offers/:id', getOfferById);
 recruitmentRoutes.put('/offers/:id', updateOffer);
 recruitmentRoutes.delete('/offers/:id', deleteOffer);


//  recruitmentRoutes.get('/offers', getOffers);
//  recruitmentRoutes.get('offers/jobs', getJobs);
//  recruitmentRoutes.get('offers/internships', getInternships);
//  recruitmentRoutes.post('/offers/create', createOffer);
//  recruitmentRoutes.get('/offers/:id', getOfferById);
//  recruitmentRoutes.put('/offers/:id/update', updateOffer);
//  recruitmentRoutes.delete('/offers/:id/delete', deleteOffer);

// Routes pour l'entreprise 
recruitmentRoutes.get('/enterprises', getEnterprises); // Récupérer toutes les entreprises  
recruitmentRoutes.post('/enterprises/', createEnterprise); // Créer une nouvelle entreprise  
recruitmentRoutes.get('/enterprises/:id', getEnterpriseById); // Récupérer une entreprise par ID  
recruitmentRoutes.put('/enterprises/:id', updateEnterprise); // Mettre à jour une entreprise  
recruitmentRoutes.delete('/enterprises/:id', deleteEnterprise); // Supprimer une entreprise 


//******************************* Routes pour la partie training *************************************/
// Routes pour Training
trainingRoutes.get('/trainings', getTrainings);
trainingRoutes.get('trainings/webinars', getWebinars);
trainingRoutes.get('trainings/in-person', getInPersonTrainings);
trainingRoutes.post('/trainings/create', createTraining);
trainingRoutes.get('/trainings/:id', getTrainingById);
trainingRoutes.put('/trainings/:id/update', updateTraining);
trainingRoutes.delete('/trainings/:id/delete', deleteTraining);

trainingRoutes.get('/trainings/:id/trainers', getTrainingTrainersById);
trainingRoutes.get('/trainings/:id/modules', getTrainingModulesById);
trainingRoutes.get('/trainings/:id/modules/sessions', getAllTrainingModuleSessions);


// Routes pour TrainingApplication
trainingRoutes.get('training-applications/webinars', getWebinarApplications);
trainingRoutes.get('training-applications/in-persons', getInPersonApplications);
trainingRoutes.post('/training-applications/create', createTrainingApplication);
trainingRoutes.get('/training-applications', getTrainingApplications);
trainingRoutes.get('/training-applications/:id', getTrainingApplicationById);
trainingRoutes.put('/training-applications/:id/update', updateTrainingApplication);
trainingRoutes.delete('/training-applications/:id/delete', deleteTrainingApplication);


trainingRoutes.get('/trainers', getAllTrainers);
trainingRoutes.get('/trainers/:id', getTrainerById);
trainingRoutes.post('/trainers/create', createTrainer);
trainingRoutes.put('/trainers/:id/update', updateTrainer);
trainingRoutes.delete('/trainers/:id/delete', deleteTrainer);


trainingRoutes.get('/training-modules', getAllTrainingModules);
trainingRoutes.get('/training-modules/:id', getTrainingModuleById);
trainingRoutes.post('/training-modules/create', createTrainingModule);
trainingRoutes.put('/training-modules/:id/update', updateTrainingModule);
trainingRoutes.delete('/training-modules/:id/delete', deleteTrainingModule);


trainingRoutes.get('/training-sessions', getAllTrainingSessions);
trainingRoutes.get('/training-sessions/:id', getTrainingSessionById);
trainingRoutes.post('/training-sessions/create', createTrainingSession);
trainingRoutes.put('/training-sessions/:id/update', updateTrainingSession);
trainingRoutes.delete('/training-sessions/:id/delete', deleteTrainingSession);

//******************************* Routes pour la partie authnetication *************************************/
// Routes pour subcription
paymentRoutes.post('/subscriptions/create', createSubscription);
paymentRoutes.get('/subscriptions', getAllSubscriptions);
paymentRoutes.get('/subscriptions/:id', getSubscriptionById);
paymentRoutes.put('/subscriptions/:id/update', updateSubscription);
paymentRoutes.delete('/subscriptions/:id/delete', deleteSubscription);

// Routes pour transaction
paymentRoutes.post('/transactions/create', createTransaction);
paymentRoutes.get('/transactions', getAllTransactions);
paymentRoutes.get('/transactions/:id', getTransactionById);
paymentRoutes.put('/transactions/:id/status', updateTransactionStatus)
// paymentRoutes.put('/subscriptions/:id/update', updateSubscription);
// paymentRoutes.delete('/subscriptions/:id/delete', deleteSubscription);

// Routes pour payment-provider
paymentRoutes.post('/payment-providers/create', createPaymentProvider);
paymentRoutes.get('/payment-providers', getAllPaymentProviders);
paymentRoutes.get('/payment-providers/:id', getPaymentProviderById);
paymentRoutes.put('/payment-providers/:id/update', updatePaymentProvider);
paymentRoutes.delete('/payment-providers/:id/delete', deletePaymentProvider);

// Routes pour payment-provider-transaction   
paymentRoutes.post('/payment-provider-transactions/create', createPaymentProviderTransaction);
paymentRoutes.get('/payment-provider-transactions', getAllPaymentProviderTransactions);
paymentRoutes.get('/payment-provider-transactions/:id', getPaymentProviderTransactionById);
paymentRoutes.put('/payment-provider-transactions/:id/update', updatePaymentProviderTransaction);
paymentRoutes.delete('/payment-provider-transactions/:id/delete', deletePaymentProviderTransaction);

// Routes pour payment-methode
paymentRoutes.post('/payment-methods/create', createPaymentMethod);
paymentRoutes.get('/payment-methods', getAllPaymentMethods);
paymentRoutes.get('/payment-methods/:id', getPaymentMethodById);
paymentRoutes.put('/payment-methods/:id/update', updatePaymentMethod);
paymentRoutes.delete('/payment-methods/:id/delete', deletePaymentMethod);

// Routes pour payment-log
paymentRoutes.post('/payment-logs/create', createPaymentLog);
paymentRoutes.get('/payment-logs', getAllPaymentLogs);
paymentRoutes.get('/payment-logs/:id', getPaymentLogById);
paymentRoutes.put('/payment-logs/:id/update', updatePaymentLog);
paymentRoutes.delete('/payment-logs/:id/delete', deletePaymentLog);


// Routes pour invoice
paymentRoutes.post('/invoices/create', createInvoice);
paymentRoutes.get('/invoices', getAllInvoices);
paymentRoutes.get('/invoices/:id', getInvoiceById);
paymentRoutes.put('/invoices/:id/update', updateInvoice);
paymentRoutes.delete('/invoices/:id/delete', deleteInvoice);


// ****************************** Exportattion des diffrents routers *****************************************/
export {
    valuesRoutes,
    authenticationRoutes,
    auditionRoutes,
    certificationRoutes,
    interactionRoutes,
    recruitmentRoutes,
    trainingRoutes,
    paymentRoutes
};