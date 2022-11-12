import Users from "../Model/userModel.js"
import randomID from "../scripts/randomID.js"

class userController{
    //Create user
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
        let status = user ? 201 : 500

        res.status(status).send(user)
    }

    //Read user
    static async getUser(req,res){
        res.status(200).send(req.user)
    }
    
    //Updtate user
    static async updateUser(req,res){
        const user = req.user
        const data = req.body

        const updateUser = {
            "name": data.name,
            "img": data.img
        }

        const updated = await Users.update(updateUser,{
            where:{
                id: user.id
            }
        })

        let status = updated ? 200 : 500

        res.status(status).send({updated: !!updated})
    }

    static async deleteUser(req,res){
        const user = req.user

        const deleted = await Users.destroy({
            where:{
                id: user.id
            }
        })

        let status = deleted ? 200 : 500

        res.status(status).send({deleted: !!deleted})
    }
}

export default userController