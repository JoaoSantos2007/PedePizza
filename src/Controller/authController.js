import Users from "../Model/userModel.js"
import bcrypt from "bcrypt"
import authMiddleware from "../middleware/authMiddleware.js"

class authController{
    static async login(req,res){
        const data = req.body

        const email = data.email
        const password = data.password

        const user = await Users.findOne({
            where: {
                email: email
            }
        })

        const isAuthenticated =  bcrypt.compareSync(password,user.hashPassword)
        
        if(!isAuthenticated) res.status(401).send("Incorrect email or password!")
    
        const token = await authMiddleware.createToken(user.id)
        console.log(token)

        res.cookie("token", token, {
            httpOnly: true,
            secure: !!req.headers["sec-fetch-mode"],
            sameSite: 'none'
        })

        res.status(200).send({
            "authenticated": true,
        })
    }

    static async logout(req,res){
        res.cookie("token", "", {
            httpOnly: true,
            secure: !!req.headers["sec-fetch-mode"],
            sameSite: 'none',
        })

        res.status(200).send({
            "left": true,
        })
    }
}

export default authController