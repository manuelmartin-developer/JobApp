const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'dzfaqmro',
  host: 'tai.db.elephantsql.com',
  database: 'dzfaqmro',
  password: 'foUR-5hz7c7u8srWvdnYkqCEscrmci2A'
})

const client = new Client({
    user: 'dzfaqmro',
    host: 'tai.db.elephantsql.com',
    database: 'dzfaqmro',
    password: 'foUR-5hz7c7u8srWvdnYkqCEscrmci2A'
  })

module.exports = { pool, client }