import express from 'express'
import pizzaController from '../Controller/pizzaController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'
import pizzaValidation from '../validation/pizzaValidation.js'

const Router = express.Router()

Router
    .get('/pizza',pizzaController.getPizzas)
    .get('/pizza/:id',pizzaValidation.getPizza(),pizzaController.getPizzas)
    .post('/pizza',/*pizzaValidation.postPizza()*/upload.single("img"),/*authMiddleware.verifyToken,authMiddleware.verifyAdmin,*/pizzaController.createPizza)
    .put('/pizza/:id',pizzaValidation.putPizza(),authMiddleware.verifyToken,authMiddleware.verifyAdmin,pizzaController.updatePizza)
    .delete('/pizza/:id',pizzaValidation.deletePizza(),authMiddleware.verifyToken,authMiddleware.verifyAdmin,pizzaController.deletePizza)

export default Router