import mongoose from 'mongoose';

const learningPathSchema = new mongoose.Schema({
  domain_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Domain', // Référence au modèle Domain
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  picture_url: {
    type: String,
    default: null, // Optionnel
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  certification_level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
}, { collection: 'learningPaths' }); // Spécifier le nom de la collection ici

// Mise à jour de 'updated_at' avant chaque sauvegarde
learningPathSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const LearningPath = mongoose.model('LearningPath', learningPathSchema);

export default LearningPath;
