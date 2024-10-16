import CourseReview from '../../models/training/CourseReview.js';

export const getAllCourseReviews = async (req, res) => {
  try {
    const reviews = await CourseReview.find().populate('user_id').populate('course_id');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseReviewById = async (req, res) => {
  try {
    const review = await CourseReview.findById(req.params.id).populate('user_id').populate('course_id');
    if (!review) return res.status(404).json({ message: 'Avis non trouvé' });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourseReview = async (req, res) => {
  const { user_id, course_id, rating, comment } = req.body;

  if (!user_id || !course_id || rating === undefined) {
    return res.status(400).json({ message: 'Les champs user_id, course_id et rating sont requis.' });
  }

  const review = new CourseReview({ user_id, course_id, rating, comment });

  try {
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCourseReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const review = await CourseReview.findByIdAndUpdate(
      req.params.id,
      { rating, comment, review_date: Date.now() },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: 'Avis non trouvé' });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCourseReview = async (req, res) => {
  try {
    const review = await CourseReview.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Avis non trouvé' });
    res.status(200).json({ message: 'Avis supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
