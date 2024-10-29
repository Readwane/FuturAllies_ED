import express from 'express';
import Stripe from 'stripe';
import Transaction from '../models/Transaction'; // Chemin vers ton modèle Transaction
import PaymentMethod from '../models/PaymentMethod'; // Chemin vers ton modèle PaymentMethod
import User from '../models/User'; // Chemin vers ton modèle User
import mongoose from 'mongoose'; // Import mongoose pour la gestion des ObjectId

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Assurez-vous que votre clé Stripe est dans votre fichier .env

// Endpoint pour créer un paiement
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', userId, paymentMethodId } = req.body;

    // Vérifie si l'utilisateur et le mode de paiement existent
    const user = await User.findById(userId);
    const paymentMethod = await PaymentMethod.findById(paymentMethodId);

    if (!user || !paymentMethod) {
      return res.status(400).json({ error: 'User or Payment Method not found' });
    }

    // Crée le paiement avec Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Montant en cents (par ex. 5000 pour 50,00 USD)
      currency,
      payment_method: paymentMethod.details.id, // Assurez-vous que le mode de paiement a un ID Stripe
      confirmation_method: 'manual', // Optionnel, selon votre flux de paiement
      confirm: true, // Pour confirmer le paiement immédiatement
    });

    // Enregistre la transaction dans la base de données
    const transaction = new Transaction({
      userId: user._id,
      paymentMethodId: paymentMethod._id,
      amount,
      currency,
      status: paymentIntent.status, // Status de Stripe
      date: new Date(),
      providerReference: paymentIntent.id, // ID de la transaction Stripe
    });

    await transaction.save();

    // Répondre avec le résultat du paiement
    res.status(200).json({
      success: true,
      paymentIntent,
      transactionId: transaction._id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Payment failed', details: error.message });
  }
});

// Endpoint pour récupérer les méthodes de paiement
router.get('/payment-methods/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const paymentMethods = await PaymentMethod.find({ userId });
    res.status(200).json(paymentMethods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({ error: 'Could not fetch payment methods' });
  }
});

// Endpoint pour récupérer les transactions d'un utilisateur
router.get('/transactions/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId }).populate('paymentMethodId');
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Could not fetch transactions' });
  }
});

export default router;
