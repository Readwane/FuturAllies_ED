import mongoose from 'mongoose';

const webinarEnrollmentSchema = new mongoose.Schema({
    webinarId: { type: String, required: true }, // Identifiant du webinaire associé
    fullName: { type: String, required: true }, // Nom complet de l'inscrit
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Invalid email address'] }, // Email unique avec validation
    registrationDate: { type: Date, default: Date.now }, // Date d'inscription par défaut
    hasAcceptedTerms: { type: Boolean, required: true }, // Acceptation des conditions générales
    paymentStatus: { type: String, enum: ['paid', 'pending', 'free'], default: 'free' }, // Statut de paiement
    paymentMethod: { type: String, enum: ['creditCard', 'orangeMoney', 'moovMoney', 'sankMoney'], default: null }, // Méthode de paiement
    isConfirmed: { type: Boolean, required: true, default: false }, // Indique si l'inscription est confirmée
}, { timestamps: true }); // Ajoute les champs createdAt et updatedAt

const WebinarEnrollment = mongoose.model('WebinarEnrollment', webinarEnrollmentSchema);

export default WebinarEnrollment;
