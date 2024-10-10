import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String, default: null },
    location: { type: String, default: null },
    birthdate: { type: Date, default: null },
    phone: { type: String, default: null }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;