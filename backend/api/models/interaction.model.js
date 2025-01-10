import mongoose from 'mongoose';

const mailSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  subject: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
}, { timestamps: true });


const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }
}, { timestamps: true });


const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });


const Mail = mongoose.models.Mail || mongoose.model('Mail', mailSchema);
const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
const Message = mongoose.models.Notification || mongoose.model('Message', messageSchema);

export {Mail, Message, Notification};