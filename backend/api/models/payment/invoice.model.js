import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
    amount: { type: Number, required: true },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['paid', 'unpaid', 'overdue'], default: 'unpaid' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

export default Invoice;
