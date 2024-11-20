import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: { 
        type: String
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    },
    profilePicture: {
        type: String,
        default: null
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['online', 'Desconectado'],
        default: 'Desconectado'
    }
});

const User = mongoose.model('User', userSchema);

export default User;
