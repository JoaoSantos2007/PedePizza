import express from "express"
import userController from "../Controller/userController.js"
import authMiddleware from "../Middleware/authMiddleware.js"

const Router = express.Router()

Router
    .get("/user",authMiddleware.verifyToken,userController.getUser)
    .post("/user",userController.createUser)
    .put("/user",authMiddleware.verifyToken,userController.updateUser)
    .delete("/user",authMiddleware.verifyToken,userController.deleteUser)

export default Router