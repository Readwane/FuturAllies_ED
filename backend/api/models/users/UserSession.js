import mongoose from 'mongoose';

const userSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    sessionKey: { type: String, required: true, unique: true },
    sessionData: { type: String, required: true },
    expireDate: { type: Date, required: true }
}, { timestamps: true });

const UserSession = mongoose.model('UserSession', userSessionSchema);

export default UserSession;