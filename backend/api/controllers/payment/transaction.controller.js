import Transaction from '../../models/payment/transaction.model.js';
import { validationResult } from 'express-validator';

// Récupérer toutes les transactions
export const getAllTransactions = async (req, res) => {
  try {
    console.log('Débogage : Tentative de récupération de toutes les transactions'); // Ligne de débogage
    const transactions = await Transaction.find().populate('userId paymentMethodId providerId');
    console.log(`Débogage : Nombre de transactions récupérées : ${transactions.length}`); // Ligne de débogage
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Erreur lors de la récupération des transactions :', error.message); // Ligne de débogage
    res.status(500).json({ message: 'Erreur lors de la récupération des transactions' });
  }
};

// Récupérer une transaction par son ID
export const getTransactionById = async (req, res) => {
  try {
    console.log(`Débogage : Tentative de récupération de la transaction ID ${req.params.id}`); // Ligne de débogage
    const transaction = await Transaction.findById(req.params.id).populate('userId paymentMethodId providerId');
    
    // Vérifie si la transaction existe
    if (!transaction) {
      console.log(`Débogage : Transaction ID ${req.params.id} non trouvée`); // Ligne de débogage
      return res.status(404).json({ message: 'Transaction non trouvée' });
    }

    console.log('Débogage : Transaction trouvée', transaction); // Ligne de débogage
    res.status(200).json(transaction);
  } catch (error) {
    console.error('Erreur lors de la récupération de la transaction :', error.message); // Ligne de débogage
    res.status(500).json({ message: 'Erreur lors de la récupération de la transaction' });
  }
};

// Créer une nouvelle transaction
export const createTransaction = async (req, res) => {
  const errors = validationResult(req);
  
  // Vérifie la présence d'erreurs de validation
  if (!errors.isEmpty()) {
    console.log('Débogage : Erreurs de validation trouvées', errors.array()); // Ligne de débogage
    return res.status(400).json({ errors: errors.array() });
  }

  // Récupère les informations de la requête
  const { userId, paymentMethodId, providerId, issueTransaction, amount, currency, description } = req.body;

  try {
    // Vérifie les champs obligatoires
    if (!userId || !amount || !currency) {
      console.log('Débogage : Champs obligatoires manquants'); // Ligne de débogage
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }

    // Crée une nouvelle instance de Transaction
    const transaction = new Transaction({
      userId,
      paymentMethodId,
      providerId,
      issueTransaction,
      amount,
      currency,
      status: 'pending', // Statut par défaut défini sur 'pending'
      description,
    });

    // Sauvegarde la transaction dans la base de données
    await transaction.save();
    console.log('Débogage : Transaction créée avec succès', transaction); // Ligne de débogage
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Erreur lors de la création de la transaction :', error.message); // Ligne de débogage
    res.status(500).json({ message: 'Erreur lors de la création de la transaction' });
  }
};

// Mettre à jour une transaction existante
export const updateTransaction = async (req, res) => {
  const { status } = req.body;
  
  try {
    console.log(`Débogage : Tentative de mise à jour de la transaction ID ${req.params.id}`); // Ligne de débogage
    const transaction = await Transaction.findById(req.params.id);
    
    // Vérifie si la transaction existe
    if (!transaction) {
      console.log(`Débogage : Transaction ID ${req.params.id} non trouvée`); // Ligne de débogage
      return res.status(404).json({ message: 'Transaction non trouvée' });
    }

    // Met à jour le statut de la transaction
    transaction.status = status;
    transaction.updated_at = Date.now(); // Met à jour la date de modification
    await transaction.save();

    console.log('Débogage : Transaction mise à jour avec succès', transaction); // Ligne de débogage
    res.status(200).json(transaction);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la transaction :', error.message); // Ligne de débogage
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la transaction' });
  }
};

// Supprimer une transaction par son ID
export const deleteTransaction = async (req, res) => {
  try {
    console.log(`Débogage : Tentative de suppression de la transaction ID ${req.params.id}`); // Ligne de débogage
    const transaction = await Transaction.findById(req.params.id);
    
    // Vérifie si la transaction existe
    if (!transaction) {
      console.log(`Débogage : Transaction ID ${req.params.id} non trouvée`); // Ligne de débogage
      return res.status(404).json({ message: 'Transaction non trouvée' });
    }

    // Supprime la transaction de la base de données
    await transaction.deleteOne();
    console.log('Débogage : Transaction supprimée avec succès'); // Ligne de débogage
    res.status(200).json({ message: 'Transaction supprimée' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la transaction :', error.message); // Ligne de débogage
    res.status(500).json({ message: 'Erreur lors de la suppression de la transaction' });
  }
};

export const updateTransactionStatus = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { status } = req.body;

    // Recherche de la transaction par son ID et mise à jour du statut
    const transaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { status },
      { new: true }  // retourne la transaction mise à jour
    );

    // Vérification si la transaction existe
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction non trouvée' });
    }

    res.status(200).json({ message: 'Statut de la transaction mis à jour avec succès', status });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de la transaction:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la transaction' });
  }
};