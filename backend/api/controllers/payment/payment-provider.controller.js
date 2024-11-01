import PaymentProvider from '../../models/payment/payment-provider.model.js';

// Récupérer tous les fournisseurs de paiement
export const getAllPaymentProviders = async (req, res) => {
  try {
    const providers = await PaymentProvider.find();
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Récupérer un fournisseur de paiement par ID
export const getPaymentProviderById = async (req, res) => {
  try {
    const provider = await PaymentProvider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: 'Fournisseur de paiement non trouvé' });
    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau fournisseur de paiement
export const createPaymentProvider = async (req, res) => {
  const { name, apiEndpoint, credentials, fees, supportedMethods } = req.body;

  if (!name || !apiEndpoint || !credentials || !fees || !supportedMethods) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const paymentProvider = new PaymentProvider({
    name,
    apiEndpoint,
    credentials,
    fees,
    supportedMethods,
  });

  try {
    await paymentProvider.save();
    res.status(201).json(paymentProvider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un fournisseur de paiement
export const updatePaymentProvider = async (req, res) => {
  const { name, apiEndpoint, credentials, fees, supportedMethods } = req.body;

  try {
    const provider = await PaymentProvider.findByIdAndUpdate(
      req.params.id,
      { name, apiEndpoint, credentials, fees, supportedMethods, updated_at: Date.now() },
      { new: true }
    );
    if (!provider) return res.status(404).json({ message: 'Fournisseur de paiement non trouvé' });
    res.status(200).json(provider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un fournisseur de paiement
export const deletePaymentProvider = async (req, res) => {
  try {
    const provider = await PaymentProvider.findByIdAndDelete(req.params.id);
    if (!provider) return res.status(404).json({ message: 'Fournisseur de paiement non trouvé' });
    res.status(200).json({ message: 'Fournisseur de paiement supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
