import ticketSchema from '../../models/mongoose/ticketSchema.js';
import Ticket from '../../../domain/entities/ticket.js';

class TicketMongooseRepository
{
  #ticketInfo(data)
    {
        const emptyDocument = {};
        if (!data)
        {
            return emptyDocument;
        }
        const document = {
          id: data._id,
          code: data.code,
          purchase_datetime: data.purchase_datetime,
          amount: data.amount,
          purchaser: data.purchaser,
          products: data.products,
          orderCompleted: data.orderCompleted,
          orderCompleted_datetime: data.orderCompleted_datetime
        };
        if (Array.isArray(data))
        {
            return data.map(document => new Ticket(document));
        }
        return new Ticket (document);
    }

    async getAll(criteria)
    {
      const { limit, page, purchaser } = criteria;
      const paginateOptions =
      {
          page: page || 1,
          limit: limit || 10
      };
      const ticketDocuments = await ticketSchema.paginate(purchaser, paginateOptions);
      const { docs, ...pagination } = ticketDocuments;
      const tickets = this.#ticketInfo(docs);
      return {
        tickets,
        pagination
      };
    }

  async create(ticket)
  {
    const ticketDocument = await ticketSchema.create(ticket);
    return this.#ticketInfo(ticketDocument);
  }

  async getOne(idT)
  {
    const ticketDocument = await ticketSchema.findOne({ _id: idT });
    return this.#ticketInfo(ticketDocument);
  }

  async update(idT, data)
  {
    const ticketDocument = await ticketSchema.findOneAndUpdate({ _id: idT }, data, { new: true });
    return this.#ticketInfo(ticketDocument);
  }
}

export default TicketMongooseRepository;
