import mongoose from "mongoose"

const Schema = mongoose.Schema

const orderSchema = new Schema({
    "id": String,
    "userID": String,
    "products": Object,
    "price": Number
})

const order = mongoose.model("order", orderSchema)

export default order