const { pool, client } = require('../utils/sql_db')

//! Crear usuario
const createUser = async (name, surname, email, password) => {
    
    try {
        const response = await pool.query('INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4)', [name, surname, email, password])
        return response;
      } catch (err) {
        console.log(err.stack)
      }

};

//! Obtener Usuarios de la base de datos
const getUser = async() => {
    
}

//! Actualizar usuario
const updateUser = async() => {
    
}

//! Borrar usuario
const deleteUser = async() => {

}

module.exports = { createUser, getUser, updateUser, deleteUser }
