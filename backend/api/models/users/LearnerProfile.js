import mongoose from 'mongoose';
import Course from './course.model';  // Assurez-vous que le modèle Course existe

const userLearnerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Lien vers l'
  ProfileType: { type: String, enum: ['freemium', 'premium'], default: 'freemium' },
  coursesEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],  // Liste des cours auxquels il est inscrit
  interests: { type: [String], default: [] },  // Centres d'intérêt ou domaines d'études préférés
  bookmarks: { type: [String], default: [] },  // Cours marqués comme favoris
  activityLog: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserActivityLog' }],  // Historique des activités
}, { timestamps: true });

const UserLearnerProfile = mongoose.model('UserLearnerProfile', userLearnerProfileSchema);

export default UserLearnerProfile;
