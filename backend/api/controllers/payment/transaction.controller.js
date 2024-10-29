import Transaction from '../../models/payment/transaction.model';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Remplacez par votre clé secrète Stripe

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('userId paymentMethodId');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('userId paymentMethodId');
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  const { userId, paymentMethodId, amount, currency } = req.body;

  // Validation des champs requis
  if (!userId || !paymentMethodId || !amount || !currency) {
    return res.status(400).json({ message: 'Les champs userId, paymentMethodId, amount et currency sont requis.' });
  }

  try {
    // Créer une intention de paiement avec Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Montant en cents
      currency,
      payment_method: paymentMethodId,
      confirmation_method: 'manual', // Ou 'automatic' selon votre logique
      confirm: true, // Confirmez le paiement immédiatement
    });

    // Créer la transaction en base de données
    const transaction = new Transaction({
      userId,
      paymentMethodId,
      amount,
      currency,
      status: paymentIntent.status, // Vous pouvez enregistrer le statut renvoyé par Stripe
    });

    // Sauvegarder la transaction
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    // Gérer les erreurs Stripe
    if (error.code === 'card_error') {
      return res.status(400).json({ message: error.message }); // Erreur de carte
    }
    res.status(500).json({ message: 'Erreur lors de la création de la transaction' });
  }
};


export const updateTransaction = async (req, res) => {
  const { status } = req.body;

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status, updated_at: Date.now() },
      { new: true }
    );
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });
    res.status(200).json({ message: 'Transaction supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
