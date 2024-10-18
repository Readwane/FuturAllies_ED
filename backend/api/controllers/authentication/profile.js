import Profile from '../../models/authentication/profile.js'

// Récupérer tous les profils
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user_id');
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un profil par ID
export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('user_id');
    if (!profile) return res.status(404).json({ message: 'Profil non trouvé' });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau profil
export const createProfile = async (req, res) => {
  const { user_id, first_name, last_name, type, bio, phone_number, address, birth_date, profile_picture_url } = req.body;
  const profile = new Profile({ user_id, first_name, last_name, type, bio, phone_number, address, birth_date, profile_picture_url });

  try {
    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un profil
export const updateProfile = async (req, res) => {
  const { user_id, first_name, last_name, type, bio, phone_number, address, birth_date, profile_picture_url } = req.body;

  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { user_id, first_name, last_name, type, bio, phone_number, address, birth_date, profile_picture_url, created_at: Date.now() },
      { new: true }
    );

    if (!profile) return res.status(404).json({ message: 'Profil non trouvé' });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un profil
export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profil non trouvé' });
    res.status(200).json({ message: 'Profil supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
