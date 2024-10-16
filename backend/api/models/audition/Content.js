import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
    chapter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true }, // Identifiant du chapitre associé
    type: { type: String, enum: ['text', 'video'], required: true },
    content: [{ type: String }], // Pour `ContentText`, une liste de chaînes de caractères (textes)
    content_url: { type: String }, // Pour `ContentVideo`, URL de la vidéo
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Content = mongoose.model('Content', ContentSchema);

export default Content;
