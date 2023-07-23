import express from 'express';
import Product from '../controllers/productController.js';
import Auth from '../middlewares/authMiddleware.js';
import UploadMiddleware from '../middlewares/uploadMiddleware.js';
import VerifProductMiddleware from '../middlewares/verifyProductMiddleware.js';

const Router = express.Router();

Router
  .get('/product', Product.get)
  .get('/product/:id', Product.getByID)
  .post('/product', Auth.verifyAdmin, Product.create)
  .put('/product/:id', Auth.verifyAdmin, Product.update)
  .put('/product/img/:id', Auth.verifyAdmin, VerifProductMiddleware, UploadMiddleware.single('img'), Product.updateImg)
  .delete('/product/:id', Auth.verifyAdmin, Product.delete);

export default Router;
