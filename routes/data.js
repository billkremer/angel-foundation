var express = require('express');
var router = express.Router();

var pg = require("pg");

var config = {
    database: "angel_data_reporting"
};

var pool = new pg.Pool(config);

var verbose = true;

router.get("/", function(req, res) {
  console.log(req);
    pool.connect(function(err, client, done) {
        if (err) {
            if (verbose) console.log("Error connecting to DB", err);
            res.sendStatus(500);
            done();
        } else {
            client.query(req.query.search, function(err, result) {
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

router.post("/", function(req, res) {
    pool.connect(function(err, client, done) {
        if (err) {
            if (verbose) console.log("Error connecting to DB", err);
            res.sendStatus(500);
            done();
        } else {
            client.query("INSERT INTO standard_reports (report_name, query) VALUES ($1, $2)", [req.body.reportName, req.body.reportQuery], function(err, result) {
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
