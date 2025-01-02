import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    domain_id: { type: String },
    title: { type: String, required: true },
    icon: { type: String },
    description: { type: String, required: true },
    isPublished: { type: Boolean, default: false},
    duration: { type: String, required: true }, // Durée du cours (ex: "10h", "5h30")
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }],
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
