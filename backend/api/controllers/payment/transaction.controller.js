import Transaction from '../../models/payment/transaction.model.js';
import { validationResult } from 'express-validator';

// Middleware de vérification admin
const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Accès non autorisé' });
  }
  next();
};

// Récupérer toutes les transactions (accès admin uniquement)
export const getAllTransactions = [verifyAdmin, async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('userId paymentMethodId providerId');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

// Récupérer une transaction par ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('userId paymentMethodId providerId');
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });

    if (req.user.id !== transaction.userId.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une transaction
export const createTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, paymentMethodId, providerId, issueTransaction, amount, currency, description } = req.body;

  try {
    const transaction = new Transaction({
      userId,
      paymentMethodId,
      providerId,
      issueTransaction,
      amount,
      currency,
      status: 'pending', // Défini par défaut à 'pending'
      description,
    });

    // Enregistrement de la transaction en base de données
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la transaction' });
  }
};

// Mettre à jour une transaction
export const updateTransaction = async (req, res) => {
  const { status } = req.body;
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });

    if (req.user.id !== transaction.userId.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    transaction.status = status;
    transaction.updated_at = Date.now(); // Met à jour la date de modification
    await transaction.save();

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });

    if (req.user.id !== transaction.userId.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    await transaction.deleteOne();
    res.status(200).json({ message: 'Transaction supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
