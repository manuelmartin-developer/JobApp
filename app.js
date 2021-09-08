const express = require('express')
require('dotenv').config()
require('./utils/nosql_db') // Runs NOSQL Database with Mongoose
require('./utils/sql_db') // Runs SQL Database with Postgres
const path = require('path');

const router_web = require('./routes/router_web') // Retreive the web endpoints
const router_api = require('./routes/router_api') // Retreive the API endpoints 

const app = express()
const port = process.env.PORT

// Uso de archivos estáticos
app.use(express.static('public'))
app.use("/utils", express.static(path.join(__dirname, 'utils')));

// Motor de vistas
app.set('view engine', 'pug')
app.set('views', './views')

//Middlewares
app.use(express.json()) //Para convertir a JSON
app.use(express.urlencoded({ extended: false }))

app.use('/', router_web) // Web endpoints
app.use('/api', router_api) // API endpoints


// Control de error en caso de que se escriba una URL erronea
app.get('*', (req, res) => {
    res.status(404).send({ message: "Route " + req.url + " Not found." })
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })