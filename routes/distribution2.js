var express = require('express');
var router = express.Router();

var pg = require("pg");

var pool = new pg.Pool({
  user: process.env.PGUSER, //env var: PGUSER
  database: process.env.PGDATABASE, //env var: process.env.PGDATABASE
  password: process.env.PGPASSWORD, //env var: PGPASSWORD
  host: process.env.PGHOST, // PGHOST Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 30, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
});

router.get("/", function(req, res) {
  console.log(req.query.field);
  console.log(req.query.item);
  var string="SELECT * FROM distributions Where "+req.query.field+"='"+req.query.item+"'"+
              "AND (application_date>'"+req.query.start+"' AND application_date<'"+req.query.end+"');";
  console.log('done');
    pool.connect(function(err, client, done) {
        if (err) {
            console.log("Error connecting to DB", err);
            res.sendStatus(500);
            done();
        } else {
            client.query(string,function(err, result) {
                done();
                if (err) {
                    console.log("Error querying DB", err);
                    res.sendStatus(500);
                } else {
                    console.log("Got info from DB", result.rows);
                    res.send(result.rows);
                }
            });
        }
    });

});

module.exports = router;
