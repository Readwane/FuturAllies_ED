import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    password: { type: String, required: true },
    lastLogin: { type: Date, default: null },
    isSuperuser: { type: Boolean, required: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    profileType: { type: String, enum: ['freemium', 'premium'], default: 'freemium' },
    avatarUrl: { type: String, default: null },
    preferredLanguage: { type: String, default: 'fr' },
    isStaff: { type: Boolean, required: true },
    isActive: { type: Boolean, required: true },
    dateJoined: { type: Date, default: Date.now }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;