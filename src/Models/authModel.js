import jwt from "jsonwebtoken"
import Users from "./userModel.js"
import bcrypt from "bcrypt"

const secret = process.env.SECRET
const salt = process.env.SALT

class authModel{
    static async createToken(userID, userEmail){
        const token = jwt.sign(
            {
                "email": userEmail,
                "userID": bcrypt.hashSync(userID,salt)
            },
            secret,
            {
                expiresIn: '15m'
            }
        )

        return token
    }

    static verifyToken(token){
        return new Promise((resolve, reject) => {
            if(token){
                //JWT verif token
                jwt.verify(token,secret,async (err,token) => {
                    if(err) return resolve(false)
    
                    const user = await Users.findOne({where:{email: token.email}})
                    
                    if(bcrypt.hashSync(user.id,salt) === token.userID){
                        return resolve(true)
                    }else{
                        return resolve(false)
                    }
                })
            }else{
                return resolve(false)
            }
        })
    }

    static getUserByToken(token){
        return new Promise((resolve, reject) => {
            jwt.verify(token,secret,async (err,token) => {
                if(err) return resolve(false)

                const user = await Users.findOne({where:{email: token.email}})
                return resolve(user)
            })
        })
    }

    static authenticate(email,password){
        return new Promise((resolve, reject) => {
            Users.findOne({where:{email: email}})
                .then((user) => {
                    if(bcrypt.compareSync(password, user.hashPassword)){
                        resolve(authModel.createToken(user.id,user.email))
                    }else{
                        resolve(false)
                    }
                })
                .catch((err) => {
                    reject(false)
                })
        })

    }
}

export default authModel