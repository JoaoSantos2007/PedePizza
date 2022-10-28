import jwt from 'jsonwebtoken'
import Users from '../Model/userModel.js'
import bcrypt from 'bcrypt'

const secret = process.env.SECRET
const salt = process.env.SALT

class authMiddleware{
    static async verifyToken(req,res,next){
        const token = req.cookies.token//req.headers['x-access-token']

        if(!token){
            res.status(401).send("No token provided!")
            return
        } 
        
        jwt.verify(token,secret,async (err,token) => {
            if(err) {
                res.status(401).send(`Token error: ${err.message}`)
                return
            }

            const email = token.email
            const user = await Users.findOne({
                where:{
                    email: email
                }
            })
    
            if(!(bcrypt.hashSync(user.id,salt) === token.userID)){
                res.status(401).send("Token Invalid, Data doesn't match")
            }
    
            req.user = user

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
    
}

export default authMiddleware