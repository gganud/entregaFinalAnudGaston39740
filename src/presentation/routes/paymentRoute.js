import { Router } from 'express';

import PaymentController from '../controllers/paymentController.js';
import auth from  '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const paymentRouter = Router();

paymentRouter.post('/:ticketId', auth, authorization('payOrder'), PaymentController.payTicket);

export default paymentRouter;
