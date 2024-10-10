import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
    chapter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseChapter' },
    title: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Lesson = mongoose.model('Lesson', LessonSchema);

export default Lesson;
