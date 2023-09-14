import pinoLogger from '../../config/pinoLoggerConfig.js';

const errorHandler = (err, req, res, next) =>
{
  if (err?.message.includes('Not Found'))
{
      pinoLogger.warning(err.stack);
      return res.status(404).json({ message: err.message });
  }
  else if (err?.name.includes('ZodError'))
{
      pinoLogger.warning(err.stack);
      return res.status(400).json({ message: err.issues });
  }
  else if (err?.message.includes('Login failed, invalid password.'))
{
      pinoLogger.warning(err.stack);
      return res.status(401).send({ message: 'Login failed, invalid password.' });
  }
  else if (err?.message.includes('Email and Password invalid format.'))
{
      pinoLogger.warning(err.stack);
      return res.status(401).send({ message: 'Email and Password invalid format.' });
  }
  else if (err?.message.includes('Product dont exist.'))
{
    pinoLogger.warning(err.stack);
    return res.status(401).send({ message: 'Product dont exist.' });
  }
  else if (err?.message.includes('Product is already removed.'))
{
    pinoLogger.warning(err.stack);
    return res.status(401).send({ message: 'Product is already removed.' });
  }
  else if ((err?.message.includes('No tenemos stock suficiente de')) || (err?.message.includes('El producto se encuentra sin stock.')))
{
    pinoLogger.warning(err.stack);
    return res.status(401).send({ message: 'Stock Problem.' });
  }
  else if (err?.message.includes('El carrito se encuentra sin productos'))
{
    pinoLogger.warning(err.stack);
    return res.status(401).send({ message: 'Carrito Vacío.' });
  }
  else if (err?.message.includes('User dont exist'))
{
    pinoLogger.warning(err.stack);
    return res.status(401).send({ message: 'User don\'t exist.' });
  }
  else if (err?.message.includes('User already exist'))
  {
    pinoLogger.warning(err.stack);
    return res.status(401).send({ message: 'User already exist.' });
  }
  else if (err?.message.includes('Missing user documents.'))
  {
    pinoLogger.warning(err.stack);
    return res.status(401).send({ message: 'Missing user documents' });
  }
  pinoLogger.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error' });
};

export default errorHandler;
