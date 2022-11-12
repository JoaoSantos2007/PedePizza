import jwt from 'jsonwebtoken'
import Users from '../Model/userModel.js'
import bcrypt from 'bcrypt'

const secret = process.env.SECRET
const salt = process.env.SALT

class authMiddleware{
    static async verifyToken(req,res,next){
        const token = req.cookies.token

        //Verif exist token
        if(!token){
            res.status(401).send({"msg": "no token provided"})
            return
        } 
        
        //JWT verif token
        jwt.verify(token,secret,async (err,token) => {
            if(err) {
                res.status(401).send({"msg": `Token error: ${err.message}`})
                return
            }

            const email = token.email
            const user = await Users.findOne({
                where:{
                    email: email
                }
            })

            //User is invalid
            if(!user){
                res.status(401).send({"msg": "Token Invalid, Data doesn't match"})
                return
            }

            //UserID is invalid
            if(!(bcrypt.hashSync(user.id,salt) === token.userID)){
                res.status(401).send({"msg": "Token Invalid, Data doesn't match"})
            }
            
            if(user) req.user = user
            else req.user = ""

            next()
        })
    }

    static async createToken(userID){
        const user = await Users.findByPk(userID)

        const token = jwt.sign(
            {
                "email": user.email,
                "userID": bcrypt.hashSync(userID,salt)
            },
            secret,
            {
                expiresIn: '15m'
            }
        )

        return token
    }

    static async verifyAdmin(req,res,next){
        authMiddleware.verifyToken(req,res,next)

        if(!req.user) return

        const user = req.user

        if(user.admin) next()

        res.status(401).send({"msg":"you need admin"})
    }
    
}

export default authMiddleware