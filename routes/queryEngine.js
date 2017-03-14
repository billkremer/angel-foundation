var express = require('express');
var router = express.Router();

var pg = require("pg");

var config = {
    database: "angel_data_reporting"
};

var pool = new pg.Pool(config);

router.get("/", function(req, res) {
  console.log(req.query.search);
  var object=JSON.parse(req.query.search);
    pool.connect(function(err, client, done) {
        if (err) {
            console.log("Error connecting to DB", err);
            res.sendStatus(500);
            done();
        } else {
            client.query(req.query.search, function(err, result) {
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
