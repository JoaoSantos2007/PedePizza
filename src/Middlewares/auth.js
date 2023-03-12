import userModel from "../Models/user.js"
import { verifyToken } from "../Utils/auth.js"

class auth{
    static verifyAuthorization(req, res, next){
        const token = req.cookies.token

        return verifyToken(token, (err, payload) => {
            if(err) return res.status(400).json(err)

            console.log(payload.email)
            return next()
        })
    }

    static async verifyAdmin(req,res,next){
        const token = req.cookies.token

        return verifyToken(token, (err, payload) => {
            if(err) return res.status(400).json(err)

            console.log(payload.email)
            return next()
        })
    }
}

export default auth