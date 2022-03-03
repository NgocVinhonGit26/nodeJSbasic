import express from "express"
import configViewEngine from "./configs/viewEngine"
import initWebRoute from './route/web'
import initAPIRoute from './route/api'
// import connection from './configs/connectDB'

require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

configViewEngine(app) // setup view engine
initWebRoute(app) // init web route
initAPIRoute(app) // intit API route

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})