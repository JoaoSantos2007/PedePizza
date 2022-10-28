import express from 'express'
import pizzaController from '../Controller/pizzaController.js'
import pizzaValidation from '../validation/pizzaValidation.js'

const Router = express.Router()

Router
    .get('/pizza',pizzaController.getPizzas)
    .get('/pizza/:id',pizzaValidation.getPizza(),pizzaController.getPizzas)
    .post('/pizza',pizzaValidation.postPizza(),pizzaController.addPizzas)
    .put('/pizza/:id',pizzaValidation.putPizza(),pizzaController.updatePizza)
    .delete('/pizza/:id',pizzaValidation.deletePizza(),pizzaController.deletePizza)

export default Router