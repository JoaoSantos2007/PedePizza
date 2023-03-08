import authModel from '../Model/authModel.js'

class authMiddleware{
    static async verifyToken(req,res,next){
        const token = req.cookies.token

        const isToken = await authModel.verifyToken(token)

        if(!isToken){
            return res.status(401).json({"msg": "token invalid!"})
        }

        const user = await authModel.getUserByToken(token)
        req.user = user
        
        next()
    }

    static async verifyAdmin(req,res,next){
        const token = req.cookies.token

        const isToken = await authModel.verifyToken(token)

        if(!isToken){
            return res.status(401).json({"msg": "token invalid!"})
        }

        const user = await authModel.getUserByToken(token)

        if(user.admin) next()
        else res.status(403).json({"msg": "you need admin!"})
    }
}

export default authMiddleware