import express from 'express';
import {
    loginController,
    registerController,
    verifyEmailController,
    forgotPasswordController,
    recoveryPasswordController
} from '../controllers/auth.controller.js';
import {
    createContactController,
    getAllContactsController,
    getContactByIdController,
    updateContactController,
    deleteContactController
} from '../controllers/contact.controller.js';
import {
    createMessageController,
    getAllMessagesController,
    getMessageByIdController,
    updateMessageController,
    deleteMessageController

} from '../controllers/message.controller.js';

import { logoutController } from '../controllers/auth.controller.js';

const router = express.Router();

// Rutas de autenticación
router.put('/reset-password', recoveryPasswordController);
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/verify-email/:validation_token', verifyEmailController);
router.post('/forgot-password', forgotPasswordController);

// Rutas de contactos
router.post('/contacts', createContactController);
router.get('/contacts', getAllContactsController);
router.get('/contacts/:id', getContactByIdController);
router.put('/contacts/:id', updateContactController);
router.delete('/contacts/:id', deleteContactController);

// Rutas de mensajes
router.post('/messages', createMessageController);
router.get('/messages', getAllMessagesController);
router.get('/messages/:id', getMessageByIdController);
router.put('/messages/:id', updateMessageController);
router.delete('/messages/:id', deleteMessageController);
router.get('/users/:id/messages', getMessageByIdController);

//Ruta de cerrar sesion
router.post('/logout', logoutController);

export default router;

