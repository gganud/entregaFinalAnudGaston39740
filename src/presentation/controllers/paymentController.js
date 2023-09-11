import PaymentManager from '../../domain/managers/paymentManager.js';
import TicketManager from '../../domain/managers/ticketManager.js';

class PaymentController
{
  static payTicket = async(req, res, next) =>
  {
    try
    {
      const ticketManager = new TicketManager();
      const ticket = await ticketManager.getOne(req.params.ticketId);
      const paymentManager = new PaymentManager();
      const payTicket = await paymentManager.payTicket(ticket);
      if (!payTicket)
      {
        return res.status(400).send({ status: 'failed', payload: payTicket.status });
      }
      const updateTicket = await ticketManager.completeOrder(ticket.id);

      return res.status(201).send({ status: 'success', payload: updateTicket });
    }
    catch (e)
    {
      next(e);
    }
  };
}

export default PaymentController;
