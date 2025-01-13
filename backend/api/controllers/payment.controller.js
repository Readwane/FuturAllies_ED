import {Transaction, Invoice} from '../models/payment.model.js';  


//-------------------------------------------- MODEL TRANSACTION CONTROLLERS --------------------------------------------
const getTransactions = async (req, res) => {  
  try {  
    const transactions = await Transaction.find().populate('userId paymentMethodId providerId');  
    res.status(200).json({ success: true, data: transactions, count: transactions.length });  
  } catch (error) {  
    console.error('Erreur lors de la récupération des transactions :', error.message);  
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des transactions' });  
  }  
};  


const getTransactionById = async (req, res) => {  
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


const createTransaction = async (req, res) => {  
  const errors = validationResult(req);  
  if (!errors.isEmpty()) {  
    return res.status(400).json({ success: false, errors: errors.array() });  
  }  

  const { userId, paymentMethodId, providerId, issueTransaction, amount, currency, description } = req.body;  
  console.log('Creating transaction with:', { userId, paymentMethodId, providerId, amount, currency });

  try {  
    // Check for required fields explicitly  
    if (!userId || !amount || !currency) {  
      return res.status(400).json({ success: false, message: 'Champs obligatoires manquants' });  
    }  

    const transaction = new Transaction({  
      userId,  
      paymentMethod,  
      provider,  
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
 

const updateTransaction = async (req, res) => {  
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


const deleteTransaction = async (req, res) => {  
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


const updateTransactionStatus = async (req, res) => {  
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

  //-------------------------------------------- MODEL INVOICE CONTROLLERS --------------------------------------------

  const getInvoices = async (req, res) => {
    try {
      const invoices = await Invoice.find()
        .populate('transactionId'); // Utilisez seulement les références pertinentes
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  const getInvoiceById = async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id)
        .populate('transactionId');
      if (!invoice) return res.status(404).json({ message: 'Facture non trouvée' });
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  const createInvoice = async (req, res) => {
    const { transactionId, status } = req.body;
  
    if (!transactionId) {
      return res.status(400).json({ message: 'Le champ transactionId est requis.' });
    }
  
    const invoice = new Invoice({
      transactionId,
      status: status || 'unpaid',
    });
  
    try {
      await invoice.save();
      res.status(201).json(invoice);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

  const updateInvoice = async (req, res) => {
    const { status } = req.body;
  
    try {
      const invoice = await Invoice.findByIdAndUpdate(
        req.params.id,
        { status, updated_at: Date.now() },
        { new: true }
      );
      if (!invoice) return res.status(404).json({ message: 'Facture non trouvée' });
      res.status(200).json(invoice);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

  const deleteInvoice = async (req, res) => {
    try {
      const invoice = await Invoice.findByIdAndDelete(req.params.id);
      if (!invoice) return res.status(404).json({ message: 'Facture non trouvée' });
      res.status(200).json({ message: 'Facture supprimée' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  // Export all controllers
    export {
        getTransactions,
        getTransactionById,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        updateTransactionStatus,
        getInvoices,
        getInvoiceById,
        createInvoice,
        updateInvoice,
        deleteInvoice,
    };
  