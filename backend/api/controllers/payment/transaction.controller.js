// Importation du modèle de transaction et de la bibliothèque Stripe
import Transaction from '../../models/payment/transaction.model';
import Stripe from 'stripe';

// Initialisation de Stripe avec la clé secrète et la version API pour garantir la compatibilité
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: process.env.API_VERSION // Version spécifique de l'API pour éviter les changements non anticipés
});

// Contrôleur pour récupérer toutes les transactions, réservé aux administrateurs
export const getAllTransactions = async (req, res) => {
  try {
    // Vérifiez si l'utilisateur est un administrateur avant de lui donner l'accès aux transactions
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Accès non autorisé' });

    // Récupérez toutes les transactions en incluant les informations des utilisateurs et des méthodes de paiement
    const transactions = await Transaction.find().populate('userId paymentMethodId');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour récupérer une transaction par ID avec vérification de l'accès
export const getTransactionById = async (req, res) => {
  try {
    // Récupération de la transaction avec les informations utilisateur et méthode de paiement
    const transaction = await Transaction.findById(req.params.id).populate('userId paymentMethodId');
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });

    // Vérification des droits d'accès: seul l'utilisateur propriétaire ou un administrateur peut consulter la transaction
    if (req.user.id !== transaction.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Contrôleur pour créer une nouvelle transaction avec Stripe et la sauvegarder en base de données
export const createTransaction = async (req, res) => {
  const { userId, paymentMethodId, amount, currency } = req.body;

  // Validation des champs requis pour éviter les erreurs de validation de Stripe
  if (!userId || !paymentMethodId || !amount || !currency) {
    return res.status(400).json({ message: 'Les champs userId, paymentMethodId, amount et currency sont requis.' });
  }

  try {
    // Création d'un PaymentIntent Stripe pour initier une transaction sécurisée
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Montant en cents pour éviter les erreurs de devise
      currency,
      payment_method: paymentMethodId,
      confirmation_method: 'manual', // Méthode de confirmation choisie pour plus de contrôle
      confirm: true, // Confirmation immédiate du paiement
    });

    // Création d'une instance de transaction dans la base de données en utilisant les informations Stripe
    const transaction = new Transaction({
      userId,
      paymentMethodId,
      amount,
      currency,
      status: paymentIntent.status, // Enregistrez le statut de Stripe (ex. succeeded, pending)
    });

    // Sauvegarde de la transaction dans la base de données
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    // Gestion des erreurs Stripe spécifiques pour fournir des messages adaptés aux utilisateurs
    if (error.type === 'StripeCardError') {
      return res.status(400).json({ message: 'Erreur de carte : ' + error.message });
    }
    res.status(500).json({ message: 'Erreur lors de la création de la transaction' });
  }
};

// Contrôleur pour mettre à jour le statut d'une transaction
export const updateTransaction = async (req, res) => {
  const { status } = req.body;
  try {
    // Recherchez la transaction à mettre à jour dans la base de données
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });

    // Vérifiez que seul le propriétaire de la transaction ou un administrateur peut modifier son statut
    if (req.user.id !== transaction.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Mettez à jour le statut et la date de mise à jour de la transaction
    transaction.status = status;
    transaction.updated_at = Date.now();
    await transaction.save();

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Contrôleur pour supprimer une transaction, avec vérification des droits d'accès
export const deleteTransaction = async (req, res) => {
  try {
    // Récupérez la transaction à supprimer
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });

    // Assurez-vous que seul le propriétaire de la transaction ou un administrateur peut la supprimer
    if (req.user.id !== transaction.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Supprimez la transaction et renvoyez une confirmation
    await transaction.deleteOne();
    res.status(200).json({ message: 'Transaction supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
