var router = require('express').Router();
var pg = require('pg');
var config = {database: 'angel_data_reporting'};
var pool = new pg.Pool(config);

router.post('/', function(req, res) {
  console.log('posting csv to database')
  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB, err');
      res.sendStatus(500);
      done()
    } else {
        client.query('INSERT INTO patient (angel_patient_id,age,ethnicity,martial_status,diagnoses,grant_used,county,clinic,income,gender) VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9,$10)',
        [req.body.id, req.body.age, req.body.ethnicity, req.body.status, req.body.diagnoses, req.body.grant,req.body.county,req.body.clinic,req.body.income,req.body.gender],
          function(err, result) {
          done();
          if (err) {
            console.log('Error querying DB', err);
            res.sendStatus(500);
          } else {
            console.log('Got info from DB', result.rows);
            res.send(result.rows);
          }
        }
      )
    }
  })
})

module.exports = router;
