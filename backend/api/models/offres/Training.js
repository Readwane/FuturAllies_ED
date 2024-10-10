import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema({
    domain_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain' },
    offer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
    title: { type: String, required: true },
    type: { type: String, enum: ['presentiel', 'webinaire'], required: true },
    categorie: { type: String, enum: ['Futur-Allies', 'Café-Allies', 'Pack-Entreprise'], required: true },
    picture_url: { type: String },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    nb_modules: { type: Number, required: true },
    location: { type: String, required: true },
    price: { type: Number, default: 0.00 },
    language: { type: String, default: 'French' },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    max_participants: { type: Number },
    start_date: { type: Date },
    end_date: { type: Date },
    is_certifiable: { type: Boolean, default: false },
    is_free: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Training = mongoose.model('Training', trainingSchema);
export default Training;
