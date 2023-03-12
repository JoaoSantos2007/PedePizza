import express from 'express'
import "./Config/mongodb.js"
import Routes from './Routes/index.js'
import bodyParser from 'body-parser';

const app = express()

app.use("/", express.static("public/"))
app.use("/uploads", express.static("uploads/"))
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

Routes(app)

export default app