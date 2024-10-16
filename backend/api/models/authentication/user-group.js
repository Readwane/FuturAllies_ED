import mongoose from 'mongoose';

const UserGroupSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Référence vers l'utilisateur
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },  // Référence vers le groupe
    created_at: { type: Date, default: Date.now }  // Date de création de l'association
});

const UserGroup = mongoose.model('UserGroup', UserGroupSchema);

export default UserGroup;
