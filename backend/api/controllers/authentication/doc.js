import Doc from '../../models/authentication/doc.js'

// Récupérer tous les documents
export const getAllDocs = async (req, res) => {
  try {
    const docs = await Doc.find().populate('user_id');
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un document par ID
export const getDocById = async (req, res) => {
  try {
    const doc = await Doc.findById(req.params.id).populate('user_id');
    if (!doc) return res.status(404).json({ message: 'Document non trouvé' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau document
export const createDoc = async (req, res) => {
  const { user_id, title, type, file_url } = req.body;
  const doc = new Doc({ user_id, title, type, file_url });

  try {
    const savedDoc = await doc.save();
    res.status(201).json(savedDoc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un document
export const updateDoc = async (req, res) => {
  const { user_id, title, type, file_url } = req.body;

  try {
    const doc = await Doc.findByIdAndUpdate(
      req.params.id,
      { user_id, title, type, file_url, uploaded_at: Date.now() },
      { new: true }
    );

    if (!doc) return res.status(404).json({ message: 'Document non trouvé' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un document
export const deleteDoc = async (req, res) => {
  try {
    const doc = await Doc.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document non trouvé' });
    res.status(200).json({ message: 'Document supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
