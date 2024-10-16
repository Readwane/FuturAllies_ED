import mongoose from 'mongoose';

const CourseReviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Identifiant de l'utilisateur
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Identifiant du cours
    rating: { type: Number, required: true }, // Note de l'utilisateur (ex: de 1 à 5)
    comment: { type: String }, // Commentaire de l'utilisateur
    review_date: { type: Date, default: Date.now } // Date de l'avis
});

const CourseReview = mongoose.model('CourseReview', CourseReviewSchema);

export default CourseReview;
