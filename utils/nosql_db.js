const mongoose = require("mongoose");
require("dotenv").config() // Carga las variables de configuración ocultas en el .env 


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on("error", error => console.log(error))
db.once("open", () => console.log("connection to db established"))

module.exports = mongoose
