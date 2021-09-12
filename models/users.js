const { pool, client } = require('../utils/sql_db')

//! Crear usuario
const createUser = async (name, surname, email, password) => {

  try {
    const response = await pool.query('INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4)', [name, surname, email, password])
    return response.rowCount;
  } catch (err) {
    console.log(err.stack)
  }
};

//! Obtener Usuarios de la base de datos
const getUser = async (email) => {
  try {
    const response = await pool.query('SELECT * FROM users WHERE email=$1', [email])
    return response.rows
  } catch (err) {
    console.log(err.stack)
  }
}
//! Obtener los usuarios
const getAllUsers = async () => {
  try {
    const response = await pool.query('SELECT * FROM users')
    return response.rows
  } catch (err) {
    console.log(err.stack)
  }
}
//! Actualizar un usuario
const updateAnUser = async (newName, newSurname, newEmail, oldEmail) => {
  try {

    const response = await pool.query('UPDATE users SET name=$1, surname=$2, email=$3 WHERE email=$4', [newName, newSurname, newEmail, oldEmail]);
    return response.rowCount
  } catch (error) {

  }
}
//! Borrar un usuario
const deleteOneUser = async (email) => {
  try {
    const response = await pool.query('DELETE FROM users WHERE email=$1', [email])
    return response.rowCount;
  } catch (err) {
    console.log(err.stack)
  }
}
//! Crea un favorito
const createFavorite = async (jobOffer, email) => {
  try {
    const response = await pool.query('INSERT INTO favorites (job_offer, user_id) VALUES ($1,(SELECT user_id FROM users WHERE email=$2))', [jobOffer, email]);
    return response.rowCount;
  } catch (err) {
    console.log(err.stack)
  }
};
//! Devuelve los favoritos del usuario
const getAllUserFavorites = async (email) => {
  try {
    const response = await pool.query('SELECT favorite_id, job_offer FROM favorites WHERE user_id =(SELECT user_id FROM users WHERE email=$1)', [email]);
    return response.rows
  } catch (err) {
    console.log(err.stack)
  }
}
//! Borra un favorito
const deleteOneFavorite = async (id) => {
  try {
    const response = await pool.query('DELETE FROM favorites WHERE favorite_id=$1', [id])
    return response.rowCount;
  } catch (err) {
    console.log(err.stack)
  }
}

module.exports = { createUser, getUser, getAllUsers, updateAnUser, deleteOneUser, createFavorite, getAllUserFavorites, deleteOneFavorite }
