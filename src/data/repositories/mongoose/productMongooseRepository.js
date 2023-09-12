import productSchema from '../../models/mongoose/productsSchema.js';
import Product from '../../../domain/entities/product.js';
class ProductMongooseRepository
{
    #productInfo(data)
    {
        const emptyDocument = {};
        if (!data)
        {
            return emptyDocument;
        }
        const document = {
            id: data._id,
            title: data.title,
            description: data.description,
            price: data.price,
            thumbnail: data.thumbnail,
            code: data.code,
            stock: data.stock,
            owner: data.owner,
            enable: data.enable
        };
        if (Array.isArray(data))
        {
            return data.map(document => new Product(document));
        }
        return new Product (document);
    }

    async getProducts(criteria)
    {
        const { limit, page, inStock, sort, title } = criteria;
        let paginateQuery;
        if (inStock)
        {
            paginateQuery = { ...paginateQuery, enable: inStock };
        }
        if (title)
        {
            paginateQuery = { ...paginateQuery, title };
        }
        let sortQuery;
        if (sort === 'asc')
        {
            sortQuery = 1;
        }
        if (sort === 'desc')
        {
            sortQuery = -1;
        }
        const paginateOptions =
        {
            page: page || 1,
            limit: limit || 10,
            sort: { price: sortQuery || 1 }
        };
        const productDocuments = await productSchema.paginate(paginateQuery, paginateOptions);
        const { docs, ...pagination } = productDocuments;

        const products = this.#productInfo(docs);
        return {
            products,
            pagination
        };
    }

    async getOneProductById(id)
    {
        const productDocument = await productSchema.findOne({ _id: id });
        return this.#productInfo(productDocument);
    }

    async getOneProductByCode(code)
    {
        const productDocument = await productSchema.findOne({ code });
        return this.#productInfo(productDocument);
    }

    async createProduct(data)
    {
        const productDocument = await productSchema.create(data);
        return this.#productInfo(productDocument);
    }

    async updateProduct(id, data)
    {
        const productDocument = await productSchema.findOneAndUpdate({ _id: id }, data, { new: true });
        return this.#productInfo(productDocument);
    }

    async deleteProduct(id)
    {
        const productDocument = await productSchema.findOneAndUpdate({ _id: id }, { enable: false });
        return this.#productInfo(productDocument);
    }
}
export default ProductMongooseRepository;
