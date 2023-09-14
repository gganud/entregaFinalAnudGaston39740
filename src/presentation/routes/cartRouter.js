import { Router } from 'express';
import CartController from '../controllers/cartController.js';
import auth from  '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const cartRouter = Router();

cartRouter.use(auth);

cartRouter.post('/', authorization('createCart'), CartController.saveCart); // Crea un carrito
cartRouter.get('/:userId', authorization('getCartByUserId'), CartController.getOneCart); // Obtiene un carrito a partir del id del usuario
cartRouter.post('/:cid/product/:pid', authorization('addProductByCartId'), CartController.addProduct); // Agrega un producto al carrito
cartRouter.put('/:cid/product/:pid', authorization('updateProductByCartId'), CartController.updateProduct); // Actualiza la cantidad del producto en un carrito
cartRouter.delete('/:cid/product/:pid', authorization('deleteProductInCart'), CartController.deleteProduct); // Elimina un producto del carrito
cartRouter.put('/:cid', authorization('updateCart'), CartController.updateCart); // Actualiza todo el carrito
cartRouter.delete('/:cid', authorization('deleteCart'), CartController.deleteProducts); // Borra todos los productos de un carrito
cartRouter.post('/:cid/purchase', authorization('checkout'), CartController.checkout); // Finalizar orden de compra

export default cartRouter;
