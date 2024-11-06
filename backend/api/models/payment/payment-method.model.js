import mongoose from 'mongoose';

const PaymentMethodSchema = new mongoose.Schema({
    type: { type: String, enum: ['Carte Bancaire', 'Mobile Money'], required: true },
    details: { type: mongoose.Schema.Types.Mixed, required: true }, // Détails spécifiques sous forme de JSON
    isDefault: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema);

export default PaymentMethod;
