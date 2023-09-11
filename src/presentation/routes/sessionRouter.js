import { Router } from 'express';
import SessionController from '../controllers/sessionController.js';
import auth from '../middlewares/auth.js';

const sessionRouter = Router();

sessionRouter.post('/login', SessionController.login); // Se loguea el usuario
sessionRouter.get('/current', auth, SessionController.current); // Se obtiene la informacion del usuario a partir del token
sessionRouter.post('/signup', SessionController.signup); // Se registra el usuario
sessionRouter.post('/logout', auth, SessionController.logout); // Se desloguea el usuario
sessionRouter.post('/forgotPassword', SessionController.forgotPasswordMail); // Se envia el mail con token para reiniciar contraseña
sessionRouter.get('/resetPassword', SessionController.forgotPasswordView); // Vista para ingresar nueva contraseña
sessionRouter.post('/newPassword', SessionController.forgotNewPassword); // Se actualiza la contraseña del usuario
sessionRouter.get('/changePassword', SessionController.changePasswordView); // Vista para cambiar contraseña a partir de token del usuario
sessionRouter.post('/changeNewPassword', SessionController.changePassword); // Se actualiza la contraseña del usuario.

export default sessionRouter;
