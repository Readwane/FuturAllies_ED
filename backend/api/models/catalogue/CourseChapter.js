import mongoose from 'mongoose';

const CourseChapterSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, required: true },
    nb_lessons: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const CourseChapter = mongoose.model('CourseChapter', CourseChapterSchema);

export default CourseChapter;
