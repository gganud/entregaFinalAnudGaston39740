import z from 'zod';

const productCreateValidation = z.object({
  title: z.string().min(2).max(35),
  description: z.string().min(5).max(100),
  code: z.string().min(5).max(35),
  price: z.number().min(1).max(999999),
  stock: z.number().min(1).max(999999),
  thumbnail: z.string().min(5).max(35),
  enable: z.boolean()
});

export default productCreateValidation;
