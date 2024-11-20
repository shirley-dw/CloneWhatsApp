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
  lastMessage: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

const Contacto = mongoose.model('Contacto', ContactoSchema);

export default Contacto;
