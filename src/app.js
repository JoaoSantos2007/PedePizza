import express from 'express'
import Routes from './Routes/index.js'
import bodyParser from 'body-parser';

const app = express()

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

Routes(app)

export default app