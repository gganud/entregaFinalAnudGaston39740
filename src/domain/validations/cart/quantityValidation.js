import z from 'zod';

const cartQuantityValidation = z.object({
  quantity: z.number().min(1).max(999999)
});

export default cartQuantityValidation;
