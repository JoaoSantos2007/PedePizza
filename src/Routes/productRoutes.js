import express from 'express'
import productController from '../Controller/productController.js'
import authMiddleware from '../Middleware/authMiddleware.js'
import {upload} from '../Middleware/uploadMiddleware.js'

const Router = express.Router()

Router
    .get('/product',productController.getPizzas)
    .get('/product/:id',productController.getPizzas)
    .post('/product',upload.single("img"),authMiddleware.verifyAdmin,productController.createPizza)
    .put('/product/:id',authMiddleware.verifyAdmin,productController.updatePizza)
    .delete('/product/:id',authMiddleware.verifyAdmin,productController.deletePizza)

export default Router