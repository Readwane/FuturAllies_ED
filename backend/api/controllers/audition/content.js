import Content from '../../models/audition/content.js';

export const getAllContents = async (req, res) => {
  try {
    const contents = await Content.find().populate('chapter_id');
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate('chapter_id');
    if (!content) return res.status(404).json({ message: 'Contenu non trouvé' });
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContent = async (req, res) => {
  const { chapter_id, type, content, content_url } = req.body;

  if (!chapter_id || !type) {
    return res.status(400).json({ message: 'Les champs chapter_id et type sont requis.' });
  }

  const contentData = new Content({ chapter_id, type, content, content_url });

  try {
    await contentData.save();
    res.status(201).json(contentData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateContent = async (req, res) => {
  const { content, content_url, type } = req.body;

  try {
    const contentData = await Content.findByIdAndUpdate(
      req.params.id,
      { content, content_url, type, updated_at: Date.now() },
      { new: true }
    );
    if (!contentData) return res.status(404).json({ message: 'Contenu non trouvé' });
    res.status(200).json(contentData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const contentData = await Content.findByIdAndDelete(req.params.id);
    if (!contentData) return res.status(404).json({ message: 'Contenu non trouvé' });
    res.status(200).json({ message: 'Contenu supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
