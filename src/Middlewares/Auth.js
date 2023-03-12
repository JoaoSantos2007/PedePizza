import UserModel from "../Models/User.js"
import { verifyToken } from "../Utils/auth.js"

class Auth{
    static verifyAuthorization(req, res, next){
        const token = req.cookies.token

        return verifyToken(token, async (err, payload) => {
            if(err) return res.status(401).json(err)

            await UserModel.findOne({"email": payload.email}).exec()
                .then((user) => {
                    if(!user) return res.status(401).json({"error": "user not found!"})

                    req.user = user
                    return next()
                })
                .catch((err) => {
                    return res.status(500).json(err)
                })


        })
    }

    static async verifyAdmin(req, res, next){
        const token = req.cookies.token

        return verifyToken(token, async (err, payload) => {
            if(err) return res.status(400).json(err)

            await UserModel.findOne({"email": payload.email}).exec()
                .then((user) => {
                    if(!user) return res.status(400).json({"error": "user not found!"})

                    req.user = user
                    if(user.admin === true) return next()
                    else return res.status(400).json({err: "you need admin!"})
                })
                .catch((err) => {
                    return res.status(500).json(err)
                })
        })
    }
}

export default Auth