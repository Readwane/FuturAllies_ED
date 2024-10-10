import mongoose from 'mongoose';

const userPermissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    permissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true }
}, { timestamps: true });

const UserPermission = mongoose.model('UserPermission', userPermissionSchema);

export default UserPermission;