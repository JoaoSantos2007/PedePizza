import mongoose from "mongoose"

const Schema = mongoose.Schema

const productSchema = new Schema({
    "id": String,
    "name": String,
    "type": String,
    "description": String,
    "price": Number,
    "img": String
})

const product = mongoose.model("Products", productSchema)

export default product