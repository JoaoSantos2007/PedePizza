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
    descricao:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    preco:{
        type: DataTypes.INTEGER(255),
        allowNull: false
    },
    img: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
{
    timestamps: false
})

await Pizzas.sync()

export default Pizzas