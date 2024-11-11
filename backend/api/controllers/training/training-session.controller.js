import TrainingSession from '../../models/training/training-session.model.js'; // Assurez-vous que le chemin est correct

// Récupérer toutes les séances de formation
export const getAllTrainingSessions = async (req, res) => {
  try {
    const trainingSessions = await TrainingSession.find();
    res.status(200).json(trainingSessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une séance de formation par son ID
export const getTrainingSessionById = async (req, res) => {
  try {
    const trainingSession = await TrainingSession.findById(req.params.id);
    if (!trainingSession) return res.status(404).json({ message: 'Séance de formation non trouvée' });
    res.status(200).json(trainingSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle séance de formation
export const createTrainingSession = async (req, res) => {
  const { trainingModule_id, title, description, duration, sessionDate, order } = req.body;

  const trainingSession = new TrainingSession({
    trainingModule_id,
    title,
    description,
    duration,
    sessionDate,
    order,
  });

  try {
    await trainingSession.save();
    res.status(201).json(trainingSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une séance de formation existante
export const updateTrainingSession = async (req, res) => {
  try {
    const trainingSession = await TrainingSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trainingSession) return res.status(404).json({ message: 'Séance de formation non trouvée' });
    res.status(200).json(trainingSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une séance de formation
export const deleteTrainingSession = async (req, res) => {
  try {
    const trainingSession = await TrainingSession.findByIdAndDelete(req.params.id);
    if (!trainingSession) return res.status(404).json({ message: 'Séance de formation non trouvée' });
    res.status(200).json({ message: 'Séance de formation supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



