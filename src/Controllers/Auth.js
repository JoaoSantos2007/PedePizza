import { authenticate, createToken } from "../Utils/auth.js"

class Auth{
    static async login(req,res){
        const data = req.body

        const email = data.email
        const password = data.password

        const authenticated = await authenticate(email, password)
        if(authenticated){
            const token = createToken(email)

            res.cookie("token", token, {
                httpOnly: true,
                secure: !!req.headers["sec-fetch-mode"],
                sameSite: 'none'
            })
    
            return res.status(200).send({
                "authenticated": true,
            })
        }

        return res.status(401).send({"msg": "Incorrect login!"})
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

export default Auth