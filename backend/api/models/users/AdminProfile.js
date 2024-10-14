import mongoose from 'mongoose';

const adminProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Lien vers l'utilisateur
  permissions: { type: [String], default: [] },  // Liste des permissions administratives
}, { timestamps: true });

const AdminProfile = mongoose.model('AdminProfile', adminProfileSchema);

export default AdminProfile;
