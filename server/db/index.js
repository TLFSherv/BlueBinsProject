const { Pool } = require('pg')

console.log("Database:", process.env.PGDATABASE)
const pool = new Pool()

module.exports = {
    query: (text, params) => pool.query(text, params)
}