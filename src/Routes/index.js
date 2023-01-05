import express from 'express'
import product from './productRoutes.js'
import user from './userRoutes.js'
import auth from './authRoutes.js'
import cart from "./cartRoutes.js"
import order from "./orderRoutes.js"
import cookieParser from 'cookie-parser'

const Routes = (app) => {
    app.use((req,res,next) => {
        res.set('Access-Control-Allow-Origin','*')
        res.set('Access-Control-Allow-Headers','*')
        res.set('Access-Control-Allow-Methods','*')
        res.set('Access-Control-Allow-Credentials', true)
        next()
    })

    app.use(
        express.json(),
        cookieParser(),
        product,
        user,
        auth,
        cart,
        order
    )
}

export default Routes