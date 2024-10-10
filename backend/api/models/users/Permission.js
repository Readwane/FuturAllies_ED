import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contentTypeId: { type: Number, required: true },
    codename: { type: String, required: true, unique: true }
}, { timestamps: true });

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;