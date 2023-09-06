import { Router } from 'express';

import PaymentController from '../controllers/paymentController.js';
import auth from  '../middlewares/auth.js';

const paymentRouter = Router();

paymentRouter.post('/:ticketId', auth, PaymentController.payTicket);

export default paymentRouter;
