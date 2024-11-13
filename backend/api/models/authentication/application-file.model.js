import mongoose from 'mongoose';

const ApplicationFileSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'OfferApplication', required: true }, // Référence à la candidature
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true }, // Référence à l'ID du fichier
  type: { type: String, enum: ['CV', 'ML', 'CERTIFICAT', 'OTHER'], required: true }, // Type de fichier dans le cadre de l'application
}, { timestamps: true });

const ApplicationFile = mongoose.model('ApplicationFile', ApplicationFileSchema);

export default ApplicationFile;
