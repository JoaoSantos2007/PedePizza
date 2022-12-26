import {body,validationResult,param} from 'express-validator'
import Pizzas from '../Model/pizzaModel.js';

class pizzaValidator{
    static getPizza(){
        let pizza

        return([
            param('id').trim().isString().isLength({max: 25,min: 25}).custom(async (id) =>{
                await Pizzas.findByPk(id)
                    .then((res) => {
                        pizza = res
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })

                if(!pizza) return Promise.reject("Pizza not found!")
            }),
            (req, res, next) => {
                req.pizza = pizza

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({"msg": errors.array()[0].msg});
                }
                else(
                    next()
                )
            }
        ])
    }

    static putPizza(){
        let pizza

        return([
            param('id').trim().isString().isLength({max: 25,min: 25}).custom(async (id) =>{
                await Pizzas.findByPk(id)
                    .then((res) => {
                        pizza = res
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })

                if(!pizza) return Promise.reject("Pizza not found!")
            }),
            (req, res, next) => {
                req.pizza = pizza

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({"msg": errors.array()[0].msg});
                }
                else(
                    next()
                )
            }
        ])
    }

    static deletePizza(){
        let pizza

        return([
            param('id').trim().isString().isLength({max: 25,min: 25}).custom(async (id) =>{
                await Pizzas.findByPk(id)
                    .then((res) => {
                        pizza = res
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })

                if(!pizza) return Promise.reject("Pizza not found!")
            }),
            (req, res, next) => {
                req.pizza = pizza

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({"msg": errors.array()[0].msg});
                }
                else(
                    next()
                )
            }
        ])
    }
}

export default pizzaValidator