import mongoose from 'mongoose';

const DomainSchema = new mongoose.Schema({
    title: { type: String, required: true },
    picture_url: { type: String },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Domain = mongoose.model('Domain', DomainSchema);

export default Domain;
