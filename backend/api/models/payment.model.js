import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },  // Change to String to match User._id
    paymentMethod: { type: String },
    provider: { type: String },
    issueTransaction: { type: String, enum: ['subscription', 'one-time payment'], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], required: true },
    description: { type: String },
    transactionDate: { type: Date, default: Date.now },
});

const InvoiceSchema = new mongoose.Schema({
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    status: { type: String, enum: ['paid', 'unpaid', 'overdue'], default: 'unpaid' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export {Transaction, Invoice};
