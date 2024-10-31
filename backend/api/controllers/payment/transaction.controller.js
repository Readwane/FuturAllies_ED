// Importation du modèle de transaction et de la bibliothèque Stripe
import Transaction from '../../models/payment/transaction.model';
import Stripe from 'stripe';
import { validationResult } from 'express-validator';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: process.env.API_VERSION,
});

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
    const transactions = await Transaction.find().populate('userId paymentMethodId');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

// Récupérer une transaction par ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('userId paymentMethodId');
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

  const { userId, paymentMethodId, amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    const transaction = new Transaction({
      userId,
      paymentMethodId,
      amount,
      currency,
      status: paymentIntent.status,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    const errorMessage = error.type === 'StripeCardError'
      ? 'Erreur de carte : ' + error.message
      : 'Erreur lors de la création de la transaction';
    res.status(500).json({ message: errorMessage });
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