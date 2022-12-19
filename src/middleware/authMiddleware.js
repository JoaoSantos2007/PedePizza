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
            res.status(401).json({
                "msg": "no token provided"
            })
            return
        } 
        
        //JWT verif token
        jwt.verify(token,secret,async (err,token) => {
            if(err) {
                res.status(401).json({
                    "msg": `Token error: ${err.message}`
                })
                return
            }

            const email = token.email
            Users.findOne({
                where:{
                    email: email
                }
            })
                .then((user) => {
                    //User is invalid
                    if(!user){
                        res.status(401).json({"msg": "Token Invalid, Data doesn't match"})
                        return
                    }

                    //Verif if token userID and userID are equal
                    if(bcrypt.hashSync(user.id,salt) === token.userID){
                        req.user = user
                        next()
                    }else{
                        res.status(401).json({
                            "msg": "Token Invalid, Data doesn't match"
                        })
                    }
                })
                .catch((err) => {
                    res.status(500).json(err)
                })
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
        const user = req.user
        if(user.admin) {
            next()
        }else{
            res.status(401).json({"msg":"you need admin"})
        }    
    }
    
}

export default authMiddleware