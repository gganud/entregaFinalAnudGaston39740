import { faker } from '@faker-js/faker';
import chai from 'chai';
import supertest from 'supertest';

import initServer from './index.js';
import pinoLogger from '../config/pinoLogger.js';

const expect = chai.expect;
const jwt = '';

describe('Testing products Endpoints Success', () =>
{
    before(async function()
{
        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app;
        this.db = db;
        this.payload = {};
    });
    after(async function()
{
        // await this.db.drop();
        await this.db.close();
        this.requester.app.close(() =>
{
            pinoLogger.info('Conexión cerrada');
        });
    });
    beforeEach(async function()
{
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });
    it('GET /products should return Products[] and status 200', function()
{
        return this.requester
            .get('/api/products')
            .then(result =>
            {
                const { _body, status } = result;
                expect(status).to.be.equals(200);
                expect(Array.isArray(_body.payload.products)).to.be.equals(true);
            }
        );
    });
});
