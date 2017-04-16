var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");

var verbose = false; // turns off console logs

passport.use("local", new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  findAndComparePassword
));

// user -> userID
passport.serializeUser(function(user, done) {
  if (verbose) console.log("Serializing User", user);
  done(null, user.id);
});

// userID -> user
passport.deserializeUser(function(id, done) {
  if (verbose) console.log("Deserializing User");
  User
    .findById(id)
    .then(function(user) {
      // console.log(user);
      done(null, user);
    })
    .catch(function(err) {
      if (verbose) console.log("Error deserializing User", err);
      return done(err);
    });
});

function findAndComparePassword(username, password, done) {
  if (verbose) console.log("Finding and comparing passwords");
  User.findAndComparePassword(username, password).then(function(result){
    if (verbose) console.log('result', result);
    if (result.match) {
      done(null, result.user);
    } else {
      done(null, false);
    }
  }).catch(function(err){
    done(err);
  });
}
