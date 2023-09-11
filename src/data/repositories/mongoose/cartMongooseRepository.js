import cartSchema from '../../models/mongoose/cartsSchema.js';
import Cart from '../../../domain/entities/cart.js';

class CartMongooseRepository
{
    async getOneCart(userId)
    {
        const cartDocument = await cartSchema.findOne({ userId })
        .populate('userId', 'email')
        .populate('products.product');
        const emptyCart = {};
        if (!cartDocument)
        {
            return emptyCart;
        }
        return new Cart({
            idCart: cartDocument._id,
            userId: cartDocument.userId,
            products: cartDocument.products.map(e => ({
                Product: e.product,
                Quantity: e.quantity
            }))
        });
    }

    async createCart({ userId })
    {
        const cartDocument = await cartSchema.create({ userId });
        return new Cart({
            idCart: cartDocument._id,
            userId: cartDocument.userId,
            products: cartDocument.products
        });
    }

    async addProductToCart(idC, idP)
    {
        const cart = await cartSchema.findOne({ _id: idC });
        const emptyCart = {};
        if (!cart)
        {
            return emptyCart;
        }
        let cartDocument = await cartSchema.findOneAndUpdate({ '_id': idC, 'products.product': idP },
        { $inc: { 'products.$.quantity': 1 } },
        { new: true });
        if (!cartDocument)
        {
            cartDocument = await cartSchema.findOneAndUpdate(
            { _id: idC },
            { $push: { products: { product: idP, quantity: 1 } } },
            { new: true });
        }
        return new Cart({
            idCart: cartDocument._id,
            userId: cartDocument.userId,
            products: cartDocument.products
        });
    }

    async deleteProduct(idC, idP)
    {
        const productOnCart = await cartSchema.findOne({ '_id': idC, 'products.product': idP });
        const emptyCart = {};
        if (!productOnCart)
        {
            return emptyCart;
        }
        const cartDocument = await cartSchema.findByIdAndUpdate(
            { _id: idC },
            { $pull: { products: { product: idP } } },
            { new: true }
        );
        return new Cart({
            idCart: cartDocument._id,
            userId: cartDocument.userId,
            products: cartDocument.products
        });
    }

    async deleteProducts(idC)
    {
        const cartDocument = await cartSchema.findOneAndUpdate(
            { _id: idC },
            { $set: { products: [] } },
            { new: true }
        );
        const emptyCart = {};
        if (!cartDocument)
        {
            return emptyCart;
        }
        return new Cart({
            idCart: cartDocument._id,
            userId: cartDocument.userId,
            products: cartDocument.products
        });
    }

    async updateProduct(quantity, idC, idP)
    {
        const cartDocument = await cartSchema.findOneAndUpdate(
            { '_id': idC, 'products.product': idP },
            { $set: { 'products.$.quantity': quantity } },
            { new: true }
        );
        const emptyCart = {};
        if (!cartDocument)
        {
            return emptyCart;
        }
        return new Cart(
        {
            idCart: cartDocument._id,
            userId: cartDocument.userId,
            products: cartDocument.products.map(item =>
            {
                return {
                    id: item._id,
                    quantity: item.quantity
                };
            })
        });
    }

    async updateProducts(products, idC)
    {
        const cartDocument = await cartSchema.findOneAndUpdate(
            { _id: idC },
            { $set: { products } },
            { new: true }
        );
        const emptyCart = {};
        if (!cartDocument)
        {
            return emptyCart;
        }
        return new Cart(
        {
            idCart: cartDocument._id,
            userId: cartDocument.userId,
            products: cartDocument.products.map(item =>
            {
                return (
                {
                    id: item.product,
                    quantity: item.quantity
                });
            })
        });
    }

    async productsInCart(idC)
    {
        const cartDocument = await cartSchema.findOne({ _id: idC })
        .populate('userId', 'email')
        .populate('products.product');
        const emptyCart = {};
        if (!cartDocument)
        {
            return emptyCart;
        }
        return new Cart({
            idCart: cartDocument._id,
            userId: cartDocument.userId,
            products: cartDocument.products
        });
    }
}
export default CartMongooseRepository;
