import mongoose from 'mongoose';

const ContentVideoSchema = new mongoose.Schema({
    content_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    type: { type: String, enum: ['video'], default: 'video' },
    content_url: { type: String, required: true }, // URL de la vidéo
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const ContentVideo = mongoose.model('ContentVideo', ContentVideoSchema);

export default ContentVideo;
