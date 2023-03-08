import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    "id": String,
    "email": String,
    "name": String,
    "hashPassword": String,
    "img": String,
    "admin": Boolean,
    "cart": Object
})

const user = mongoose.model("user", userSchema)

export default user