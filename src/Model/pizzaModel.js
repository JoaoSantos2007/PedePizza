import db from "../config/mysql.js";
import { Sequelize,DataTypes } from "sequelize";

const Pizzas = db.define("pizzas",{
    id:{
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    sabor:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    preco:{
        type: DataTypes.INTEGER(255),
        allowNull: false
    },
    img: {
        type: DataTypes.STRING(),
        allowNull: false
    }
},
{
    timestamps: false
})

export default Pizzas