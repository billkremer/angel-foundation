var pg = require('pg');
var pool = new pg.Pool({
  user: process.env.PGUSER, //env var: PGUSER
  database: process.env.PGDATABASE, //env var: process.env.PGDATABASE
  password: process.env.PGPASSWORD, //env var: PGPASSWORD
  host: process.env.PGHOST, // PGHOST Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 30, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
});
module.exports = pool;
