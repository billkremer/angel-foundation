var pg = require('pg');
var pool = new pg.Pool({
  database: process.env.DATABASE_URL
});
module.exports = pool;
