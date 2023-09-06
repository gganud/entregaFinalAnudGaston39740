import z from 'zod';

const loginValidation = z.object({
  email: z.string().email(),
  password: z.string().min()
});

export default loginValidation;
