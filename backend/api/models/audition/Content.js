import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true }, // Identifiant du chapitre associé
    type: { type: String, enum: ['text', 'video', 'image'], required: true },
    content: [{ type: String }], // Pour `ContentText`, une liste de chaînes de caractères (textes)
    contentUrl: { type: String }, // Pour `ContentVideo`, URL de la vidéo
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Content = mongoose.model('Content', ContentSchema);

export default Content;
