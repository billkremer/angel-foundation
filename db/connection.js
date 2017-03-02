var pg = require('pg');
var pool = new pg.Pool({
  database: 'Angel_Data_Reporting'
});
module.exports = pool;
