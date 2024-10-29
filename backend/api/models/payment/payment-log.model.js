import mongoose from 'mongoose';

const PaymentLogSchema = new mongoose.Schema({
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    message: { type: String, required: true },
    logType: { type: String, enum: ['info', 'error'], required: true },
    created_at: { type: Date, default: Date.now }
});

const PaymentLog = mongoose.model('PaymentLog', PaymentLogSchema);

export default PaymentLog;
