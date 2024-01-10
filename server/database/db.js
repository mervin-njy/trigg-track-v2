const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

// const pool = new Pool({
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD, // ALTER USER postgres WITH PASSWORD 'new_password';
//   host: process.env.PGHOST,
//   port: process.env.PGPORT,
//   database: process.env.PGDATABASE,
// });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

module.exports = pool;
