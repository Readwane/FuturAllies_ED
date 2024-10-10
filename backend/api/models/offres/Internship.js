import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true, unique: true },
    duration: { type: String },
    compensation: { type: Boolean, default: false },
});

const Internship = mongoose.model('Internship', internshipSchema);
export default Internship;
