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
        return this.cartRepository.getOneCart(userId);
    }

    async addCart(cart)
    {
        return this.cartRepository.createCart(cart);
    }

    async addToCart(idC, idP, user)
    {
        await idValidation.parseAsync(idC, idP);
        const productInDb = await this.productManager.getProductById(idP);
        if (user.email == productInDb.owner)
        {
            throw new Error('El producto pertenece al usuario.');
        }
        return this.cartRepository.addProductToCart(idC, idP);
    }

    async deleteProducts(idC)
    {
        await idValidation.parseAsync(idC);
        return this.cartRepository.deleteProducts(idC);
    }

    async deleteProduct(idC, idP)
    {
        await idValidation.parseAsync(idC, idP);
        return this.cartRepository.deleteProduct(idC, idP);
    }

    async updateProduct(quantity, idC, idP)
    {
        await quantityValidation.parseAsync({ quantity });
        await idValidation.parseAsync(idC, idP);
        return this.cartRepository.updateProduct(quantity, idC, idP);
    }

    async updateCart(products, idC)
    {
        await idValidation.parseAsync(idC);
        return this.cartRepository.updateProducts(products, idC);
    }

    async productsInCart(idC)
    {
        await idValidation.parseAsync(idC);
        return await this.cartRepository.productsInCart(idC);
    }
}

export default  CartManager;
