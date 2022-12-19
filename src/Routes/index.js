import express from 'express'
import pizza from './pizzaRoutes.js'
import user from './userRoutes.js'
import auth from './authRoutes.js'
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
        pizza,
        user,
        auth
    )
}

export default Routes