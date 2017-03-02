var router = require('express').Router();
var pg = require('pg');
var config = {database: 'angel_data_reporting'};
var pool = new pg.Pool(config);

router.post('/addNewQuestion', function(req, res) {
  pool.connect(function(err, client, done) {
    if(err) {
      console.log('Error connecting to DB, err');
      res.sendStatus(500);
      done()
    } else {
        client.query('INSERT INTO multiple(question, answer1, answer2, answer3, answer4, test_id) VALUES($1, $2, $3, $4, $5, $6)',
        [req.body.question, req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4, req.body.test_id],
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
