import mongoose from 'mongoose';

const PathSchema = new mongoose.Schema({
    domain_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain', required: true },
    title: { type: String, required: true },
    picture_url: { type: String },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Path = mongoose.model('Path', PathSchema);

export default Path;
