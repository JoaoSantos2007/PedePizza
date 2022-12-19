import Users from "../Model/userModel.js"
import randomID from "../scripts/randomID.js"

class userController{
    //Create user
    static createUser(req,res){
        const data = req.body

        Users.create({
            "id": randomID(),
            "name": data.name,
            "email": data.email,
            "hashPassword": Users.hashPassword(data.password),
            "img": data.img
        })
            .then((pizza) => {
                res.status(201).json({
                    "created": true,
                    pizza
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    //Read user
    static getUser(req,res){
        res.status(200).json(req.user)
    }
    
    //Updtate user
    static updateUser(req,res){
        const user = req.user
        const data = req.body

        user.update({
            "name": data.name ? data.name : undefined,
            "email": data.email ? data.email : undefined,
            "hashPassword": data.password ? Users.hashPassword(data.password) : undefined,
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

    static deleteUser(req,res){
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

export default userController