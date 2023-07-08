import express from 'express';
import Auth from '../middlewares/authMiddleware.js';
import Cart from '../controllers/cartController.js';

const router = express.Router();

router
  .get('/cart', Auth.verifyAuthorization, Cart.read)
  .post('/cart', Auth.verifyAuthorization, Cart.add)
  .put('/cart/:id', Auth.verifyAuthorization, Cart.update)
  .delete('/cart/:id', Auth.verifyAuthorization, Cart.delete);

export default router;
