import mongoose from 'mongoose';

const LessonContentSchema = new mongoose.Schema({
    lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    type: { type: String, enum: ['text', 'video'], required: true }
});

const LessonContent = mongoose.model('LessonContent', LessonContentSchema);

export default LessonContent;
