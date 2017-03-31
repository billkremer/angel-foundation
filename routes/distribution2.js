var express = require('express');
var router = express.Router();

var pool = require("../db/connection");
// var pg = require("pg");
//
// var config = {
//     database: "angel_data_reporting"
// };
//
// var pool = new pg.Pool(config);

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
