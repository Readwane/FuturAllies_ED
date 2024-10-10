import mongoose from 'mongoose';

const userNavigateLogSchema = new mongoose.Schema({
    userIp: { type: String, default: null },
    actionTime: { type: Date, required: true },
    userAgent: { type: String, default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentTypeId: { type: Number, default: null },
    objectId: { type: String, default: null },
    objectRepr: { type: String, required: true },
    actionFlag: { type: Number, required: true },
    changeMessage: { type: String, required: true }
}, { timestamps: true });

const UserNavigateLog = mongoose.model('UserNavigateLog', userNavigateLogSchema);

export default UserNavigateLog;