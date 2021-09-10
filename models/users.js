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
const getUser = async(email) => {
  try {
    const response = await pool.query('SELECT * FROM users WHERE email=$1', [email])
    return response.rowCount;
  } catch (err) {
    console.log(err.stack)
  }
}

//! Actualizar usuario
const updateUser = async() => {
    
}

//! Borrar usuario
const deleteUser = async() => {

}

module.exports = { createUser, getUser, updateUser, deleteUser }
