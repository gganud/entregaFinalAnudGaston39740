import CartManager from '../../domain/managers/cartManager.js';
import ProductManager from '../../domain/managers/productManager.js';
import TicketManager from '../../domain/managers/ticketManager.js';
class CartController
{
    static getOneCart = async(req, res, next) =>
{
        try
{
            const { userId } = req.params;
            const cartManager = new CartManager();
            const cart = await cartManager.getCart(userId);
            res.status(200).send({ status: 'success', payload: cart, message: 'Cart found.' });
        }
        catch (e)
{
            next(e);
        }
    };

    static saveCart = async(req, res, next) =>
{
        try
{
            const cartManager = new CartManager();
            const cartAdded = await cartManager.addCart(req.body);
            res.status(201).send({ status: 'success', payload: cartAdded, message: 'Cart created.' });
        }
        catch (e)
{
            next(e);
        }
    };

    static addProduct = async(req, res, next) =>
{
        try
{
            const { cid, pid } = req.params;
            const productManager = new ProductManager();
            const cartManager = new CartManager();
            const searchProduct = await productManager.getProductById(pid);
            const productAdded = await cartManager.addToCart(cid, searchProduct.id.toString(), req.user);
            res.status(201).send({ status: 'success', payload: productAdded, message: 'Product added.' });
        }
        catch (e)
{
            next(e);
        }
    };

    static deleteProduct = async(req, res, next) =>
{
        try
{
            const { cid, pid } = req.params;
            const productManager = new ProductManager();
            const cartManager = new CartManager();
            const searchProduct = await productManager.getProductById(pid);
            const productDeleted = await cartManager.deleteProduct(cid, searchProduct.id);
            res.status(201).send({ status: 'success', payload: productDeleted, message: 'Product deleted.' });
        }
        catch (e)
{
            next(e);
        }
    };

    static deleteProducts = async(req, res, next) =>
{
        try
{
            const { cid } = req.params;
            const cartManager = new CartManager();
            const cartCleared = await cartManager.deleteProducts(cid);
            res.status(201).send({ status: 'success', payload: cartCleared, message: 'Cart empty.' });
        }
        catch (e)
{
            next(e);
        }
    };

    static updateProduct = async(req, res, next) =>
{
        try
{
            const { cid, pid } = req.params;
            const data = req.body;
            const productManager = new ProductManager();
            const cartManager = new CartManager();
            const searchProduct = await productManager.getProductById(pid);
            const productUpdated = await cartManager.updateProduct(data.quantity, cid, searchProduct.id);
            res.status(201).send({ status: 'success', payload: productUpdated, message: 'Product updated.' });
        }
        catch (e)
{
            next(e);
        }
    };

    static updateCart = async(req, res, next) =>
{
        try
{
            const { cid } = req.params;
            const products = req.body;
            const cartManager = new CartManager();
            const cartUpdated = await cartManager.updateCart(products, cid);
            res.status(201).send({ status: 'success', payload: cartUpdated, message: 'Cart updated.' });
        }
        catch (e)
{
            next(e);
        }
    };

    static checkout = async(req, res, next) =>
{
        try
        {
          const { cid } = req.params;
          const cartManager = new CartManager();
          const productsOrder = await cartManager.productsInCart(cid);
          const ticketManager = new TicketManager();
          const ticketOrder = await ticketManager.create(productsOrder);
          res.status(200).send({ status: 'success', payload: ticketOrder, message: 'Orden de compra finalizada.' });
        }
        catch (e)
        {
          next(e);
        }
      };
}
export default CartController;
