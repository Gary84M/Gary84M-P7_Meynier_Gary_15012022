const Pool = require("pg").Pool;

const pool = new Pool({
  user: "garymeynier",
  host: "localhost",
  database: "groupomania",
  password: "",
  port: 5432,
});

module.exports = pool;
