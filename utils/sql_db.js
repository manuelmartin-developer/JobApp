const { Pool, Client } = require('pg')
require("dotenv").config()

const pool = new Pool({
  connectionString: process.env.POSTGRE_URI,
  ssl: {
    rejectUnauthorized: false
  }
})

const client = new Client({
  connectionString: process.env.POSTGRE_URI,
  ssl: {
    rejectUnauthorized: false
  }
  })

module.exports = { pool, client }