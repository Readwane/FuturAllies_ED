import PaymentMethod from '../../models/PaymentMethod.js';

export const getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find().populate('userId');
    res.status(200).json(paymentMethods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaymentMethodById = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findById(req.params.id).populate('userId');
    if (!paymentMethod) return res.status(404).json({ message: 'Méthode de paiement non trouvée' });
    res.status(200).json(paymentMethod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createPaymentMethod = async (req, res) => {
  const { userId, type, details } = req.body;

  if (!userId || !type || !details) {
    return res.status(400).json({ message: 'Les champs userId, type et details sont requis.' });
  }

  const paymentMethod = new PaymentMethod({ userId, type, details });

  try {
    await paymentMethod.save();
    res.status(201).json(paymentMethod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePaymentMethod = async (req, res) => {
  const { type, details } = req.body;

  try {
    const paymentMethod = await PaymentMethod.findByIdAndUpdate(
      req.params.id,
      { type, details, updated_at: Date.now() },
      { new: true }
    );
    if (!paymentMethod) return res.status(404).json({ message: 'Méthode de paiement non trouvée' });
    res.status(200).json(paymentMethod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
    if (!paymentMethod) return res.status(404).json({ message: 'Méthode de paiement non trouvée' });
    res.status(200).json({ message: 'Méthode de paiement supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
