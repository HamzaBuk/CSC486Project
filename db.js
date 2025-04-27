const {Pool} = require('pg');
require('dotenv').config();

//was thinking that we could put postgre info in the .env file
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL database successfully!');
    client.release();
  })
  .catch(err => {
    console.error('Failed to connect to PostgreSQL:', err.message);
    process.exit(1);
  });

module.exports = pool;


