import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true, unique: true },
    salary_range: { type: String },
    type: { type: String, enum: ['full_time', 'part_time'], required: true },
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
