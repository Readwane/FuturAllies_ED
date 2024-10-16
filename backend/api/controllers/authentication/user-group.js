import UserGroup from '../models/UserGroup.js';

// Récupérer toutes les associations utilisateur-groupe
export const getAllUserGroups = async (req, res) => {
  try {
    const userGroups = await UserGroup.find().populate(['user_id', 'group_id']);
    res.status(200).json(userGroups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une association utilisateur-groupe par ID
export const getUserGroupById = async (req, res) => {
  try {
    const userGroup = await UserGroup.findById(req.params.id).populate(['user_id', 'group_id']);
    if (!userGroup) return res.status(404).json({ message: 'Association non trouvée' });
    res.status(200).json(userGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle association utilisateur-groupe
export const createUserGroup = async (req, res) => {
  const { user_id, group_id } = req.body;
  const userGroup = new UserGroup({ user_id, group_id });

  try {
    const savedUserGroup = await userGroup.save();
    res.status(201).json(savedUserGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une association utilisateur-groupe
export const deleteUserGroup = async (req, res) => {
  try {
    const userGroup = await UserGroup.findByIdAndDelete(req.params.id);
    if (!userGroup) return res.status(404).json({ message: 'Association non trouvée' });
    res.status(200).json({ message: 'Association supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
