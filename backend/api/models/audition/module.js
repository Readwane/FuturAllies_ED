import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    path_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Path', required: true },
    picture_url: { type: String },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Module = mongoose.model('Module', ModuleSchema);

export default Module;
