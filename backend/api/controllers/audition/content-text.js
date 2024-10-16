import ContentText from '../../models/audition/content-text.js'

export const getAllContentTexts = async (req, res) => {
  try {
    const contentTexts = await ContentText.find().populate('content_id');
    res.status(200).json(contentTexts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContentTextById = async (req, res) => {
  try {
    const contentText = await ContentText.findById(req.params.id).populate('content_id');
    if (!contentText) return res.status(404).json({ message: 'Contenu texte non trouvé' });
    res.status(200).json(contentText);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createContentText = async (req, res) => {
  const { content_id, content } = req.body;

  if (!content_id || !content || !Array.isArray(content) || content.length === 0) {
    return res.status(400).json({ message: 'Les champs content_id et content sont requis.' });
  }

  const contentText = new ContentText({ content_id, content });

  try {
    await contentText.save();
    res.status(201).json(contentText);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateContentText = async (req, res) => {
  const { content, type } = req.body;

  try {
    const contentText = await ContentText.findByIdAndUpdate(
      req.params.id,
      { content, type, updated_at: Date.now() },
      { new: true }
    );
    if (!contentText) return res.status(404).json({ message: 'Contenu texte non trouvé' });
    res.status(200).json(contentText);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteContentText = async (req, res) => {
  try {
    const contentText = await ContentText.findByIdAndDelete(req.params.id);
    if (!contentText) return res.status(404).json({ message: 'Contenu texte non trouvé' });
    res.status(200).json({ message: 'Contenu texte supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
