import CertificationGiven from '../models/CertificationGiven.js';

// Récupérer toutes les certifications données
export const getAllCertificationsGiven = async (req, res) => {
  try {
    const certifications = await CertificationGiven.find().populate(['user_id', 'certification_id']);
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une certification donnée par ID
export const getCertificationGivenById = async (req, res) => {
  try {
    const certification = await CertificationGiven.findById(req.params.id).populate(['user_id', 'certification_id']);
    if (!certification) return res.status(404).json({ message: 'Certification non trouvée' });
    res.status(200).json(certification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle certification donnée
export const createCertificationGiven = async (req, res) => {
  const { user_id, certification_id, certificate_url, score } = req.body;

  const certificationGiven = new CertificationGiven({ user_id, certification_id, certificate_url, score });

  try {
    const savedCertification = await certificationGiven.save();
    res.status(201).json(savedCertification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une certification donnée
export const updateCertificationGiven = async (req, res) => {
  const { certificate_url, score } = req.body;

  try {
    const certification = await CertificationGiven.findByIdAndUpdate(
      req.params.id,
      { certificate_url, score, updated_at: Date.now() },
      { new: true }
    );

    if (!certification) return res.status(404).json({ message: 'Certification non trouvée' });
    res.status(200).json(certification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une certification donnée
export const deleteCertificationGiven = async (req, res) => {
  try {
    const certification = await CertificationGiven.findByIdAndDelete(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification non trouvée' });
    res.status(200).json({ message: 'Certification supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
