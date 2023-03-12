import express from "express"
import userController from "../Controllers/user.js"
import authMiddleware from "../Middlewares/auth.js"

const Router = express.Router()

Router
    .get("/user", authMiddleware.verifyAuthorization, userController.get)
    .post("/user", userController.create)
    .put("/user", authMiddleware.verifyAuthorization, userController.update)
    .delete("/user", authMiddleware.verifyAuthorization, userController.delete)

export default Router