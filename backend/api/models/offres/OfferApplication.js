import mongoose from 'mongoose';

const offerApplicationSchema = new mongoose.Schema({
    offer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
    applicant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    application_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

const OfferApplication = mongoose.model('OfferApplication', offerApplicationSchema);
export default OfferApplication;
