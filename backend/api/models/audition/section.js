import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true }, // Ordre de la section dans le chapitre
    contents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Section = mongoose.model('Section', SectionSchema);
  export default Section;
  