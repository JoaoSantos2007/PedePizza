import Cart from "../Model/cartModel.js"
import randomID from "../Model/randomID.js"

class cartController{
    static postCart(req,res){
        const data = req.body
        const user = req.user

        Cart.create({
            "id": randomID(),
            "productID": data.productID,
            "userID": user.id,
            "qtde": data.qtde
        })
            .then((cart) => {
                res.status(201).json({
                    "created": true,
                    cart
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static getCart(req,res){
        const user = req.user

        Cart.findAll({
            where: {
                "userID": user.id
            }
        })
            .then((cart) => {
                res.status(200).json(cart)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static putCart(req,res){
        const id = req.params.id
        const data = req.body
        const user = req.user

        Cart.update({
            "qtde": data.qtde
        },{
            where: {
                "id": id,
                "userID": user.id
            }
        })
            .then((cart) => {
                res.status(200).json({
                    "update": true,
                    cart
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static deleteCart(req,res){
        const id = req.params.id
        const user = req.user

        Cart.destroy({
            where: {
                "id": id,
                "userID": user.id
            }
        })
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

export default cartController