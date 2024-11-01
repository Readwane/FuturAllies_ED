import Invoice from '../../models/payment/invoice.model.js';
import { validationResult } from 'express-validator';

// Récupérer toutes les factures
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('transactionId'); // Utilisez seulement les références pertinentes
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une facture par ID
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('transactionId');
    if (!invoice) return res.status(404).json({ message: 'Facture non trouvée' });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle facture
export const createInvoice = async (req, res) => {
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

// Mettre à jour une facture
export const updateInvoice = async (req, res) => {
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

// Supprimer une facture
export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Facture non trouvée' });
    res.status(200).json({ message: 'Facture supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
