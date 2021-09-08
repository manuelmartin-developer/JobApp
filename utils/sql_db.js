const pg = require('pg');
require("dotenv").config() // Carga las variables de configuración ocultas en el .env 

const conString = process.env.SQL_URL
const client = new pg.Client(conString);
client.connect(function (err) {
    if (err) {
        return console.error('could not connect to postgres', err);
    }
    //   client.query('SELECT NOW() AS "theTime"', function(err, result) {
    //     if(err) {
    //       return console.error('error running query', err);
    //     }
    //   });
    console.log(`connection to PostgresDatabase established`);
    client.end(); // Cierra la conexión!!
});