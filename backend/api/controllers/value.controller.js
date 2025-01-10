import {Value} from '../models/value.model.js'; 

const getValues = async (req, res) => {
  try {
    const values = await Value.find(); 
    res.status(200).json(values); 
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des valeurs', error: error.message });
  }
};


const getValueById = async (req, res) => {
  try {
    const value = await Value.findById(req.params.id); 
    if (!value) {
      return res.status(404).json({ message: 'Valeur non trouvée' }); 
    }
    res.status(200).json(value); 
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la valeur', error: error.message });
  }
};


const createValue = async (req, res) => {
  const { title, description, icon_url } = req.body;
  if (!title || !description || !icon_url) {
    return res.status(400).json({ message: 'Les champs title, description et icon_url sont requis.' });
  }
  const value = new Value({
    title,
    description,
    icon_url,
  });

  try {
    await value.save(); 
    res.status(201).json(value); 
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la valeur', error: error.message });
  }
};


const updateValue = async (req, res) => {
  const { title, description, icon_url } = req.body;

  try {
    const value = await Value.findByIdAndUpdate(
      req.params.id,
      { title, description, icon_url, updatedAt: Date.now() }, 
      { new: true } 
    );
    if (!value) {
      return res.status(404).json({ message: 'Valeur non trouvée' });
    }
    res.status(200).json(value);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la valeur', error: error.message });
  }
};


const deleteValue = async (req, res) => {
  try {
    const value = await Value.findByIdAndDelete(req.params.id); 
    if (!value) {
      return res.status(404).json({ message: 'Valeur non trouvée' });
    }
    res.status(200).json({ message: 'Valeur supprimée avec succès' }); 
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la valeur', error: error.message });
  }
};


export { getValues, getValueById, createValue, updateValue, deleteValue }; 