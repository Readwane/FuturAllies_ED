import WebinarEnrollment from '../../models/training/webinar-application.js'; // Assurez-vous que le chemin est correct

// Récupérer toutes les inscriptions
export const getAllWebinarEnrollments = async (req, res) => {
  try {
    const enrollments = await WebinarEnrollment.find();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une inscription par ID
export const getWebinarEnrollmentById = async (req, res) => {
  try {
    const enrollment = await WebinarEnrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Inscription non trouvée' });
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Créer une nouvelle inscription
export const createWebinarEnrollment = async (req, res) => {
  const { 
    webinarId, 
    fullName, 
    email, 
    registrationDate, 
    hasAcceptedTerms, 
    paymentStatus, 
    paymentMethod, 
    isConfirmed 
  } = req.body;

  // Validation basique des données
  if (!webinarId || !fullName || !email) {
    return res.status(400).json({ message: 'webinarId, fullName et email sont requis.' });
  }

  const enrollment = new WebinarEnrollment({
    webinarId, 
    fullName, 
    email, 
    registrationDate, 
    hasAcceptedTerms, 
    paymentStatus, 
    paymentMethod, 
    isConfirmed 
  });

  try {
    await enrollment.save();
    res.status(201).json(enrollment);
    console.log('A new webinar enrollment sucessful')
  } catch (error) {
    console.error('Error saving enrollment:', error); // Ajoutez un console.log pour vérifier l'erreur
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une inscription existante
export const updateWebinarEnrollment = async (req, res) => {
  try {
    const enrollment = await WebinarEnrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enrollment) return res.status(404).json({ message: 'Inscription non trouvée' });
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une inscription
export const deleteWebinarEnrollment = async (req, res) => {
  try {
    const enrollment = await WebinarEnrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Inscription non trouvée' });
    res.status(200).json({ message: 'Inscription supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
