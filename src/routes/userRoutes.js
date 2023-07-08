import express from 'express';
import User from '../controllers/userController.js';
import Auth from '../middlewares/authMiddleware.js';

const Router = express.Router();

Router
  .get('/user', Auth.verifyAuthorization, User.get)
  .post('/user', User.create)
  .put('/user', Auth.verifyAuthorization, User.update)
  .delete('/user', Auth.verifyAuthorization, User.delete);

export default Router;
