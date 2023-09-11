import { Router } from 'express';
import RoleController from '../controllers/roleController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const roleRouter = Router();

roleRouter.use(auth);

roleRouter.get('/', authorization('readRoles'), RoleController.list); // Obtiene los roles de los usuarios
roleRouter.get('/:id', authorization('readRole'), RoleController.getOne); // Obtiene un rol dado su id
roleRouter.post('/', authorization('saveRole'), RoleController.save); // Crea un rol
roleRouter.put('/:id', authorization('updateRole'), RoleController.update); // Actualiza algun campo/campos de un rol dado su id
roleRouter.delete('/:id', authorization('deleteRole'), RoleController.deleteOne); // Elimina un rol (bajada logica) dado su id

export default roleRouter;
