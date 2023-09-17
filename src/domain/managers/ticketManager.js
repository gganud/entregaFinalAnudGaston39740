import { nanoid } from 'nanoid';

import container from '../../container.js';
import ProductManager from './productManager.js';
import EmailManager from './emailManager.js';
import CartManager from './cartManager.js';
import { error } from 'shelljs';

class TicketManager
{
    constructor()
    {
        this.ticketRepository = container.resolve('TicketRepository');
        this.productManager = new ProductManager();
        this.cartManager = new CartManager();
        this.emailManager = new EmailManager();
    }

    async create(productsOrder)
    {
        if (productsOrder.products.length === 0)
        {
            throw new Error('El carrito se encuentra sin productos');
        }
        let amount = 0;
        for (const product of productsOrder.products)
        {
            // encontrar cada producto en la base de datos);
            const productInDb = await this.productManager.getProductById(product.product.id);
            // si el stock de algun producto es 0 throw error
            if (productInDb.stock === 0)
            {
                throw new Error(`El producto ${productInDb.title} se encuentra sin stock`);
            }
            // Si el stock es menor al solicitado trow error
            if (productInDb.stock - product.quantity < 0)
            {
                throw new Error(`No tenemos stock suficiente de ${productInDb.title}, actualmente tenemos ${productInDb.stock}u`);
            }
            // sumar precio * cantidad
            amount += productInDb.price * product.quantity;
            // Actualizo stock del producto
            const updatedProduct = await this.productManager.updateProductQuantity(product.product.id, { $inc: { stock: -product.quantity } });
            // si me quedo sin stock actualizo el enable del producto
            if (updatedProduct.stock === 0)
            {
                await this.productManager.deleteOneProduct(product.product.id);
            }
        }
        const ticket =
        {
            code: nanoid(),
            purchase_datetime: new Date(),
            amount,
            purchaser: productsOrder.userId.email,
            products: productsOrder.products.map(item =>
            ({
                    id: item.product.id,
                    title: item.product.title,
                    price: item.product.price,
                    quantity: item.quantity
            }))
        };
        const ticketDb = await this.ticketRepository.create(ticket);
        // Vacio carrito luego de emitir el ticket
        await this.cartManager.deleteProducts(productsOrder.idCart.toString());
        // envio el ticket por mail.
        delete Object.assign(ticket, { email: ticket.purchaser }).purchaser;
        const sendMailTicket = await this.emailManager.send(ticket, 'mailTicketTemplate.hbs', 'Ticket de compra');
        if (!sendMailTicket)
        {
            throw new Error('Error sending mail');
        }
        return ticketDb;
    }

    async getOne(idT)
    {
        const ticket = await this.ticketRepository.getOne(idT);
        if (Object.keys(ticket).length === 0 && ticket.constructor === Object)
        {
            throw new Error ('Ticket dont found.');
        }
        return ticket;
    }

    async getAll(criteria)
    {
        return await this.ticketRepository.getAll(criteria);
    }

    async completeOrder(idT)
    {
        const ticketUpdated = await this.ticketRepository.update(idT, { orderCompleted: true, orderCompleted_datetime: new Date() });
        if (Object.keys(ticketUpdated).length === 0 && ticketUpdated.constructor === Object)
        {
            throw new Error ('Ticket dont found.');
        }
        delete Object.assign(ticketUpdated, { email: ticketUpdated.purchaser }).purchaser;
        const sendMailTicket = await this.emailManager.send(ticketUpdated, 'mailPayConfirmationTemplate.hbs', 'Confirmacion de pago');
        if (!sendMailTicket)
        {
            throw new Error('Error sending mail');
        }
        return ticketUpdated;
    }
}

export default  TicketManager;
