import PaymentProviderTransaction from '../../models/PaymentProviderTransaction.js';

// Récupérer toutes les transactions des fournisseurs de paiement
export const getAllPaymentProviderTransactions = async (req, res) => {
  try {
    const transactions = await PaymentProviderTransaction.find()
      .populate('transactionId')
      .populate('providerId'); // Populer les références des transactions et des fournisseurs
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une transaction de fournisseur de paiement par ID
export const getPaymentProviderTransactionById = async (req, res) => {
  try {
    const transaction = await PaymentProviderTransaction.findById(req.params.id)
      .populate('transactionId')
      .populate('providerId');
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle transaction de fournisseur de paiement
export const createPaymentProviderTransaction = async (req, res) => {
  const { transactionId, providerId, providerReference } = req.body;

  if (!transactionId || !providerId || !providerReference) {
    return res.status(400).json({ message: 'Les champs transactionId, providerId et providerReference sont requis.' });
  }

  const paymentProviderTransaction = new PaymentProviderTransaction({
    transactionId,
    providerId,
    providerReference,
  });

  try {
    await paymentProviderTransaction.save();
    res.status(201).json(paymentProviderTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une transaction de fournisseur de paiement
export const updatePaymentProviderTransaction = async (req, res) => {
  const { providerId, providerReference } = req.body;

  try {
    const transaction = await PaymentProviderTransaction.findByIdAndUpdate(
      req.params.id,
      { providerId, providerReference, updated_at: Date.now() },
      { new: true }
    );
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une transaction de fournisseur de paiement
export const deletePaymentProviderTransaction = async (req, res) => {
  try {
    const transaction = await PaymentProviderTransaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction non trouvée' });
    res.status(200).json({ message: 'Transaction supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
