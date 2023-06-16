import express from 'express';
import ProductController from '../controllers/productController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import UploadMiddleware from '../middlewares/uploadMiddleware.js';

const Router = express.Router();

Router
  .get('/product', ProductController.get)
  .get('/product/:id', ProductController.get)
  .post('/product', AuthMiddleware.verifyAdmin, ProductController.create)
  .put('/product/:id', AuthMiddleware.verifyAdmin, ProductController.update)
  .put('/image/:id', AuthMiddleware.verifyAdmin, UploadMiddleware.verifyProduct, UploadMiddleware.upload.single('img'), ProductController.setImage)
  .delete('/product/:id', AuthMiddleware.verifyAdmin, ProductController.delete);

export default Router;
