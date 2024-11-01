import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethodId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentProvider', required: true },
    issueTransaction:  { type: String, enum: ['subscription', 'one-time payment'], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;