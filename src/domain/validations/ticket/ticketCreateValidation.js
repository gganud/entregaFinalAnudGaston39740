import z from 'zod';

const ticketCreateValidation = z.object({
  code: z.string().min(2).max(35),
  purchase_datetime: z.date(),
  amount: z.number().min(0).max(999999),
  purchaser: z.string().email()
});

export default ticketCreateValidation;
