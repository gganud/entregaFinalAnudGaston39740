import z from 'zod';
const idValidation = z.string().refine((value) => value.length === 24, {
  message: 'El ID debe tener una longitud de 24 caracteres'
});

export default idValidation;
