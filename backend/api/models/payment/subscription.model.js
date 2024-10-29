import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['Freemium', 'Premium'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'expired', 'canceled'], default: 'active' },
    recurring: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;
