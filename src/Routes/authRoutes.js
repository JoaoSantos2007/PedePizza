import express from 'express'
import authController from '../Controller/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router
    .post("/login",authController.login)
    .post("/logout",authMiddleware.verifyToken,authController.logout)

export default router