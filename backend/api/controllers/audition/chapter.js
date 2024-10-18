import Chapter from '../../models/audition/chapter.js'

export const getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find().populate('part_id');
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id).populate('part_id');
    if (!chapter) return res.status(404).json({ message: 'Chapitre non trouvé' });
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createChapter = async (req, res) => {
  const { part_id, title, description, order } = req.body;

  if (!part_id || !title || order === undefined) {
    return res.status(400).json({ message: 'Les champs part_id, title et order sont requis.' });
  }

  const chapter = new Chapter({ part_id, title, description, order });

  try {
    await chapter.save();
    res.status(201).json(chapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateChapter = async (req, res) => {
  const { title, description, order } = req.body;

  try {
    const chapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      { title, description, order, updated_at: Date.now() },
      { new: true }
    );
    if (!chapter) return res.status(404).json({ message: 'Chapitre non trouvé' });
    res.status(200).json(chapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) return res.status(404).json({ message: 'Chapitre non trouvé' });
    res.status(200).json({ message: 'Chapitre supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
