import Domain from '../models/Domain.js';

// Récupérer tous les domaines
export const getAllDomains = async (req, res) => {
  try {
    const domains = await Domain.find();
    res.status(200).json(domains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un domaine par ID
export const getDomainById = async (req, res) => {
  try {
    const domain = await Domain.findById(req.params.id);
    if (!domain) return res.status(404).json({ message: 'Domaine non trouvé' });
    res.status(200).json(domain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau domaine
export const createDomain = async (req, res) => {
  const { title, picture_url, description } = req.body;
  const domain = new Domain({ title, picture_url, description });

  try {
    const savedDomain = await domain.save();
    res.status(201).json(savedDomain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un domaine
export const updateDomain = async (req, res) => {
  const { title, picture_url, description } = req.body;

  try {
    const domain = await Domain.findByIdAndUpdate(req.params.id, {
      title,
      picture_url,
      description,
      updated_at: Date.now()
    }, { new: true });

    if (!domain) return res.status(404).json({ message: 'Domaine non trouvé' });
    res.status(200).json(domain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un domaine
export const deleteDomain = async (req, res) => {
  try {
    const domain = await Domain.findByIdAndDelete(req.params.id);
    if (!domain) return res.status(404).json({ message: 'Domaine non trouvé' });
    res.status(200).json({ message: 'Domaine supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
