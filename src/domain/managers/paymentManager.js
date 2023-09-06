import Stripe from 'stripe';
import container from '../../container.js';
import config from '../../config/index.js';

class PaymentManager
{
  constructor()
  {
    this.ticketRepository = container.resolve('TicketRepository');
    this.stripe = new Stripe(config.stripeKey);
  }
  async payTicket({ id, amount, currency = 'usd', purchaser })
  {
    const ticket = await this.ticketRepository.getOne(id);
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

    return paymentIntent;
  }
}
export default PaymentManager;
