import container from '../../container.js';
import productCreateValidation from '../validations/product/productCreateValidation.js';
import productUpdateValidation from '../validations/product/productUpdateValidation.js';
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
        const product = await this.productRepository.getOneProductById(id);
        if (product === false)
{
            throw new Error('Product dont exist.');
        }
        return product;
    }
    async getOneProductByCode(code)
{
        return this.productRepository.getOneProductByCode(code);
    }
    async addProduct(data)
{
        await productCreateValidation.parseAsync(data);
        return this.productRepository.createProduct(data);
    }
    async updateProduct(id, data)
    {
        await idValidation.parseAsync(id);
        const product = await this.productRepository.getOneProductById(id);
        if (data.owner == product.owner)
        {
            return this.productRepository.updateProduct(id, data);
        }
    }

    async deleteOneProduct(id, user)
{
        await idValidation.parseAsync(id);
        const product = await this.productRepository.getOneProductById(id);
        if (user == product.owner)
        {
            return this.productRepository.deleteProduct(id);
        }
    }
}
export default  ProductManager;
