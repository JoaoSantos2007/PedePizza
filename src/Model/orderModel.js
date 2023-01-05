import db from '../Config/mysql.js'
import { DataTypes } from 'sequelize'

const Orders = db.define("orders",{
    id: {
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true
    },
    userID: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER(),
        allowNull: false
    }
})

await Orders.sync()

export default Orders