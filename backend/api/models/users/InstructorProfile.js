import mongoose from 'mongoose';

const instructorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Lien vers l'utilisateur
  bio: { type: String },  // Biographie de l'instructeur
  expertise: { type: [String], default: [] },  // Domaines d'expertise
  coursesTaught: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],  // Liste des cours enseignés
}, { timestamps: true });

const InstructorProfile = mongoose.model('InstructorProfile', instructorProfileSchema);

export default InstructorProfile;
