import jwt from "jsonwebtoken"
import crypto from "crypto"
import Allowlist from "../Models/AllowlistModel.js"
import Blocklist from "../Models/BlocklistModel.js"
import dotenv from "dotenv"
dotenv.config()

const SECRET = process.env.SECRET
const accessTokenLifetime = process.env.ACCESSTOKEN_LIFETIME

class Token{
    static createAccessToken(email){
        const accessToken = jwt.sign({
            "email": email
        }, SECRET, {
            expiresIn: `${accessTokenLifetime}m`
        })
    
        return accessToken
    }

    
    static async createRefreshToken(email){
        const refreshToken = crypto.randomBytes(24).toString("hex")
    
        try{
            await Allowlist.create({
                "key": refreshToken,
                "value": email
            })
        }catch(err){
            throw err     
        }
    
        return refreshToken
    }
    
    static verifyAccessToken(accessToken, callback){
        jwt.verify(accessToken, SECRET, (err, payload) => {
            callback(err, payload)
        })
    }

    static async revokeUserTokens(accessToken, refreshToken){
        try{
            await Allowlist.deleteOne({
                "key": refreshToken
            })
        
            await Blocklist.create({
                "key": accessToken
            })
        }catch(err){
            throw new Error(err)
        }
    }
}

export default Token