import mongoose from 'mongoose';

const userGroupSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true }
}, { timestamps: true });

const UserGroup = mongoose.model('UserGroup', userGroupSchema);

export default UserGroup;