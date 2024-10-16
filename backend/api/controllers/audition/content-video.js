import ContentVideo  from "../../models/audition/content-video.js";

export const getAllContentVideos = async (req, res) => {
  try {
    const contentVideos = await ContentVideo.find().populate('content_id');
    res.status(200).json(contentVideos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContentVideoById = async (req, res) => {
  try {
    const contentVideo = await ContentVideo.findById(req.params.id).populate('content_id');
    if (!contentVideo) return res.status(404).json({ message: 'Contenu vidéo non trouvé' });
    res.status(200).json(contentVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContentVideo = async (req, res) => {
  const { content_id, content_url } = req.body;

  if (!content_id || !content_url) {
    return res.status(400).json({ message: 'Les champs content_id et content_url sont requis.' });
  }

  const contentVideo = new ContentVideo({ content_id, content_url });

  try {
    await contentVideo.save();
    res.status(201).json(contentVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateContentVideo = async (req, res) => {
  const { content_url } = req.body;

  try {
    const contentVideo = await ContentVideo.findByIdAndUpdate(
      req.params.id,
      { content_url, updated_at: Date.now() },
      { new: true }
    );
    if (!contentVideo) return res.status(404).json({ message: 'Contenu vidéo non trouvé' });
    res.status(200).json(contentVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteContentVideo = async (req, res) => {
  try {
    const contentVideo = await ContentVideo.findByIdAndDelete(req.params.id);
    if (!contentVideo) return res.status(404).json({ message: 'Contenu vidéo non trouvé' });
    res.status(200).json({ message: 'Contenu vidéo supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
