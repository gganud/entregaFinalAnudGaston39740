import { Router } from 'express';
import RoleController from '../controllers/roleController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const roleRouter = Router();

roleRouter.use(auth);

roleRouter.get('/', authorization('getRoles'), RoleController.list);
roleRouter.get('/:id', authorization('getRole'), RoleController.getOne);
roleRouter.post('/', authorization('saveRole'), RoleController.save);
roleRouter.put('/:id', authorization('updateRole'), RoleController.update);
roleRouter.delete('/:id', authorization('deleteRole'), RoleController.deleteOne);

export default roleRouter;
