import authModel from "../Model/authModel.js"

class authController{
    static async login(req,res){
        const data = req.body

        const email = data.email
        const password = data.password

        const token = await authModel.authenticate(email, password)
        
        if(token){
            res.cookie("token", token, {
                httpOnly: true,
                secure: !!req.headers["sec-fetch-mode"],
                sameSite: 'none'
            })
    
            res.status(200).send({
                "authenticated": true,
            })
        }else{
            res.status(401).send({"msg": "Incorrect login!"})
        }
    }

    static logout(req,res){
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