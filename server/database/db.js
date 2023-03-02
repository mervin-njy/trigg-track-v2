const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "psql4eva", // ALTER USER postgres WITH PASSWORD 'new_password';
  host: "localhost",
  port: 5432,
  database: "triggtrack",
});

module.exports = pool;
