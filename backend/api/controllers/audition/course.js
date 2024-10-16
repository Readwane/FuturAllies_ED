import Course from '../../models/training/Course.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('module_id');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('module_id');
    if (!course) return res.status(404).json({ message: 'Cours non trouvé' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  const { module_id, title, picture_url, description, duration } = req.body;

  if (!module_id || !title || !description || !duration) {
    return res.status(400).json({ message: 'Les champs module_id, title, description et duration sont requis.' });
  }

  const course = new Course({ module_id, title, picture_url, description, duration });

  try {
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const { title, picture_url, description, duration } = req.body;

  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, picture_url, description, duration, updated_at: Date.now() },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: 'Cours non trouvé' });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Cours non trouvé' });
    res.status(200).json({ message: 'Cours supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
