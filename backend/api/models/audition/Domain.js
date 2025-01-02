import mongoose from 'mongoose';

const DomainSchema = new mongoose.Schema({
    title: { type: String, required: true },
    pictureUrl: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Domain = mongoose.model('Domain', DomainSchema);

export default Domain;
