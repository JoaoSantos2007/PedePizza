import express from 'express'
import productController from '../Controllers/product.js'
import authMiddleware from '../Middlewares/auth.js'
import uploadMiddleware from '../Middlewares/upload.js'

const Router = express.Router()

Router
    .get('/product', productController.get)
    .get('/product/:id', productController.get)
    .post('/product', authMiddleware.verifyAdmin, uploadMiddleware.single("img"), productController.create)
    .put('/product/:id', authMiddleware.verifyAdmin, productController.update)
    .delete('/product/:id', authMiddleware.verifyAdmin, productController.delete)

export default Router