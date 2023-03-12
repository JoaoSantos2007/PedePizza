import express from 'express'
import authController from '../Controllers/auth.js'
import authMiddleware from '../Middlewares/auth.js'

const router = express.Router()

router
    .post("/login", authController.login)
    .post("/logout", authMiddleware.verifyAuthorization, authController.logout)

export default router