var express = require('express');
var router = express.Router();

var pool = require("../db/connection");

var verbose = false; // turns off console logs


router.get("/", function(req,res){
  pool.connect(function(err, client, done) {
    if (err) {
        if (verbose) console.log("Error connecting to DB", err);
        res.sendStatus(500);
        done();
    } else {
        client.query("SELECT DISTINCT doctor_clinic FROM patient ORDER BY doctor_clinic asc;", function(err, result) {
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
});//end of get all doctor clinics

module.exports = router;
