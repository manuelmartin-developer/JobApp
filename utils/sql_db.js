const { Client } = require('pg');
require("dotenv").config() // Carga las variables de configuración ocultas en el .env 

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: 'fabrizio'
});
// client.connect(function (err) {
//     if (err) {
//         return console.error('could not connect to postgres', err);
//     }
// });
// console.log(`connection to PostgresDatabase established`);
// client.end(); // Cierra la conexión!!

module.exports = client