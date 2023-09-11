import container from '../../container.js';
import productCreateValidation from '../validations/product/productCreateValidation.js';
import idValidation from '../validations/shared/idValidation.js';

class ProductManager
{
    constructor()
    {
        this.productRepository = container.resolve('ProductRepository');
    }

    async listProducts(criteria)
    {
        return this.productRepository.getProducts(criteria);
    }

    async getProductById(id)
    {
        await idValidation.parseAsync(id);
        const product = this.productRepository.getOneProductById(id);
        if (Object.keys(product).length === 0 && product.constructor === Object)
        {
            return 'Product dont exist.';
        }
        return product;
    }

    async getOneProductByCode(code)
    {
        const product = this.productRepository.getOneProductByCode(code);
        if (Object.keys(product).length === 0 && product.constructor === Object)
        {
            return 'Product dont exist.';
        }
        return product;
    }

    async addProduct(data)
    {
        await productCreateValidation.parseAsync(data);
        return this.productRepository.createProduct(data);
    }

    async updateProduct(id, data)
    {
        await idValidation.parseAsync(id);
        const product = this.productRepository.getOneProductById(id);
        if (Object.keys(product).length === 0 && product.constructor === Object)
        {
            return 'Product dont exist.';
        }
        if (data.owner !== product.owner)
        {
            throw new Error('The user is not the owner of the product.');
        }
        return this.productRepository.updateProduct(id, data);
    }

    async deleteOneProduct(id, user)
    {
        await idValidation.parseAsync(id);
        const product = this.productRepository.getOneProductById(id);
        if (Object.keys(product).length === 0 && product.constructor === Object)
        {
            return 'Product dont exist.';
        }
        if (product.enable === false)
        {
            throw new Error('Product is already removed.');
        }
        if (user !== product.owner)
        {
            throw new Error('The user is not the owner of the product.');
        }
        const productdeleted = this.productRepository.deleteProduct(id);
        delete Object.assign(productdeleted, { email: productdeleted.owner }).owner;
        const sendMailProductDeleted = await this.emailManager.send(productdeleted, 'mailProductDeletedTemplate.hbs', 'Producto eliminado');
        if (!sendMailProductDeleted)
        {
            throw new Error('Error sending mail');
        }
        return productdeleted;
    }
}
export default  ProductManager;
