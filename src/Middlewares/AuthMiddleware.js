import AllowlistModel from "../Models/AllowlistModel.js"
import TokenModel from "../Models/TokenModel.js"
import UserModel from "../Models/UserModel.js"

class Auth{
    static verifyAuthorization(req, res, next){
        const accessToken = req.cookies.accessToken

        return TokenModel.verifyAccessToken(accessToken, async (err, payload) => {
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
        const accessToken = req.cookies.accessToken

        return TokenModel.verifyAccessToken(accessToken, async (err, payload) => {
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

    static async refresh(req, res, next){
        const refreshToken = req.cookies.refreshToken

        try{
            const refreshTokenData = await AllowlistModel.findOneAndDelete({"key": refreshToken})
            if(!refreshToken || !refreshTokenData) return res.status(401).json({"error": "Invalid refresh token!"})
        
            const email = refreshTokenData.value
            req.email = email
            
            return next()
        }catch(err){
            return res.status(500).json(err)
        }
    }
}

export default Auth