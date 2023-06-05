import express from 'express';
import AuthController from '../controllers/authController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router
  .post('/login', AuthController.login)
  .post('/logout', AuthMiddleware.verifyAuthorization, AuthController.logout)
  .post('/refresh', AuthMiddleware.refresh, AuthController.refresh);

export default router;
