import { Router } from 'express';
import UserController from '../controllers/userController.js';
import authorization from '../middlewares/authorization.js';
import auth from '../middlewares/auth.js';
import uploadFiles from '../middlewares/uploadFiles.js';

const userRouter = Router();

userRouter.use(auth);

userRouter.get('/', authorization('getUsers'), UserController.list); // Obtiene los usuarios
userRouter.get('/:id', authorization('getUserById'), UserController.getOne); // Obtiene un usuario dado su id
userRouter.get('/', authorization('getUserByEmail'), UserController.getOneByEmail); // Obtiene un usuario dado su email
userRouter.post('/', authorization('saveUser'), UserController.save); // Crea un usuario
userRouter.put('/:id', authorization('updateUser'), UserController.update); // Actualiza algun campo/s de un usuario dado su id
userRouter.delete('/:id', authorization('deleteUser'), UserController.delete); // Elimina (bajada logica) un usuario dado su id
userRouter.put('/premium/:id', authorization('updateRoleUser'), UserController.setPremiumUser); // Actualiza el rol de un usuario dado su id
userRouter.post('/:id/documents', authorization('uploadFiles'), uploadFiles.fields(
    [
        { name: 'profiles', maxCount: 1 },
        { name: 'products', maxCount: 10 },
        { name: 'identification', maxCount: 1 },
        { name: 'adressProof', maxCount: 1 },
        { name: 'accountStateProof', maxCount: 1 }
    ]
), UserController.uploadDocuments); // Carga documentos a un usuario dado su id

export default userRouter;
