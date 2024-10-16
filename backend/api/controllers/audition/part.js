import Part from '../models/Part.js';

// Récupérer toutes les parties
export const getAllParts = async (req, res) => {
  try {
    const parts = await Part.find().populate('course_id');
    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une partie par ID
export const getPartById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id).populate('course_id');
    if (!part) return res.status(404).json({ message: 'Partie non trouvée' });
    res.status(200).json(part);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle partie
export const createPart = async (req, res) => {
  const { course_id, title, description, order } = req.body;
  const part = new Part({ course_id, title, description, order });

  try {
    const savedPart = await part.save();
    res.status(201).json(savedPart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une partie
export const updatePart = async (req, res) => {
  const { course_id, title, description, order } = req.body;

  try {
    const part = await Part.findByIdAndUpdate(req.params.id, {
      course_id,
      title,
      description,
      order,
      updated_at: Date.now()
    }, { new: true });

    if (!part) return res.status(404).json({ message: 'Partie non trouvée' });
    res.status(200).json(part);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une partie
export const deletePart = async (req, res) => {
  try {
    const part = await Part.findByIdAndDelete(req.params.id);
    if (!part) return res.status(404).json({ message: 'Partie non trouvée' });
    res.status(200).json({ message: 'Partie supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
