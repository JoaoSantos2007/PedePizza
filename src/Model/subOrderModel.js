import db from "../Config/mysql.js";
import { DataTypes } from "sequelize";

const SubOders = db.define("subOrder", {
    id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userID: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    orderID: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    productID: {
        type: DataTypes.STRING(25),
        allowNull: false,
    }
})

await SubOders.sync()

export default SubOders