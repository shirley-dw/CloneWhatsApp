import express from 'express';
import { loginController, registerController, verifyEmailController, forgotPasswordController, recoveryPasswordController } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.put('/reset-password', recoveryPasswordController); 
authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.get('/verify-email/:validation_token', verifyEmailController);
authRouter.post('/forgot-password', forgotPasswordController);

export default authRouter;
