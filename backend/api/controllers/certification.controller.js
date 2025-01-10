import {Certification, CertificationEvaluation, CertificationGiven} from '../models/certification.model.js';


// -------------------------------------- MODEL CERTIFICATION CONTROLLERS --------------------------------------
// Récupérer toutes les certifications
const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().populate('path_id recipient_user_id');
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une certification par ID
const getCertificationById = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id).populate('path_id recipient_user_id');
    if (!certification) return res.status(404).json({ message: 'Certification non trouvée' });
    res.status(200).json(certification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle certification
const createCertification = async (req, res) => {
  const { title, description, path_id, issuer, issue_date, expiration_date, level, requirements, assessment_method, is_online, certificate_template_url, badge_url, recipient_user_id, skills_gained, language } = req.body;

  const certification = new Certification({ title, description, path_id, issuer, issue_date, expiration_date, level, requirements, assessment_method, is_online, certificate_template_url, badge_url, recipient_user_id, skills_gained, language });

  try {
    const savedCertification = await certification.save();
    res.status(201).json(savedCertification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une certification
const updateCertification = async (req, res) => {
  const { title, description, path_id, issuer, issue_date, expiration_date, level, requirements, assessment_method, is_online, certificate_template_url, badge_url, recipient_user_id, skills_gained, language } = req.body;

  try {
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      { title, description, path_id, issuer, issue_date, expiration_date, level, requirements, assessment_method, is_online, certificate_template_url, badge_url, recipient_user_id, skills_gained, language, updated_at: Date.now() },
      { new: true }
    );

    if (!certification) return res.status(404).json({ message: 'Certification non trouvée' });
    res.status(200).json(certification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une certification
const deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification non trouvée' });
    res.status(200).json({ message: 'Certification supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// -------------------------------------- MODEL CERTIFICATION EVALUATION CONTROLLERS --------------------------------------
// Récupérer toutes les évaluations de certification
const getCertificationsEvaluations = async (req, res) => {
  try {
    const evaluations = await CertificationEvaluation.find().populate('parcours_id');
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une évaluation de certification par ID
const getCertificationEvaluationById = async (req, res) => {
  try {
    const evaluation = await CertificationEvaluation.findById(req.params.id).populate('parcours_id');
    if (!evaluation) return res.status(404).json({ message: 'Évaluation non trouvée' });
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle évaluation de certification
const createCertificationEvaluation = async (req, res) => {
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
const updateCertificationEvaluation = async (req, res) => {
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
const deleteCertificationEvaluation = async (req, res) => {
  try {
    const evaluation = await CertificationEvaluation.findByIdAndDelete(req.params.id);
    if (!evaluation) return res.status(404).json({ message: 'Évaluation non trouvée' });
    res.status(200).json({ message: 'Évaluation supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// -------------------------------------- MODEL CERTIFICATION GIVEN CONTROLLERS --------------------------------------

// Récupérer toutes les certifications données
const getCertificationsGiven = async (req, res) => {
  try {
    const certifications = await CertificationGiven.find().populate(['user_id', 'certification_id']);
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une certification donnée par ID
const getCertificationGivenById = async (req, res) => {
  try {
    const certification = await CertificationGiven.findById(req.params.id).populate(['user_id', 'certification_id']);
    if (!certification) return res.status(404).json({ message: 'Certification non trouvée' });
    res.status(200).json(certification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle certification donnée
const createCertificationGiven = async (req, res) => {
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
const updateCertificationGiven = async (req, res) => {
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
const deleteCertificationGiven = async (req, res) => {
  try {
    const certification = await CertificationGiven.findByIdAndDelete(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification non trouvée' });
    res.status(200).json({ message: 'Certification supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Exporter les fonctions du controller
export {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
  getCertificationsEvaluations,
  getCertificationEvaluationById,
  createCertificationEvaluation,
  updateCertificationEvaluation,
  deleteCertificationEvaluation,
  getCertificationsGiven,
  getCertificationGivenById,
  createCertificationGiven,
  updateCertificationGiven,
  deleteCertificationGiven
};
