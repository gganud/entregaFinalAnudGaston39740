import pinoLogger from '../../config/pinoLoggerConfig.js';

const notFound = (req, res) =>
{
    pinoLogger.warning(`Resource not found: ${req.url}`);
    res.status(404).send({ status: 'error', message: 'Resource not found' });
};

export default notFound;
