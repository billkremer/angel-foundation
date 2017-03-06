const router = require('express').Router();
var passport = require('passport');

router.post('/', passport.authenticate('local'), function(req, res){
  res.sendStatus(200);
});

router.delete('/', function(req, res){
  req.logout();
  res.sendStatus(204);
});

module.exports = router;
