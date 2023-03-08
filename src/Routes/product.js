import express from 'express'
import productController from '../Controller/productController.js'
import authMiddleware from '../Middleware/authMiddleware.js'
import uploadMiddleware from '../Middleware/uploadMiddleware.js'
import productValidator from '../Validator/productValidator.js'

const Router = express.Router()

Router
    .get('/product',productController.getProducts)
    .get('/product/:id',productValidator.getProduct,productController.getProducts)
    .post('/product',productValidator.postProduct,authMiddleware.verifyAdmin,uploadMiddleware.single("img"),productController.addProduct)
    .put('/product/:id',authMiddleware.verifyAdmin,productController.updateProduct)
    .delete('/product/:id',authMiddleware.verifyAdmin,productController.deleteProduct)

export default Router