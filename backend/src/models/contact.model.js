import mongoose from 'mongoose';

const contactoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    lastMessage: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

const Contacto = mongoose.model('Contacto', contactoSchema);

export default Contacto;
