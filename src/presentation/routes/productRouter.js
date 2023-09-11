import { Router } from 'express';
import ProductController from '../controllers/productController.js';
import auth from  '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const productRouter = Router();

productRouter.get('/', ProductController.listProducts); // Obtiene los productos
productRouter.get('/:id', ProductController.getProductById); // Obtiene un producto por id
productRouter.post('/', auth, authorization('createProduct'), ProductController.save); // Crea un producto
productRouter.put('/:id', auth, authorization('updateProduct'), ProductController.update); // Edita algun campo/s de un producto dado su id
productRouter.delete('/:id', auth, authorization('deleteProduct'), ProductController.delete); // Elimina (bajada logica) un producto dado su id

export default productRouter;
