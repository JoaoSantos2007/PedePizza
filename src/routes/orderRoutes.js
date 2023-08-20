import express from 'express';
import Auth from '../middlewares/authMiddleware.js';
import Order from '../controllers/orderController.js';

const router = express.Router();

router
  .get('/order', Auth.verifyAuthorization, Order.read)
  .get('/order/:id', Auth.verifyAuthorization, Order.read)
  .post('/order', Auth.verifyAuthorization, Order.add);

export default router;
