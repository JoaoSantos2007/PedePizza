import UserModel from "../Models/User.js"
import { hashPassword } from "../Utils/user.js"

class User{
    //create user
    static async create(req,res){
        const data = req.body
        
        const user = new UserModel({
            "name": data.name,
            "email": data.email,
            "hashPassword": hashPassword(data.password),
            "img": data.img,
            "admin": false,
            "cart": {}
        })

        try{
            const response = await user.save()

            res.status(201).json({"created": true, response})
        }catch(err){
            res.status(500).json(err)
        }
    }

    //read user
    static get(req,res){
        res.status(200).json(req.user)
    }
    
    //updtate user
    static async update(req,res){
        const user = req.user
        const data = req.body

        const userData = {
            "name": data.name || undefined,
            "email": data.email || undefined,
            "hashPassword": data.password ? hashPassword(data.password) : undefined,
            "img": data.img || undefined,
            "cart": data.cart || undefined
        }

        try{
            const response = await UserModel.updateOne({"email": user.email}, userData)

            res.status(200).json({"updated": response.acknowledged || true})
        }catch(err){
            res.status(500).json(err)
        }
    }

    //delete user
    static async delete(req,res){
        const user = req.user

        try{
            const response = await UserModel.deleteOne({"email": user.email})

            //TEMPORÁRIO
            res.cookie("token", "", {
                httpOnly: true,
                secure: !!req.headers["sec-fetch-mode"],
                sameSite: 'none',
            })

            res.status(200).json({"deleted": response.acknowledged || true})
        }catch(err){
            res.status(500).json(err)
        }
    }
}

export default User