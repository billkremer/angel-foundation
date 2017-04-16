var express = require('express');
var router = express.Router();

var pool = require("../db/connection");

var verbose = false; // turns off console logs


router.get("/", function(req, res) {
  var string="SELECT * FROM patient where application_date>'"+req.query.start+"' AND application_date<'"+req.query.end+"'";

  if (verbose) console.log('done');
    pool.connect(function(err, client, done) {
        if (err) {
            if (verbose) console.log("Error connecting to DB", err);
            res.sendStatus(500);
            done();
        } else {
            client.query(string,function(err, result) {
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
