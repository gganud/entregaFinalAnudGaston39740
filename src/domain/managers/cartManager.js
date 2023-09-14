import container from '../../container.js';
import idValidation from '../validations/shared/idValidation.js';
import quantityValidation from '../validations/cart/quantityValidation.js';
import ProductManager from './productManager.js';

class CartManager
{
    constructor()
    {
        this.cartRepository = container.resolve('CartRepository');
        this.productManager = new ProductManager();
    }

    async getCart(userId)
    {
        await idValidation.parseAsync(userId);
        const cart = this.cartRepository.getOneCart(userId);
        if (Object.keys(cart).length === 0 && cart.constructor === Object)
        {
            throw new Error ('Cart dont exist.');
        }
        return cart;
    }

    async addCart(cart)
    {
        return this.cartRepository.createCart(cart);
    }

    async addToCart(idC, idP, user)
    {
        await idValidation.parseAsync(idC);
        await idValidation.parseAsync(idP);
        const productInDb = await this.productManager.getProductById(idP);
        if (user.email == productInDb.owner)
        {
            throw new Error('El producto pertenece al usuario.');
        }
        const cart =  await this.cartRepository.addProductToCart(idC, idP);
        if (Object.keys(cart).length === 0 && cart.constructor === Object)
        {
            throw new Error ('Cart dont exist.');
        }
        return cart;
    }

    async deleteProducts(idC)
    {
        await idValidation.parseAsync(idC);
        const cart = this.cartRepository.deleteProducts(idC);
        if (Object.keys(cart).length === 0 && cart.constructor === Object)
        {
            throw new Error ('Cart dont exist.');
        }
        return cart;
    }

    async deleteProduct(idC, idP)
    {
        await idValidation.parseAsync(idC, idP);
        const cart = this.cartRepository.deleteProduct(idC, idP);
        if (Object.keys(cart).length === 0 && cart.constructor === Object)
        {
            throw new Error ('Cart dont exist.');
        }
        return cart;
    }

    async updateProduct(quantity, idC, idP)
    {
        await quantityValidation.parseAsync({ quantity });
        await idValidation.parseAsync(idC, idP);
        const cart = this.cartRepository.updateProduct(quantity, idC, idP);
        if (Object.keys(cart).length === 0 && cart.constructor === Object)
        {
            throw new Error ('Cart dont exist.');
        }
        return cart;
    }

    async updateCart(products, idC)
    {
        await idValidation.parseAsync(idC);
        const cart = this.cartRepository.updateProducts(products, idC);
        if (Object.keys(cart).length === 0 && cart.constructor === Object)
        {
            throw new Error ('Cart dont exist.');
        }
        return cart;
    }

    async productsInCart(idC)
    {
        await idValidation.parseAsync(idC);
        const cart = this.cartRepository.productsInCart(idC);
        if (Object.keys(cart).length === 0 && cart.constructor === Object)
        {
            throw new Error ('Cart dont exist.');
        }
        return cart;
    }
}

export default  CartManager;
