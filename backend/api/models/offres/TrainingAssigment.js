import mongoose from 'mongoose';

const trainerAssignmentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    entity_type: { type: String, enum: ['training', 'course'], required: true },
    training_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Training' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    assigned_at: { type: Date, default: Date.now },
}, { _id: false });

trainerAssignmentSchema.index({ user_id: 1, training_id: 1, course_id: 1 }, { unique: true });

const TrainerAssignment = mongoose.model('TrainerAssignment', trainerAssignmentSchema);
export default TrainerAssignment;
