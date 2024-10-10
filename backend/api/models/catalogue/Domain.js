import mongoose from 'mongoose';

const domainSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  picture_url: {
    type: String,
    default: null, // Optionnel
  },
  description: {
    type: String,
    default: null, // Optionnel
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    // Mise à jour automatique
  },
});

// Mise à jour de 'updated_at' avant chaque sauvegarde
domainSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Domain = mongoose.model('Domain', domainSchema);

export default Domain;
