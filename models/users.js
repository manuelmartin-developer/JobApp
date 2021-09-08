const client = require('../utils/sql_db')
require("dotenv").config() // Carga las variables de configuración ocultas en el .env 

//! Crear usuario
// const createUser = async (name, surname, email, password) => {
//     try {
//         await client.connect()
//         client.query('INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4)', [name, surname, email, password], (error, results) => {
//             if (error) {
//                 throw error
//             }
//             console.log(results);
//             return results.rows
//         })
//     }
//     catch (error) {
//         console.log(error);
//     }
//     finally {
//         console.log(`Cerrando conexión`);
//         client.end(); // Cierra la conexión!!
//     }

// }

// module.exports = { createUser }
