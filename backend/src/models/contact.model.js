import mongoose from 'mongoose';

const ContactoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  text: {
    type: String,
    ref: 'Message',
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
  fecha_actualizacion: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['En linea', 'Desconectado'],
    default: 'En linea'
  },
  messageTime:
  {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Contacto = mongoose.model('Contacto', ContactoSchema);

export default Contacto;
