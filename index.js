import app from './src/app.js'
import db from './src/config/mysql.js'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3030

db.authenticate()
    .then(() => {
        console.log("Connection estabilished with mysql");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

await db.sync()

app.listen(port ,() => {
    console.log(`Server is working on http://localhost:${port}`)
})