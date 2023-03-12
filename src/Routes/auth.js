import express from 'express'
import AuthController from '../Controllers/Auth.js'
import AuthMiddleware from '../Middlewares/Auth.js'

const router = express.Router()

router
    .post("/login", AuthController.login)
    .post("/logout", AuthMiddleware.verifyAuthorization, AuthController.logout)

export default router