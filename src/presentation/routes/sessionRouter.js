import { Router } from 'express';
import SessionController from '../controllers/sessionController.js';
import auth from '../middlewares/auth.js';

const sessionRouter = Router();

sessionRouter.post('/login', SessionController.login);
sessionRouter.get('/current', auth, SessionController.current);
sessionRouter.post('/signup', SessionController.signup);
sessionRouter.post('/logout', auth, SessionController.logout);
sessionRouter.post('/forgotPassword', SessionController.forgotPasswordMail);
sessionRouter.get('/resetPassword/:token/:email', SessionController.forgotPasswordView);
sessionRouter.post('/newPassword', SessionController.forgotNewPassword);
sessionRouter.post('/changePassword', auth, SessionController.changePassword);

export default sessionRouter;
