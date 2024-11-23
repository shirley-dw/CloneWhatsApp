import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contacto',
    required: true
  },
  destinatario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contacto',
    required: true
  },
  text: {
    type: String,
    enum: ['enviado', 'recibido', 'leido'],
    default: 'enviado'
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
