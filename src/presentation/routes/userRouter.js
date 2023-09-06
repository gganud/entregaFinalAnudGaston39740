import { Router } from 'express';
import UserController from '../controllers/userController.js';
import authorization from '../middlewares/authorization.js';
import auth from '../middlewares/auth.js';
import uploadFiles from '../middlewares/uploadFiles.js';

const userRouter = Router();

userRouter.use(auth);

userRouter.get('/', authorization('getUsers'), UserController.list);
userRouter.get('/:id', authorization('getUseById'), UserController.getOne);
userRouter.get('/', authorization('getUserByEmail'), UserController.getOneByEmail);
userRouter.post('/', authorization('saveUser'), UserController.save);
userRouter.put('/:id', authorization('updateUser'), UserController.update);
userRouter.delete('/:id', authorization('deleteUser'), UserController.delete);
userRouter.put('/premium/:id', authorization('updateRoleUser'), UserController.setPremiumUser);
userRouter.post('/:id/documents', authorization('uploadFiles'), uploadFiles.fields(
    [
        { name: 'profiles', maxCount: 1 },
        { name: 'products', maxCount: 10 },
        { name: 'identification', maxCount: 1 },
        { name: 'adressProof', maxCount: 1 },
        { name: 'accountStateProof', maxCount: 1 }
    ]
), UserController.uploadDocuments);

export default userRouter;
