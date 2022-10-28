import express from 'express'
import Routes from './Routes/index.js'

const app = express()
Routes(app)

export default app