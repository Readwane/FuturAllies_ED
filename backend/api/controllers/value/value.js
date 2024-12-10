import Value from "../../models/value/value.js";

// Récupérer tous les Values
export const getAllValues = async (req, res) => {
  try {
    const values = await Value.find(); // Recherche de toutes les valeurs
    res.status(200).json(values); // Retourne la liste des valeurs en JSON
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des valeurs', error: error.message });
  }
};


// Récupérer une valeur par son ID
export const getValueById = async (req, res) => {
  try {
    const value = await Value.findById(req.params.id); // Recherche de la valeur par ID
    if (!value) {
      return res.status(404).json({ message: 'Valeur non trouvée' }); // Si la valeur n'existe pas
    }
    res.status(200).json(value); // Retourne la valeur trouvée
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la valeur', error: error.message });
  }
};


// Créer une nouvelle valeur
export const createValue = async (req, res) => {
  const { title, description, icon_url } = req.body;

  // Validation des champs
  if (!title || !description || !icon_url) {
    return res.status(400).json({ message: 'Les champs title, description et icon_url sont requis.' });
  }

  const value = new Value({
    title,
    description,
    icon_url,
  });

  try {
    await value.save(); // Sauvegarde la nouvelle valeur dans la base de données
    res.status(201).json(value); // Retourne la valeur créée
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la valeur', error: error.message });
  }
};


// Mettre à jour une valeur existante
export const updateValue = async (req, res) => {
  const { title, description, icon_url } = req.body;

  try {
    const value = await Value.findByIdAndUpdate(
      req.params.id, // Recherche de la valeur par ID
      { title, description, icon_url, updatedAt: Date.now() }, // Mise à jour des données
      { new: true } // Retourne la valeur mise à jour
    );
    if (!value) {
      return res.status(404).json({ message: 'Valeur non trouvée' });
    }
    res.status(200).json(value); // Retourne la valeur mise à jour
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la valeur', error: error.message });
  }
};


// Supprimer une valeur
export const deleteValue = async (req, res) => {
  try {
    const value = await Value.findByIdAndDelete(req.params.id); // Recherche et suppression de la valeur par ID
    if (!value) {
      return res.status(404).json({ message: 'Valeur non trouvée' });
    }
    res.status(200).json({ message: 'Valeur supprimée avec succès' }); // Confirme la suppression
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la valeur', error: error.message });
  }
};

