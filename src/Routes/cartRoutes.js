import express from "express"
import cartController from "../Controller/cartController.js"
import authMiddleware from "../Middleware/authMiddleware.js"

const Router = express.Router()

Router.use("/cart", authMiddleware.verifyToken)

Router
    .get("/cart", cartController.getCart)
    .post("/cart", cartController.postCart)
    .put("/cart/:id", cartController.putCart)
    .delete("/cart/:id", cartController.deleteCart)

export default Router