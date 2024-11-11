import TrainingModule from '../../models/training/training-module.model.js'; // Assurez-vous que le chemin est correct

// Récupérer tous les modules de formation
export const getAllTrainingModules = async (req, res) => {
  try {
    const trainingModules = await TrainingModule.find();
    res.status(200).json(trainingModules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un module de formation par son ID
export const getTrainingModuleById = async (req, res) => {
  try {
    const trainingModule = await TrainingModule.findById(req.params.id);
    if (!trainingModule) return res.status(404).json({ message: 'Module de formation non trouvé' });
    res.status(200).json(trainingModule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau module de formation
export const createTrainingModule = async (req, res) => {
  const { training_id, title, description, duration, order, objectives, content, resources, assessment, prerequisites } = req.body;

  const trainingModule = new TrainingModule({
    training_id,
    title,
    description,
    duration,
    order,
    objectives,
    content,
    resources,
    assessment,
    prerequisites,
  });

  try {
    await trainingModule.save();
    res.status(201).json(trainingModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un module de formation existant
export const updateTrainingModule = async (req, res) => {
  try {
    const trainingModule = await TrainingModule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trainingModule) return res.status(404).json({ message: 'Module de formation non trouvé' });
    res.status(200).json(trainingModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un module de formation
export const deleteTrainingModule = async (req, res) => {
  try {
    const trainingModule = await TrainingModule.findByIdAndDelete(req.params.id);
    if (!trainingModule) return res.status(404).json({ message: 'Module de formation non trouvé' });
    res.status(200).json({ message: 'Module de formation supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
