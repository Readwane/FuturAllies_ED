import Trainer from '../../models/training/trainer.model.js'; // Assurez-vous que le chemin est correct

// Récupérer tous les formateurs
export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un formateur par son ID
export const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ message: 'Formateur non trouvé' });
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau formateur
export const createTrainer = async (req, res) => {
  const { userId, expertise, experienceYears, certifications, socialMediaLinks, rating } = req.body;

  const trainer = new Trainer({
    userId,
    expertise,
    experienceYears,
    certifications,
    socialMediaLinks,
    rating,
  });

  try {
    await trainer.save();
    res.status(201).json(trainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un formateur existant
export const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trainer) return res.status(404).json({ message: 'Formateur non trouvé' });
    res.status(200).json(trainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un formateur
export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ message: 'Formateur non trouvé' });
    res.status(200).json({ message: 'Formateur supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
