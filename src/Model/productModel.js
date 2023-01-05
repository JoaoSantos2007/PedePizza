import db from "../Config/mysql.js";
import {DataTypes} from "sequelize";

const Products = db.define("products",{
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

await Products.sync()

export default Products