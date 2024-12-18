import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },  // Change to String to match User._id
    paymentMethodId: { type: String },
    providerId: { type: String },
    issueTransaction: { type: String, enum: ['subscription', 'one-time payment'], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
