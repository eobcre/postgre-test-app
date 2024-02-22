require('dotenv').config();

const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.VITE_REACT_APP_DB_USER,
  host: process.env.VITE_REACT_APP_DB_HOST,
  database: process.env.VITE_REACT_APP_DB_DATABASE,
  password: process.env.VITE_REACT_APP_DB_PASSWORD,
  port: process.env.VITE_REACT_APP_DB_PORT,
});

module.exports = pool;