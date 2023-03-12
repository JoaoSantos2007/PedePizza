import mongoose from "mongoose"
import db from "../Config/mongodb.js"

const Schema = mongoose.Schema

const orderSchema = new Schema({
    "id": String,
    "userID": String,
    "products": Object,
    "price": Number
})

const order = db.model("order", orderSchema)

export default order