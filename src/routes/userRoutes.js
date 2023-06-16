import express from 'express';
import UserController from '../controllers/userController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const Router = express.Router();

Router
  .get('/user', AuthMiddleware.verifyAuthorization, UserController.get)
  .post('/user', UserController.create)
  .put('/user', AuthMiddleware.verifyAuthorization, UserController.update)
  .delete('/user', AuthMiddleware.verifyAuthorization, UserController.delete);

export default Router;
