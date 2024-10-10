import mongoose from 'mongoose';

const groupPermissionSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    permissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true }
}, { timestamps: true });

const GroupPermission = mongoose.model('GroupPermission', groupPermissionSchema);

export default GroupPermission;