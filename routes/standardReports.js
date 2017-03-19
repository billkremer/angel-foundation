var express = require('express');
var router = express.Router();

var pg = require("pg");

var config = {
    database: "angel_data_reporting"
};

var verbose = false; // hides console logs

var pool = new pg.Pool(config);

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
