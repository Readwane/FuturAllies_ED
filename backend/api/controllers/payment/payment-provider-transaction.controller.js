import PaymentProviderTransaction from '../../models/payment/payment-provider-transaction.model.js';
import { validationResult } from 'express-validator';

// Récupérer toutes les transactions des fournisseurs de paiement
export const getAllPaymentProviderTransactions = async (req, res) => {
  try {
    const transactions = await PaymentProviderTransaction.find()
      .populate('transactionId providerId'); // Populer les références des transactions et des fournisseurs
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une transaction de fournisseur de paiement par ID
export const getPaymentProviderTransactionById = async (req, res) => {
  try {
    const transaction = await PaymentProviderTransaction.findById(req.params.id)
      .populate('transactionId providerId');
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle transaction de fournisseur de paiement
export const createPaymentProviderTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { transactionId, providerId } = req.body;

  try {
    const paymentProviderTransaction = new PaymentProviderTransaction({
      transactionId,
      providerId,
    });

    // Enregistrement de la transaction en base de données
    await paymentProviderTransaction.save();
    res.status(201).json(paymentProviderTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une transaction de fournisseur de paiement
export const updatePaymentProviderTransaction = async (req, res) => {
  const { providerId } = req.body;

  try {
    const transaction = await PaymentProviderTransaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });

    transaction.providerId = providerId || transaction.providerId;
    transaction.updated_at = Date.now();

    await transaction.save();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une transaction de fournisseur de paiement
export const deletePaymentProviderTransaction = async (req, res) => {
  try {
    const transaction = await PaymentProviderTransaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });

    await transaction.deleteOne();
    res.status(200).json({ message: 'Transaction supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
