import Transaction from '../../models/payment/transaction.model.js';  
import { validationResult } from 'express-validator';  

// Récupérer toutes les transactions  
export const getAllTransactions = async (req, res) => {  
  try {  
    const transactions = await Transaction.find().populate('userId paymentMethodId providerId');  
    res.status(200).json({ success: true, data: transactions, count: transactions.length });  
  } catch (error) {  
    console.error('Erreur lors de la récupération des transactions :', error.message);  
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des transactions' });  
  }  
};  

// Récupérer une transaction par son ID  
export const getTransactionById = async (req, res) => {  
  try {  
    const transaction = await Transaction.findById(req.params.id).populate('userId paymentMethodId providerId');  

    if (!transaction) {  
      return res.status(404).json({ success: false, message: 'Transaction non trouvée' });  
    }  

    res.status(200).json({ success: true, data: transaction });  
  } catch (error) {  
    console.error('Erreur lors de la récupération de la transaction :', error.message);  
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération de la transaction' });  
  }  
};  


// Créer une nouvelle transaction  
export const createTransaction = async (req, res) => {  
  const errors = validationResult(req);  
  if (!errors.isEmpty()) {  
    return res.status(400).json({ success: false, errors: errors.array() });  
  }  

  const { userId, paymentMethodId, providerId, issueTransaction, amount, currency, description } = req.body;  

  // Log each field to ensure they are populated
  console.log('Creating transaction with:', { userId, paymentMethodId, providerId, amount, currency });

  try {  
    // Check for required fields explicitly  
    if (!userId || !amount || !currency) {  
      return res.status(400).json({ success: false, message: 'Champs obligatoires manquants' });  
    }  

    const transaction = new Transaction({  
      userId,  
      paymentMethodId,  
      providerId,  
      issueTransaction,  
      amount,  
      currency,  
      status: 'pending', // Default status  
      description,  
    });  

    await transaction.save();  
    res.status(201).json({ success: true, data: transaction });  
  } catch (error) {  
    console.error('Erreur lors de la création de la transaction :', error.message);  
    res.status(500).json({ success: false, message: 'Erreur lors de la création de la transaction' });  
  }  
};
 

// Mettre à jour une transaction existante  
export const updateTransaction = async (req, res) => {  
  const { status } = req.body;  

  try {  
    const transaction = await Transaction.findById(req.params.id);  
    if (!transaction) {  
      return res.status(404).json({ success: false, message: 'Transaction non trouvée' });  
    }  

    transaction.status = status;  
    transaction.updated_at = Date.now();  
    await transaction.save();  

    res.status(200).json({ success: true, data: transaction });  
  } catch (error) {  
    console.error('Erreur lors de la mise à jour de la transaction :', error.message);  
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de la transaction' });  
  }  
};  

// Supprimer une transaction par son ID  
export const deleteTransaction = async (req, res) => {  
  try {  
    const transaction = await Transaction.findById(req.params.id);  
    if (!transaction) {  
      return res.status(404).json({ success: false, message: 'Transaction non trouvée' });  
    }  

    await transaction.deleteOne();  
    res.status(200).json({ success: true, message: 'Transaction supprimée' });  
  } catch (error) {  
    console.error('Erreur lors de la suppression de la transaction :', error.message);  
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression de la transaction' });  
  }  
};  

// Mettre à jour le statut d'une transaction  
export const updateTransactionStatus = async (req, res) => {  
  try {  
    const transactionId = req.params.id;  
    const { status } = req.body;  

    const transaction = await Transaction.findByIdAndUpdate(  
      transactionId,  
      { status },  
      { new: true }  // retourne la transaction mise à jour  
    );  

    if (!transaction) {  
      return res.status(404).json({ success: false, message: 'Transaction non trouvée' });  
    }  

    res.status(200).json({ success: true, message: 'Statut de la transaction mis à jour avec succès', status });  
  } catch (error) {  
    console.error('Erreur lors de la mise à jour du statut de la transaction :', error.message);  
    res.status(500).json({ success: false, message: 'Erreur serveur lors de la mise à jour de la transaction' });  
  }  
};