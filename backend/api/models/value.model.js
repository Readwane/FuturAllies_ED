import mongoose from 'mongoose';

const ValueSchema = new mongoose.Schema({
  title: {type: String,required: true},
  description: {type: String,required: true},
  icon: {type: String},
  createdAt: { type: Date, default: Date.now },  // Date de création de l'utilisateur  
  updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour  
});

const Value = mongoose.models.Value || mongoose.model('Value', ValueSchema);

export {Value};



