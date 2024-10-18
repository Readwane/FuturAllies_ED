import mongoose from 'mongoose';

const webinarSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: null },
    speaker: { type: String, required: true },
    speakerPicture_url: { type: String, default: null },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    registrationDeadline: { type: Date, default: null },
    webinarUrl: { type: String, default: null },
    maxParticipants: { type: Number, required: true },
    isPaid: { type: Boolean, required: true },
    price: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
    type: { type: String, enum: ['FuturAllies', 'Café des allies'], required: true }
}, { timestamps: true });

const Webinar = mongoose.model('Webinar', webinarSchema);

export default Webinar;
