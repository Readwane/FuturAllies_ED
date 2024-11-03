import Profile from '../../models/authentication/profile.js';

// Récupérer tous les profils
export const getAllProfiles = async (req, res) => {
  try {
    console.log("Tentative de récupération de tous les profils.");
    const profiles = await Profile.find().populate('user_id');
    console.log("Profils récupérés avec succès:", profiles);
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Erreur lors de la récupération des profils:", error);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un profil par ID
export const getProfileById = async (req, res) => {
  try {
    console.log(`Tentative de récupération du profil avec l'ID: ${req.params.id}`);
    const profile = await Profile.findById(req.params.id).populate('user_id');
    if (!profile) {
      console.warn("Profil non trouvé avec l'ID:", req.params.id);
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    console.log("Profil récupéré:", profile);
    res.status(200).json(profile);
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau profil
export const createProfile = async (req, res) => {
  const { user_id, first_name, last_name, type, bio, phone_number, address, birth_date, profile_picture_url } = req.body;
  console.log("Données pour le nouveau profil:", { user_id, first_name, last_name, type, bio, phone_number, address, birth_date, profile_picture_url });

  const profile = new Profile({ user_id, first_name, last_name, type, bio, phone_number, address, birth_date, profile_picture_url });

  try {
    const savedProfile = await profile.save();
    console.log("Profil créé avec succès:", savedProfile);
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error("Erreur lors de la création du profil:", error);
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un profil
export const updateProfile = async (req, res) => {
  const { user_id, first_name, last_name, type, bio, phone_number, address, birth_date, profile_picture_url } = req.body;
  console.log("Données pour la mise à jour du profil:", { user_id, first_name, last_name, type, bio, phone_number, address, birth_date, profile_picture_url });

  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { user_id, first_name, last_name, type, bio, phone_number, address, birth_date, profile_picture_url, updated_at: Date.now() },
      { new: true }
    );

    if (!profile) {
      console.warn("Profil non trouvé pour mise à jour avec l'ID:", req.params.id);
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    console.log("Profil mis à jour:", profile);
    res.status(200).json(profile);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un profil
export const deleteProfile = async (req, res) => {
  try {
    console.log(`Tentative de suppression du profil avec l'ID: ${req.params.id}`);
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      console.warn("Profil non trouvé pour suppression avec l'ID:", req.params.id);
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    console.log("Profil supprimé avec succès:", profile);
    res.status(200).json({ message: 'Profil supprimé' });
  } catch (error) {
    console.error("Erreur lors de la suppression du profil:", error);
    res.status(500).json({ message: error.message });
  }
};
