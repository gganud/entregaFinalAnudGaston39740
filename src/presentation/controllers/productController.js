import ProductManager from '../../domain/managers/productManager.js';

class ProductController
{
    static listProducts = async(req, res, next) =>
{
        try
{
            const productManager = new ProductManager();
            const { limit, page, inStock, sort } = req.query;
            const productList = await productManager.listProducts({ limit, page, inStock, sort });
            res.status(200).send({ status: 'success', payload: productList });
        }
        catch (e)
{
            next(e);
        }
    };

    static getProductById = async(req, res, next) =>
{
        try
{
            const { id } = req.params;
            const productManager = new ProductManager();
            const product = await productManager.getProductById(id);
            res.status(200).send({ status: 'success', payload: product });
        }
        catch (e)
{
            next(e);
        }
    };

    static getOneProductByCode = async(req, res, next) =>
{
        try
{
            const { code } = req.body;
            const productManager = new ProductManager();
            const product = await productManager.getOneProductByCode(code);
            res.status(200).send({ status: 'success', payload: product });
        }
        catch (e)
{
            next(e);
        }
    };
    static save = async(req, res, next) =>
{
        try
        {
            const product = req.body;
            product.owner = req.user.email;
            const productManager = new ProductManager();
            const productAdded = await productManager.addProduct(product);
            res.status(201).send({ status: 'success', payload: productAdded, message: 'Product created.' });
        }
        catch (e)
{
            next(e);
        }
    };

    static update = async(req, res, next) =>
{
        try
{
            const product = req.body;
            product.owner = req.user.email;
            const { id } = req.params;
            const productManager = new ProductManager();
            const productUpdated = await productManager.updateProduct(id, product);
            res.status(201).send({ status: 'succcess', payload: productUpdated, message: 'Product updated.' });
        }
        catch (e)
{
            next(e);
        }
      };

    static delete = async(req, res, next) =>
{
        try
{
            const id = req.params.id;
            const user = req.user.email;
            const productManager = new ProductManager();
            const productDeleted = await productManager.deleteOneProduct(id, user);
            res.status(201).send({ status: 'success', payload: productDeleted, message: 'Product deleted.' });
        }
        catch (e)
{
            next(e);
        }
      };
}
export default ProductController;
