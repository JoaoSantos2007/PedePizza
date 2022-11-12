import {body,validationResult,query,param} from 'express-validator'

class pizzaValidator{
    static getPizza(){
        return([
            param('id').trim().isString().isLength({max: 25,min: 25}),
            (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({ errors: errors.array() });
                }
                else(
                    next()
                )
            }
        ])
    }

    static postPizza(){
        return([
            body('nome').trim().isString().isLength({max: 100}),
            body('sabor').trim().isString().isLength({max: 100}),
            body('preco').trim().isFloat().isLength({max: 10}),
            body('img').trim().isURL().isLength({max: 1000}),
            (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({ errors: errors.array() });
                }
                else(
                    next()
                )
            }
        ])
    }

    static putPizza(){
        return([
            body('nome').trim().isString().isLength({max: 100}),
            body('sabor').trim().isString().isLength({max: 100}),
            body('preco').trim().isFloat().isLength({max: 10}),
            body('img').trim().isURL().isLength({max: 1000}),
            (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({ errors: errors.array() });
                }
                else(
                    next()
                )
            }
        ])
    }

    static deletePizza(){
        return([
            param('id').trim().isString().isLength({max: 25,min: 25}),
            (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(404).json({ errors: errors.array() });
                }
                else(
                    next()
                )
            }
        ])
    }
}

export default pizzaValidator