import {body,validationResult} from 'express-validator'
import Users from '../Model/userModel.js';

class userValidation{
    static postUser(){
        return([
            body("email").trim().isEmail().isLength({max: 200,min: 1}).custom(async (email) => {
                await Users.findOne({
                    where: {
                        email: email
                    }
                })
                    .then((user) => {
                        if(user) return Promise.reject("Email already in use")
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
            }),
            body("name").trim().isString().isLength({max: 100,min: 1}),
            body("password").trim().isString().isLength({max: 50,min: 6}),
            (req, res, next) => {
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

    static putUser(){
        return([
            body("email").custom(async (email) => {
                await Users.findOne({
                    where: {
                        email: email
                    }
                })
                    .then((user) => {
                        if(user) return Promise.reject("Email already in use")
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
            }),
            body("name").isString().isLength({max: 100,min: 0}),
            body("password").trim().isString().isLength({max: 50,min: 6}),
            (req, res, next) => {
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

export default userValidation