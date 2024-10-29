import PaymentLog from '../../models/PaymentLog.js';

// Récupérer tous les logs de paiement
export const getAllPaymentLogs = async (req, res) => {
  try {
    const paymentLogs = await PaymentLog.find()
      .populate('transactionId'); // Populer les références
    res.status(200).json(paymentLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un log de paiement par ID
export const getPaymentLogById = async (req, res) => {
  try {
    const paymentLog = await PaymentLog.findById(req.params.id)
      .populate('transactionId');
    if (!paymentLog) return res.status(404).json({ message: 'Log de paiement non trouvé' });
    res.status(200).json(paymentLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Créer un nouveau log de paiement
export const createPaymentLog = async (req, res) => {
  const { transactionId, message, logType } = req.body;

  if (!transactionId || !message || !logType) {
    return res.status(400).json({ message: 'Les champs transactionId, message et logType sont requis.' });
  }

  const paymentLog = new PaymentLog({
    transactionId,
    message,
    logType,
  });

  try {
    await paymentLog.save();
    res.status(201).json(paymentLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un log de paiement
export const updatePaymentLog = async (req, res) => {
  const { message, logType } = req.body;

  try {
    const paymentLog = await PaymentLog.findByIdAndUpdate(
      req.params.id,
      { message, logType, updated_at: Date.now() },
      { new: true }
    );
    if (!paymentLog) return res.status(404).json({ message: 'Log de paiement non trouvé' });
    res.status(200).json(paymentLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un log de paiement
export const deletePaymentLog = async (req, res) => {
  try {
    const paymentLog = await PaymentLog.findByIdAndDelete(req.params.id);
    if (!paymentLog) return res.status(404).json({ message: 'Log de paiement non trouvé' });
    res.status(200).json({ message: 'Log de paiement supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
