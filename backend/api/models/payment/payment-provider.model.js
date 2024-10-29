import mongoose from 'mongoose';

const PaymentProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    apiEndpoint: { type: String, required: true },
    credentials: { type: mongoose.Schema.Types.Mixed, required: true }, // Clés API sous forme de JSON
    fees: { type: Number, required: true }, // Pourcentage de frais par transaction
    supportedMethods: { type: [String], required: true }, // Liste des méthodes supportées
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const PaymentProvider = mongoose.model('PaymentProvider', PaymentProviderSchema);

export default PaymentProvider;
