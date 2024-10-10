import mongoose from 'mongoose';

const ContentTextSchema = new mongoose.Schema({
    content_id: { type: mongoose.Schema.Types.ObjectId, ref: 'LessonContent', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const ContentText = mongoose.model('ContentText', ContentTextSchema);

export default ContentText;
