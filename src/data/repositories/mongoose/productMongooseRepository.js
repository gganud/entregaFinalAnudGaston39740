import productSchema from '../../models/mongoose/productsSchema.js';
import Product from '../../../domain/entities/product.js';
class ProductMongooseRepository
{
    productInfo(productDocument)
{
        return {
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            price: productDocument.price,
            thumbnail: productDocument.thumbnail,
            code: productDocument.code,
            stock: productDocument.stock,
            owner: productDocument.owner,
            enable: productDocument.enable
        };
    }
    async getProducts(criteria)
{
        const { limit, page, inStock, sort } = criteria;
        const productDocuments = limit == undefined
        ? await productSchema.paginate({ enable: inStock }, { page, sort: { price: sort } })
        : await productSchema.paginate({ enable: inStock }, { limit, page, sort: { price: sort } });

        const { docs, ...pagination } = productDocuments;
        const products = docs.map(document => new Product(
            this.productInfo(document)
        ));
        return {
            products,
            pagination
        };
    }

    async getOneProductById(id)
{
        const productDocument = await productSchema.findOne({ _id: id });
        if (!productDocument)
{ // QUITAR DEL DAO Prueba!!
            return false;
        }
        return new Product(this.productInfo(productDocument));
    }

    async getOneProductByCode(code)
{
        const productDocument = await productSchema.findOne({ code });
        if (!productDocument)
{ // QUITAR DEL DAO
            throw new Error('Product dont exist.');
        }
        return new Product(this.productInfo(productDocument));
    }

    async createProduct(data)
{
        const productDocument = await productSchema.create(data);
        return new Product(this.productInfo(productDocument));
    }

    async updateProduct(id, data)
{
        const productDocument = await productSchema.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!productDocument)
{ // QUITAR DEL DAO
            throw new Error('Product dont exist.');
        }
        return new Product(this.productInfo(productDocument));
    }

    async deleteProduct(id)
{
        const productDocument = await productSchema.findOneAndUpdate({ _id: id }, { enable: false });
        if (!productDocument)
{ // QUITAR DEL DAO
            throw new Error('Product dont exist.');
        }
        if (productDocument.enable === false)
{
            throw new Error('Product is already removed.');
        }
        return new Product(this.productInfo(productDocument));
    }
}
export default ProductMongooseRepository;
