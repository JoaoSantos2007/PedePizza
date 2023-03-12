import jwt from "jsonwebtoken"
import UserModel from "../Models/User.js"
import dotenv from "dotenv"
import { hashPassword } from "./user.js"
dotenv.config()

const secret = process.env.SECRET

function createToken(email){
    const token = jwt.sign({
        "email": email
    }, secret, {
        expiresIn: '15m'
    })

    return token
}

function verifyToken(token, callback){
    jwt.verify(token, secret, (err, payload) => {
        callback(err, payload)
    })
}

async function authenticate(email, password){
    const user = await UserModel.findOne({
        "email": email,
        "hashPassword": hashPassword(password)
    }).exec()

    return(!!user === true && user.email === email &&  user.hashPassword === hashPassword(password))
}


export { createToken, verifyToken, authenticate }