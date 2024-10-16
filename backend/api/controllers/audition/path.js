import Path from '../../models/audition/path.js';

// Récupérer tous les parcours
export const getAllPaths = async (req, res) => {
  try {
    const paths = await Path.find().populate('domain_id');
    res.status(200).json(paths);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un parcours par ID
export const getPathById = async (req, res) => {
  try {
    const path = await Path.findById(req.params.id).populate('domain_id');
    if (!path) return res.status(404).json({ message: 'Parcours non trouvé' });
    res.status(200).json(path);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau parcours
export const createPath = async (req, res) => {
  const { domain_id, title, picture_url, description, duration } = req.body;
  const path = new Path({ domain_id, title, picture_url, description, duration });

  try {
    const savedPath = await path.save();
    res.status(201).json(savedPath);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un parcours
export const updatePath = async (req, res) => {
  const { domain_id, title, picture_url, description, duration } = req.body;

  try {
    const path = await Path.findByIdAndUpdate(req.params.id, {
      domain_id,
      title,
      picture_url,
      description,
      duration,
      updated_at: Date.now()
    }, { new: true });

    if (!path) return res.status(404).json({ message: 'Parcours non trouvé' });
    res.status(200).json(path);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un parcours
export const deletePath = async (req, res) => {
  try {
    const path = await Path.findByIdAndDelete(req.params.id);
    if (!path) return res.status(404).json({ message: 'Parcours non trouvé' });
    res.status(200).json({ message: 'Parcours supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
