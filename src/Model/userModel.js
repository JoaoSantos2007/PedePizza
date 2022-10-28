import db from "../config/mysql.js";
import { Sequelize,DataTypes } from "sequelize";
import bcrypt from 'bcrypt'
import randomID from "../scripts/randomID.js";

const salt = process.env.SALT

const Users = db.define("users",{
    id:{
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING(),
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
        type: DataTypes.STRING(),
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

Users["hashPassword"] = (password) => {
    return bcrypt.hashSync(password,salt)
}

const verifAdmin = async () => {

    const isAdmin = await Users.findOne({
        where:{
            admin: true
        }
    })
    if(isAdmin) return

    const admin = await Users.create({
    "id": randomID(),
    "email": "admin@admin.com",
    "name": "admin",
    "hashPassword": Users.hashPassword('admin123'),
    "admin": true
    })

    console.log('Admin created!')
}

verifAdmin()

export default Users