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

export default router;
