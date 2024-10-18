import Service from "../../models/service/service.js";

// Récupérer tous les services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des services', error: error.message });
  }
};

// Récupérer un service par son ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service non trouvé' });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du service', error: error.message });
  }
};

// Créer un nouveau service
export const createService = async (req, res) => {
  const { title, description, icon_url } = req.body;

  if (!title || !description || !icon_url) {
    return res.status(400).json({ message: 'Les champs title, description et icon_url sont requis.' });
  }

  const service = new Service({ title, description, icon_url });

  try {
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du service', error: error.message });
  }
};

// Mettre à jour un service existant
export const updateService = async (req, res) => {
  const { title, description, icon_url } = req.body;

  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, icon_url, updatedAt: Date.now() },
      { new: true }
    );
    if (!service) return res.status(404).json({ message: 'Service non trouvé' });
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du service', error: error.message });
  }
};

// Supprimer un service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service non trouvé' });
    res.status(200).json({ message: 'Service supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du service', error: error.message });
  }
};
