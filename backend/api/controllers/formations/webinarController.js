import Webinar from '../../models/formations/Webinar.js'; // Assurez-vous que le chemin est correct

export const getAllWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find();
    res.status(200).json(webinars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWebinarById = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id);
    if (!webinar) return res.status(404).json({ message: 'Webinaire non trouvé' });
    res.status(200).json(webinar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createWebinar = async (req, res) => {
  const { 
        id, 
        title, 
        description, 
        speaker, 
        speakerPicture_url, 
        startDateTime, 
        endDateTime, 
        registrationDeadline, 
        webinarUrl, 
        maxParticipants, 
        isPaid, 
        price, 
        createdBy, 
        type 
  } = req.body;

  const webinar = new Webinar({
        id, 
        title, 
        description, 
        speaker, 
        speakerPicture_url, 
        startDateTime, 
        endDateTime, 
        registrationDeadline, 
        webinarUrl, 
        maxParticipants, 
        isPaid, 
        price, 
        createdBy, 
        type 
  });

  try {
    await webinar.save();
    res.status(201).json(webinar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!webinar) return res.status(404).json({ message: 'Webinaire non trouvé' });
    res.status(200).json(webinar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findByIdAndDelete(req.params.id);
    if (!webinar) return res.status(404).json({ message: 'Webinaire non trouvé' });
    res.status(200).json({ message: 'Webinaire supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
