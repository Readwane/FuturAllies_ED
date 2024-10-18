import Certification from '../../models/certification/certification.js'

// Récupérer toutes les certifications
export const getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().populate('path_id recipient_user_id');
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une certification par ID
export const getCertificationById = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id).populate('path_id recipient_user_id');
    if (!certification) return res.status(404).json({ message: 'Certification non trouvée' });
    res.status(200).json(certification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle certification
export const createCertification = async (req, res) => {
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
export const updateCertification = async (req, res) => {
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
export const deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification non trouvée' });
    res.status(200).json({ message: 'Certification supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
