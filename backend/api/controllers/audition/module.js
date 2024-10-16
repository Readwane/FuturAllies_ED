import Module from '../models/Module.js';

// Récupérer tous les modules
export const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find().populate('path_id');
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un module par ID
export const getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id).populate('path_id');
    if (!module) return res.status(404).json({ message: 'Module non trouvé' });
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau module
export const createModule = async (req, res) => {
  const { title, path_id, picture_url, description } = req.body;
  const module = new Module({ title, path_id, picture_url, description });

  try {
    const savedModule = await module.save();
    res.status(201).json(savedModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un module
export const updateModule = async (req, res) => {
  const { title, path_id, picture_url, description } = req.body;

  try {
    const module = await Module.findByIdAndUpdate(req.params.id, {
      title,
      path_id,
      picture_url,
      description,
      updated_at: Date.now()
    }, { new: true });

    if (!module) return res.status(404).json({ message: 'Module non trouvé' });
    res.status(200).json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un module
export const deleteModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) return res.status(404).json({ message: 'Module non trouvé' });
    res.status(200).json({ message: 'Module supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
