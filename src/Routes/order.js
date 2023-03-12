import express from "express"
//import orderController from "../Controllers/order.js"
import authMiddleware from "../Middlewares/auth.js"

const Router = express.Router()

Router.use("/order", authMiddleware.verifyAuthorization)

Router
    //.get("/order", orderController.readOrders)
    //.get("/order/:id", orderController.readOrders)
    //.post("/order", orderController.createOrder)

export default Router