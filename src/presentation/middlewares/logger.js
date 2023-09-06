import pinoLogger from '../../config/pinoLoggerConfig.js';

export const logger = (req, res, next) =>
{
  req.logger = pinoLogger;
  pinoLogger.debug(`${req.method} en ${req.url}`);
  next();
  };
