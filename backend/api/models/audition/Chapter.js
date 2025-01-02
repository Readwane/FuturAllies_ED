import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema({
    partId: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, required: true }, // Ordre du chapitre dans la partie
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }], // Références aux sections
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Chapter = mongoose.model('Chapter', ChapterSchema);

export default Chapter;
