import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    status: { type: String, enum: ['paid', 'unpaid', 'overdue'], default: 'unpaid' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

export default Invoice;
