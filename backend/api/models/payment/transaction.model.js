import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethodId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
    providerReference: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
