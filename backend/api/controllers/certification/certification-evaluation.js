import CertificationEvaluation from '../models/CertificationEvaluation.js';

// Récupérer toutes les évaluations de certification
export const getAllCertificationsEvaluations = async (req, res) => {
  try {
    const evaluations = await CertificationEvaluation.find().populate('parcours_id');
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une évaluation de certification par ID
export const getCertificationEvaluationById = async (req, res) => {
  try {
    const evaluation = await CertificationEvaluation.findById(req.params.id).populate('parcours_id');
    if (!evaluation) return res.status(404).json({ message: 'Évaluation non trouvée' });
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle évaluation de certification
export const createCertificationEvaluation = async (req, res) => {
  const { parcours_id, title, description, type, passing_score, max_attempts } = req.body;

  const evaluation = new CertificationEvaluation({ parcours_id, title, description, type, passing_score, max_attempts });

  try {
    const savedEvaluation = await evaluation.save();
    res.status(201).json(savedEvaluation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une évaluation de certification
export const updateCertificationEvaluation = async (req, res) => {
  const { title, description, type, passing_score, max_attempts } = req.body;

  try {
    const evaluation = await CertificationEvaluation.findByIdAndUpdate(
      req.params.id,
      { title, description, type, passing_score, max_attempts, updated_at: Date.now() },
      { new: true }
    );

    if (!evaluation) return res.status(404).json({ message: 'Évaluation non trouvée' });
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une évaluation de certification
export const deleteCertificationEvaluation = async (req, res) => {
  try {
    const evaluation = await CertificationEvaluation.findByIdAndDelete(req.params.id);
    if (!evaluation) return res.status(404).json({ message: 'Évaluation non trouvée' });
    res.status(200).json({ message: 'Évaluation supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
