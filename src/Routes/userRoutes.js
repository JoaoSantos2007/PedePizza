import express from "express"
import userController from "../Controller/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import userValidation from "../validation/userValidation.js"

const Router = express.Router()

Router
    .get("/user",authMiddleware.verifyToken,userController.getUser)
    .post("/user",userValidation.postUser(),userController.createUser)
    .put("/user",authMiddleware.verifyToken,userValidation.putUser(),userController.updateUser)
    .delete("/user",authMiddleware.verifyToken,userController.deleteUser)

export default Router