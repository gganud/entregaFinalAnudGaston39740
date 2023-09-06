import ticketSchema from '../../models/mongoose/ticketSchema.js';
import Ticket from '../../../domain/entities/ticket.js';

class TicketMongooseRepository
{
  async create(ticket)
{
    const ticketDocument = await ticketSchema.create(ticket);
    return new Ticket({
      id: ticketDocument._id,
      code: ticketDocument.code,
      purchase_datetime: ticketDocument.purchase_datetime,
      amount: ticketDocument.amount,
      purchaser: ticketDocument.purchaser,
      products: ticketDocument.products,
      orderCompleted: ticketDocument.orderCompleted,
      orderCompleted_datetime: ticketDocument.orderCompleted_datetime
    });
  }

  async getOne(idT)
{
    const ticketDocument = await ticketSchema.findOne({ _id: idT });
    if (!ticketDocument)
    {
        throw new Error('Ticket dont exist.');
    }
    return new Ticket({
      id: ticketDocument._id,
      code: ticketDocument.code,
      purchase_datetime: ticketDocument.purchase_datetime,
      amount: ticketDocument.amount,
      purchaser: ticketDocument.purchaser,
      products: ticketDocument.products,
      orderCompleted: ticketDocument.orderCompleted,
      orderCompleted_datetime: ticketDocument.orderCompleted_datetime
    });
  }

  async getAll(purchaser)
  {
    const ticketDocument = await ticketSchema.find({ purchaser });
    if (!ticketDocument)
    {
        throw new Error('Tickets dont exist.');
    }
    return new Ticket({
      id: ticketDocument._id,
      code: ticketDocument.code,
      purchase_datetime: ticketDocument.purchase_datetime,
      amount: ticketDocument.amount,
      purchaser: ticketDocument.purchaser,
      products: ticketDocument.products,
      orderCompleted: ticketDocument.orderCompleted,
      orderCompleted_datetime: ticketDocument.orderCompleted_datetime
    });
  }

  async update(idT, data)
  {
    const ticketDocument = await ticketSchema.findOneAndUpdate({ _id: idT }, data, { new: true });
    if (!ticketDocument)
    {
        throw new Error('Ticket not found.');
    }
    return new Ticket({
      id: ticketDocument._id,
      code: ticketDocument.code,
      purchase_datetime: ticketDocument.purchase_datetime,
      amount: ticketDocument.amount,
      purchaser: ticketDocument.purchaser,
      products: ticketDocument.products,
      orderCompleted: ticketDocument.orderCompleted,
      orderCompleted_datetime: ticketDocument.orderCompleted_datetime
    });
  }
}

export default TicketMongooseRepository;
