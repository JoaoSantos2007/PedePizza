import Users from "../Model/userModel.js"
import randomID from "../scripts/randomID.js"

class userController{
    static async getUser(req,res){
        res.status(200).send(req.user)
    }
    
    static async createUser(req,res){
        const data = req.body

        const newUser = {
            "id": randomID(),
            "name": data.name,
            "email": data.email,
            "hashPassword": Users.hashPassword(data.password),
            "img": data.img
        }

        const user = await Users.create(newUser)

        res.status(201).send(user)
    }

    static async updateUser(req,res){
        const user = req.user
        const data = req.body

        await Users.update(data,{
            where:{
                id: user.id
            }
        })
        .then(() => {
            res.status(200).send("Updated!")
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    }

    static async deleteUser(req,res){
        const user = req.user

        await Users.destroy({
            where:{
                id: user.id
            }
        })
        .then(()=>{
            res.status(200).send("Deleted!")
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    }
}

export default userController