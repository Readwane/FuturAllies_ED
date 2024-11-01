import mongoose from 'mongoose';

const PaymentProviderTransactionSchema = new mongoose.Schema({
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentProvider', required: true },
    created_at: { type: Date, default: Date.now }
});

const PaymentProviderTransaction = mongoose.model('PaymentProviderTransaction', PaymentProviderTransactionSchema);

export default PaymentProviderTransaction;
