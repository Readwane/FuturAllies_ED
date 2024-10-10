import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    bg_imgUrl: { type: String },
    requirements: { type: String, required: true },
    location: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    offerer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    enrollment_deadline: { type: Date },
    type: { type: String, enum: ['job', 'internship', 'training'], required: true }
});

const Offer = mongoose.model('Offer', OfferSchema);
export default Offer;
