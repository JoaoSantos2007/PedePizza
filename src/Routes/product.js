import express from 'express'
import ProductController from '../Controllers/ProductController.js'
import AuthMiddleware from '../Middlewares/AuthMiddleware.js'
import uploadMiddleware from '../Middlewares/upload.js'

const Router = express.Router()

Router
    .get('/product', ProductController.get)
    .get('/product/:id', ProductController.get)
    .post('/product', AuthMiddleware.verifyAdmin, uploadMiddleware.single("img"), ProductController.create)
    .put('/product/:id', AuthMiddleware.verifyAdmin, uploadMiddleware.single("img"), ProductController.update)
    .delete('/product/:id', AuthMiddleware.verifyAdmin, ProductController.delete)

export default Router