import app from './src/app.js'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000

app.use("/", express.static("public/"))
app.use("/uploads", express.static("uploads/"))

app.listen(port ,() => {
    console.log(`Server is working on http://localhost:${port}`)
})