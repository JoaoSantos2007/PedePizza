import {body,validationResult} from 'express-validator'
import Users from '../Model/userModel.js';

class userValidation{
    static postUser(){
        return([
            body("email").trim().isEmail().isLength({max: 200,min: 1}).custom(async (email) => {
                const existEmail = await Users.findOne({
                    where: {
                        email: email
                    }
                })

                if(existEmail) return Promise.reject("Email already in use")
            }),
            body("name").trim().isString().isLength({max: 100,min: 1}),
            body("password").trim().isString().isLength({max: 50,min: 6}),
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

    static putUser(){
        return([
            body("name").isString().isLength({max: 100,min: 0}),
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

export default userValidation