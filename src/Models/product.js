import mongoose from "mongoose"
import db from "../Config/mongodb.js"

const Schema = mongoose.Schema

const productSchema = new Schema({
    "name": {
        "type": String,
        "required": true,
        "unique": true
    },
    "type": {
        "type": String,
        "required": true,
    },
    "description": {
        "type": String,
        "unique": true
    },
    "price": {
        "type": Number,
        "required": true
    },
    "img": {
        "type": String,
        "required": true,
        "unique": true
    }
})

const product = db.model("Products", productSchema)

export default product