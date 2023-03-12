import mongoose from "mongoose"
import db from "../Config/mongodb.js"

const Schema = mongoose.Schema

const userSchema = new Schema({
    "email": {
        "type": String,
        "required": true,
        "unique": true
    },
    "name": {
        "type": String,
        "required": true
    },
    "hashPassword": {
        "type": String,
        "required": true
    },
    "img": {
        "type": String,
        "required": false
    },
    "admin": {
        "type": Boolean,
        "required": true
    },
    "cart": {
        "type": Object,
        "required": true
    }
})

const User = db.model("user", userSchema)

export default User