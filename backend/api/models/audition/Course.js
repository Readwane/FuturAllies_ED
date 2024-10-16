import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    module_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    title: { type: String, required: true },
    picture_url: { type: String },
    description: { type: String, required: true },
    duration: { type: String, required: true }, // Durée du cours (ex: "10h", "5h30")
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
