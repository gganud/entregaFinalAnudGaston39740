import Stripe from 'stripe';
import config from '../../config/index.js';
import TicketManager from './ticketManager.js';

class PaymentManager
{
  constructor()
  {
    this.ticketManager = new TicketManager();
    this.stripe = new Stripe(config.stripeKey);
  }
  async payTicket({ id, amount, currency = 'usd', purchaser })
  {
    const ticket = this.ticketManager.getOne(id);
    if (ticket.orderCompleted === true)
    {
      throw new Error('Order is already paid');
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      receipt_email: purchaser,
      confirm: true,
      payment_method: 'pm_card_visa'
    });

    return (
    {
      clientSecret: paymentIntent.client_secret,
      ticket
    });
  }
}
export default PaymentManager;
