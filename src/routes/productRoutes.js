import express from 'express';
import ProductController from '../controllers/productController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import UploadMiddleware from '../middlewares/uploadMiddleware.js';
import VerifProductMiddleware from '../middlewares/verifyProductMiddleware.js';

const Router = express.Router();

Router
  .get('/product', ProductController.get)
  .get('/product/:id', ProductController.getByID)
  .post('/product', AuthMiddleware.verifyAdmin, ProductController.create)
  .put('/product/:id', AuthMiddleware.verifyAdmin, ProductController.update)
  .put('/product/img/:id', AuthMiddleware.verifyAdmin, VerifProductMiddleware, UploadMiddleware.single('img'), ProductController.updateImg)
  .delete('/product/:id', AuthMiddleware.verifyAdmin, ProductController.delete);

export default Router;
