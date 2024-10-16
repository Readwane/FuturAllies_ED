import mongoose from 'mongoose';

const ContentTextSchema = new mongoose.Schema({
    content_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    type: { type: String, enum: ['text'], default: 'text' },
    content: [{ type: String, required: true }], // Contenu textuel sous forme de tableau de chaînes de caractères
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const ContentText = mongoose.model('ContentText', ContentTextSchema);

export default ContentText;
