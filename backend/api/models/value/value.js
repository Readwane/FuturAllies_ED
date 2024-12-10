import mongoose from 'mongoose';

const ValueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon_url: {
    type: String,
    required: true, // URL ou nom de l'icône à afficher sur le frontend
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Value = mongoose.model('Value', ValueSchema);

export default Value;



