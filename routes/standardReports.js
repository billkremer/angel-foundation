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

var verbose = false; // hides console logs

router.get("/", function(req,res){
  pool.connect(function(err, client, done) {
    if (err) {
        if (verbose) console.log("Error connecting to DB", err);
        res.sendStatus(500);
        done();
    } else {
        client.query("SELECT * FROM standard_reports ORDER BY report_number;", function(err, result) {
            done();
            if (err) {
                if (verbose) console.log("Error querying DB", err);
                res.sendStatus(500);
            } else {
                if (verbose) console.log("Got info from DB", result.rows);
                res.send(result.rows);
            }
        });
    }
  })
});//end of get all standard reports


router.delete("/delReport/:id", function(req, res) {
  if (verbose) console.log("delReport - req.params ",req.params);
    pool.connect(function(err, client, done) {
        if (err) {
            if (verbose) console.log("Error connecting to DB", err);
            res.sendStatus(500);
            done();
        } else {
            client.query("DELETE FROM standard_reports WHERE report_number = $1;", [req.params.id], function(err, result) {
                done();
                if (err) {
                    if (verbose) console.log("Error querying DB", err);
                    res.sendStatus(500);
                } else {
                    if (verbose) console.log("Got info from DB", result.rows);
                    res.send(result.rows);
                }
            });
        }
    });
});


module.exports = router;
