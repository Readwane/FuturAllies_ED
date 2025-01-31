import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  gridFSId: { type: mongoose.Schema.Types.ObjectId, required: true },
  fileSize: { type: Number, required: true },
}, { timestamps: true });

const UserFileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
  purpose: { type: String, enum: ['CV', 'ML', 'ATTESTATION', 'CERTIFICATION', 'OTHER'], required: true },
}, { timestamps: true });

const CandidacyFileSchema = new mongoose.Schema({
  candidatId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
  purposeId: { type: String },
  purposeType: { type: String, enum: ['Training', 'Job', 'Internship'], required: true },
}, { timestamps: true });

const CandidacyFile = mongoose.models.CandidacyFile || mongoose.model('CandidacyFile', CandidacyFileSchema);
const UserFile = mongoose.models.UserFile || mongoose.model('UserProfileFile', UserFileSchema);
const File = mongoose.models.File || mongoose.model('File', FileSchema);

export { File, UserFile, CandidacyFile };