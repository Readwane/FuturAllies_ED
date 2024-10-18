import Group from '../../models/authentication/group.js'

// Récupérer tous les groupes
export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un groupe par ID
export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Groupe non trouvé' });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau groupe
export const createGroup = async (req, res) => {
  const { name, description } = req.body;
  const group = new Group({ name, description });

  try {
    const savedGroup = await group.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un groupe
export const updateGroup = async (req, res) => {
  const { name, description } = req.body;

  try {
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { name, description, created_at: Date.now() },
      { new: true }
    );

    if (!group) return res.status(404).json({ message: 'Groupe non trouvé' });
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un groupe
export const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ message: 'Groupe non trouvé' });
    res.status(200).json({ message: 'Groupe supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
