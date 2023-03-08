import Orders from "../Model/orderModel.js"
import Products from "../Model/productModel.js"
import SubOders from "../Model/subOrderModel.js"
import Cart from "../Model/cartModel.js"
import randomID from "../Model/randomID.js"

class orderController{
    static async createOrder(req,res){
        const user = req.user
        const carts = await Cart.findAll({where: {userID: user.id}})

        const orderID = randomID()
        let price = 0

        carts.map(async cart => {
            const pizza = (await Products.findOne({where: {"id": cart.productID}})).get()
            
            price += pizza.preco * cart.qtde

            await SubOders.create({
                "orderID": orderID,
                "productID": pizza.id,
                "userID": user.id
            })

            await cart.destroy()
        })

        Orders.create({
            "id": orderID,
            "userID": user.id,
            "price": price
        })
            .then((order) => {
                res.status(201).json(order)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static async readOrders(req,res){
        const user = req.user

        const orders = await Orders.findAll({where: {"userID": user.id}})
        const subOrders = await SubOders.findAll({where: {"userID": user.id}})

        orders.map((order) => {
            order = order.get()
            order.products = []
            
            subOrders.map((subOrder) => {
                subOrder = subOrder.get()

                if(order.id === subOrder.orderID){
                    order.products.push(subOrder.productID)
                }
            })
        })

        res.status(200).json(orders)
    }
}

export default orderController