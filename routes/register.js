var router = require('express').Router();
var User = require('../models/user');

var verbose = false; // turns off console logs

router.post('/', function(req, res){
  User.findByUsername(req.body.username).then(function(user){
    if (user) {
      return res.status(400).send('Username already taken');
    }

    return User.create(req.body.username, req.body.password).then(function(user){
      if (verbose) console.log('Created new user!');
      req.login(user, function(err){
        if (err) {
          if (verbose) console.log('Error logging in newly registered user', err);
          return res.sendStatus(500);
        }
      });

      res.sendStatus(201);
    });
  }).catch(function(err){
    if (verbose) console.log('Error creating user');
    res.sendStatus(500);
  });
});

module.exports = router;
