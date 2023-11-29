import express from 'express';
import Auth from '../middlewares/authMiddleware.js';
import Order from '../controllers/orderController.js';

const router = express.Router();

router
  .get('/orders', Auth.verifyAuthorization, Order.read)
  .get('/orders/:id', Auth.verifyAuthorization, Order.readOne)
  .post('/orders', Auth.verifyAuthorization, Order.add);

export default router;
