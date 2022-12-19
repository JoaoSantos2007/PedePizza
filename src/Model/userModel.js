import db from "../config/mysql.js";
import { Sequelize,DataTypes } from "sequelize";
import bcrypt from 'bcrypt'
import randomID from "../scripts/randomID.js";
const salt = process.env.SALT

//User Model
const Users = db.define("users",{
    id:{
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    hashPassword:{
        type: DataTypes.STRING(),
        allowNull: false
    },
    img:{
        type: DataTypes.STRING(1200),
        allowNull: true,
        defaultValue: undefined
    },
    admin:{
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: false
    }
},
{
    timestamps: false
})

await Users.sync()

Users["hashPassword"] = (password) => {
    return bcrypt.hashSync(password,salt)
}

//Verif Admin
const verifAdmin = async () => {

    const isAdmin = await Users.findOne({
        where:{
            admin: true
        }
    })

    if(isAdmin){
        await isAdmin.update({
            "email" :  process.env.ADMIN_EMAIL,
            "hashPassword" : Users.hashPassword(process.env.ADMIN_PASSWORD)
        })

        console.log(`${process.env.ADMIN_EMAIL}, ${process.env.ADMIN_PASSWORD}`)
        
        return
    }

    const admin = await Users.create({
        "id": randomID(),
        "email": process.env.ADMIN_EMAIL,
        "name": "admin",
        "hashPassword": Users.hashPassword(process.env.ADMIN_PASSWORD),
        "admin": true
    })

    console.log(`Admin created!, ${admin}`)
}

verifAdmin()

export default Users