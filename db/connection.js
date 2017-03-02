var pg = require('pg');
var pool = new pg.Pool({
  database: 'angel_data_reporting'
});
module.exports = pool;
