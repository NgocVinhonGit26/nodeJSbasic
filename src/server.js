import express from "express"
import configViewEngine from "./configs/viewEngine"
import initWebRoute from './route/web'
import initAPIRoute from './route/api'
import req from "express/lib/request"
import res from "express/lib/response"
// import connection from './configs/connectDB'

require('dotenv').config()
var morgan = require('morgan')

const app = express()
const port = process.env.PORT || 8080

app.use((req, res, next) => {
    console.log('check req middleware')
    console.log(req)
    next()
})

app.use(morgan('combined'))

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

configViewEngine(app) // setup view engine
initWebRoute(app) // init web route
initAPIRoute(app) // intit API route
app.use((req, res) => {
    return res.render('404.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})