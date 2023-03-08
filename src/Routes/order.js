import express from "express"
import orderController from "../Controller/orderController.js"
import authMiddleware from "../Middleware/authMiddleware.js"

const Router = express.Router()

Router.use("/order", authMiddleware.verifyToken)

Router
    .get("/order", orderController.readOrders)
    .get("/order/:id", orderController.readOrders)
    .post("/order", orderController.createOrder)

export default Router