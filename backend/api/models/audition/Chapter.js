import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema({
    part_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true }, // Identifiant de la partie associée
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Chapter = mongoose.model('Chapter', ChapterSchema);

export default Chapter;
