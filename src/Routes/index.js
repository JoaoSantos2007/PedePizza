import express from 'express'
import pizza from './pizzaRoutes.js'
import user from './userRoutes.js'
import auth from './authRoutes.js'
import cookieParser from 'cookie-parser'

const Routes = (app) => {
    app.use("/",express.static('src/View'))
    
    app.use((req,res,next) => {
        res.set('Access-Control-Allow-Origin','http://127.0.0.1:5500')
        res.set('Access-Control-Allow-Headers','content-type')
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