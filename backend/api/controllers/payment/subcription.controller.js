// Contrôleurs d'abonnement

import Subscription from '../../models/Subscription.js';

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate('userId');
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate('userId');
    if (!subscription) return res.status(404).json({ message: 'Abonnement non trouvé' });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Création d'abonnement avec validation des dates
export const createSubscription = async (req, res) => {
  const { userId, type, startDate, endDate, status, recurring } = req.body;

  if (!userId || !type || !startDate || !endDate) {
    return res.status(400).json({ message: 'Les champs userId, type, startDate et endDate sont requis.' });
  }

  const subscription = new Subscription({
    userId,
    type,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    status,
    recurring,
  });

  try {
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un abonnement
export const updateSubscription = async (req, res) => {
  const { type, startDate, endDate, status, recurring } = req.body;

  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { type, startDate, endDate, status, recurring },
      { new: true }
    );
    if (!subscription) return res.status(404).json({ message: 'Abonnement non trouvé' });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un abonnement
export const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) return res.status(404).json({ message: 'Abonnement non trouvé' });
    res.status(200).json({ message: 'Abonnement supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};