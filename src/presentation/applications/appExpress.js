import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUiExpress from 'swagger-ui-express';
import compression from 'express-compression';
import { engine } from 'express-handlebars';
import path from 'path';

import config from '../../config/index.js';
import { specs, options } from '../../config/swaggerConfig.js';

import cartRouter from '../routes/cartRouter.js';
import productRouter from '../routes/productRouter.js';
import userRouter from '../routes/userRouter.js';
import sessionRouter from '../routes/sessionRouter.js';
import roleRouter from '../routes/roleRouter.js';
import paymentRouter from '../routes/paymentRoute.js';

import loggerTestRouter from '../routes/loggerTestRouter.js';
import { logger } from '../middlewares/logger.js';
import errorHandler from '../middlewares/errorHandler.js';
import notFound from '../middlewares/notFound.js';
import pinoLogger from '../../config/pinoLoggerConfig.js';

const PORT = config.port || 8000;
const HOST = config.host || '0.0.0.0';
const NODE_ENV = config.env || 'Development';
class AppExpress
{
    init()
    {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(compression(
            {
                brotli:
                {
                    enabled: true,
                    zlib: {}
                }
            })
        );
        const viewsPath = path.resolve('src/presentation/views');
        this.app.engine('handlebars', engine(
            {
                layoutsDir: `${viewsPath}/layouts`,
                defaultLayout: `${viewsPath}/layouts/main.handlebars`
            }));
        this.app.set('view engine', 'handlebars');
        this.app.set('views', viewsPath);
    }

    build()
    {
        // Logger
        this.app.use(logger);
        // Routes
        this.app.use('/api/carts', cartRouter);
        this.app.use('/api/products', productRouter);
        this.app.use('/api/users', userRouter);
        this.app.use('/api/sessions', sessionRouter);
        this.app.use('/api/roles', roleRouter);
        this.app.use('/api/payments', paymentRouter);

        // Logger test endpoint
        this.app.use('/api/loggertest', loggerTestRouter);

        // Docs
        this.app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs, options));

        // ErrorHandler
        this.app.use(errorHandler);

        // 404
        this.app.all('*', notFound);
    }

    callback()
    {
        return this.app;
    }

    close()
    {
        this.server.close();
    }

    listen()
    {
    this.server = this.app.listen(config.port, () =>
    {
        pinoLogger.info(`Server listening on ${HOST}:${PORT} - [${NODE_ENV}]`);
    });
    return this.server;
    }
}

export default AppExpress;
