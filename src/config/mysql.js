import {Sequelize} from 'sequelize'
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    logging: false
  }
)

db.authenticate()
  .then(() => {
    console.log("Connection successfully established with MYSQL")
  })
  .catch((err) => {
    console.log("Mysql connection error: ", err)
  })

export default db;