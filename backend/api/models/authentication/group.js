import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    name: { 
        type: String, 
        enum: ['Student', 'Instructor', 'Employer', 'Enterprise'], 
        required: true 
    },  // Nom du groupe
    description: { type: String },  // Description du groupe
    created_at: { type: Date, default: Date.now }  // Date de création
});

const Group = mongoose.model('Group', GroupSchema);

export default Group;
