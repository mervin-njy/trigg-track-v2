const Pool = require("pg").Pool;

const pool = new Pool({
  user: "triggtrack_admin",
  password: "trigger2tracker", // ALTER USER postgres WITH PASSWORD 'new_password';
  host: "127.0.0.1",
  port: 5432,
  database: "triggtrack",
});

module.exports = pool;
