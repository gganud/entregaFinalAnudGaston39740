import { Router } from 'express';

import pinoLogger from '../../config/pinoLoggerConfig.js';

const loggerTestRouter = Router();

loggerTestRouter.get('/debug/', async(req, res, next) =>
{
    pinoLogger.debug('Debug logger');
    res.status(200).send({ status: 'success', message: 'Debug logger' });
});
loggerTestRouter.get('/http/', async(req, res, next) =>
{
    pinoLogger.http('Http logger');
    res.status(200).send({ status: 'success', message: 'Http logger' });
});
loggerTestRouter.get('/info/', async(req, res, next) =>
{
    pinoLogger.info('Info logger');
    res.status(200).send({ status: 'success', message: 'Info logger' });
});
loggerTestRouter.get('/warning/', async(req, res, next) =>
{
    pinoLogger.warning('Warning logger');
    res.status(200).send({ status: 'success', message: 'Warning logger' });
});
loggerTestRouter.get('/error/', async(req, res, next) =>
{
    pinoLogger.error('Error logger');
    res.status(500).send({ status: 'success', message: 'Error logger' });
});
loggerTestRouter.get('/fatal/', async(req, res, next) =>
{
    pinoLogger.fatal('Fatal logger');
    res.status(500).send({ status: 'success', message: 'Fatal logger' });
});

export default loggerTestRouter;
