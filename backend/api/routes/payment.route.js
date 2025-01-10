import {
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    updateTransactionStatus,
    getSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription,
    getInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
} from '../controllers/payment.controller.js';

import express from 'express';

const paymentRoutes = express.Router();

paymentRoutes.get('/transactions', getTransactions);
paymentRoutes.get('/transactions/:id', getTransactionById);
paymentRoutes.post('/transactions', createTransaction);
paymentRoutes.put('/transactions/:id', updateTransaction);
paymentRoutes.delete('/transactions/:id', deleteTransaction);
paymentRoutes.put('/transactions/:id/status', updateTransactionStatus);
paymentRoutes.get('/subscriptions', getSubscriptions);
paymentRoutes.get('/subscriptions/:id', getSubscriptionById);
paymentRoutes.post('/subscriptions', createSubscription);
paymentRoutes.put('/subscriptions/:id', updateSubscription);
paymentRoutes.delete('/subscriptions/:id', deleteSubscription);
paymentRoutes.get('/invoices', getInvoices);
paymentRoutes.get('/invoices/:id', getInvoiceById);
paymentRoutes.post('/invoices', createInvoice);
paymentRoutes.put('/invoices/:id', updateInvoice);
paymentRoutes.delete('/invoices/:id', deleteInvoice);


export default paymentRoutes;