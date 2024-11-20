import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['sent', 'received', 'read'],
    default: 'sent'
  },
  day: {
    type: String,
    required: true
  },
  hour: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
