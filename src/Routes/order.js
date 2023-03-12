import express from "express"
//import orderController from "../Controllers/order.js"
import AuthMiddleware from "../Middlewares/Auth.js"

const Router = express.Router()

Router.use("/order", AuthMiddleware.verifyAuthorization)

Router
    //.get("/order", orderController.readOrders)
    //.get("/order/:id", orderController.readOrders)
    //.post("/order", orderController.createOrder)

export default Router