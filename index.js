import app from './src/app.js'
import db from './src/config/mysql.js'
import dotenv from 'dotenv'
import Users from './src/Model/userModel.js'
import Pizzas from './src/Model/pizzaModel.js'
dotenv.config()

const port = process.env.PORT || 3030


await db.authenticate()
.then(() => {
    console.log("Connection estabilished with mysql");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

await db.sync()
await Users.sync()
await Pizzas.sync()


app.listen(port ,() => {
    console.log(`Server is working on http://localhost:${port}`)
})