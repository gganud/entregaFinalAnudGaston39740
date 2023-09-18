import Stripe from 'stripe';
import config from '../../config/index.js';
import TicketManager from './ticketManager.js';
import ProductManager from './productManager.js';

class PaymentManager
{
  constructor()
  {
    this.ticketManager = new TicketManager();
    this.productManager = new ProductManager();
    this.stripe = new Stripe(config.stripeKey);
  }
  async payTicket({ id, amount, currency = 'usd', purchaser })
  {
    const ticket = await this.ticketManager.getOne(id);
    if (ticket.orderCompleted === true)
    {
      throw new Error('Order is already paid');
    }
    for (const product of ticket.products)
    {
      const productInDb = await this.productManager.getProductById(product.id);
      if (product.quantity > productInDb.quantity)
      {
        throw new Error('No stock available.');
      }
    }
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      receipt_email: purchaser,
      confirm: true,
      payment_method: 'pm_card_visa',
      automatic_payment_methods:
      {
        enabled: true,
        allow_redirects: 'never'
      }
    });

    return (
    {
      clientSecret: paymentIntent.client_secret,
      ticket
    });
  }
}
export default PaymentManager;
