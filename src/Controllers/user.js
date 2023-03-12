import userModel from "../Models/user.js"
import { hashPassword } from "../Utils/user.js"

class user{
    //Create user
    static create(req,res){
        const data = req.body

        userModel.create({
            "name": data.name,
            "email": data.email,
            "hashPassword": hashPassword(data.password),
            "img": data.img,
            "admin": false,
            "cart": {}
        })
            .then((user) => {
                res.status(201).json({
                    "created": true,
                    user
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    //Read user
    static get(req,res){
        res.status(200).json(req.user)
    }
    
    //Updtate user
    static update(req,res){
        const user = req.user
        const data = req.body

        user.update({
            "name": data.name ? data.name : undefined,
            "email": data.email ? data.email : undefined,
            "hashPassword": data.password ? userModel.hashPassword(data.password) : undefined,
            "img": data.img ? data.img : undefined
        })
            .then((user) => {
                res.status(200).json({
                    "updated": true,
                    user
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static delete(req,res){
        const user = req.user

        user.destroy()
            .then(() => {
                res.status(200).json({
                    "deleted": true
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}

export default user