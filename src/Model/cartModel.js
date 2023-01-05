import db from "../Config/mysql.js";
import {DataTypes} from "sequelize";

const Cart = db.define("cart", {
    id: {
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true
    },
    productID: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    userID: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    qtde: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: 1
    }
},{
    timestamps: false
})

await Cart.sync()

export default Cart