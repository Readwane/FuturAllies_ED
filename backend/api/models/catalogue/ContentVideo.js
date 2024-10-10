import mongoose from 'mongoose';

const ContentVideoSchema = new mongoose.Schema({
    content_id: { type: mongoose.Schema.Types.ObjectId, ref: 'LessonContent', required: true },
    content_url: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const ContentVideo = mongoose.model('ContentVideo', ContentVideoSchema);

export default ContentVideo;
