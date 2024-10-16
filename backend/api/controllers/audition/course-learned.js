import CourseLearned from '../../models/audition/course-learned.js';

export const getAllCoursesLearned = async (req, res) => {
  try {
    const coursesLearned = await CourseLearned.find().populate('user_id').populate('course_id');
    res.status(200).json(coursesLearned);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseLearnedById = async (req, res) => {
  try {
    const courseLearned = await CourseLearned.findById(req.params.id).populate('user_id').populate('course_id');
    if (!courseLearned) return res.status(404).json({ message: 'Cours appris non trouvé' });
    res.status(200).json(courseLearned);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createCourseLearned = async (req, res) => {
  const { user_id, course_id, started_at, completed_at, progress } = req.body;

  if (!user_id || !course_id) {
    return res.status(400).json({ message: 'Les champs user_id et course_id sont requis.' });
  }

  const courseLearned = new CourseLearned({ user_id, course_id, started_at, completed_at, progress });

  try {
    await courseLearned.save();
    res.status(201).json(courseLearned);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCourseLearned = async (req, res) => {
  const { completed_at, progress } = req.body;

  try {
    const courseLearned = await CourseLearned.findByIdAndUpdate(
      req.params.id,
      { completed_at, progress, updated_at: Date.now() },
      { new: true }
    );
    if (!courseLearned) return res.status(404).json({ message: 'Cours appris non trouvé' });
    res.status(200).json(courseLearned);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCourseLearned = async (req, res) => {
  try {
    const courseLearned = await CourseLearned.findByIdAndDelete(req.params.id);
    if (!courseLearned) return res.status(404).json({ message: 'Cours appris non trouvé' });
    res.status(200).json({ message: 'Cours appris supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
