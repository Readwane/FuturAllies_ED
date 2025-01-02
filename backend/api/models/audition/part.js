import mongoose from 'mongoose';

const PartSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, required: true }, // Ordre de la partie dans le cours
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }], // Références aux chapitres
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const Part = mongoose.model('Part', PartSchema);

export default Part;
