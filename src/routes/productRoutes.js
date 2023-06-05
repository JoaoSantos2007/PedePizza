import express from 'express';
import ProductController from '../controllers/productController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const Router = express.Router();

Router
  .get('/product', ProductController.get)
  .get('/product/:id', ProductController.get)
  .post('/product', AuthMiddleware.verifyAdmin, uploadMiddleware.single('img'), ProductController.create)
  .put('/product/:id', AuthMiddleware.verifyAdmin, uploadMiddleware.single('img'), ProductController.update)
  .delete('/product/:id', AuthMiddleware.verifyAdmin, ProductController.delete);

export default Router;
