var pool = require("../db/connection");
var bcrypt = require("bcrypt");
var SALT_ROUNDS = 10;

// find by username
exports.findByUsername = function(username) {
  return query("SELECT * FROM users WHERE username = $1", [ username ])
    .then(function(users) {
      return users[0];
    })
    .catch(function(err) {
      console.log("Error finding user by username", err);
    });
};

// find by id
exports.findById = function(id) {
  return query("SELECT * FROM users WHERE id = $1", [ id ])
    .then(function(users) {
      return users[0];
    })
    .catch(function(err) {
      console.log("Error finding user by id", err);
    });
};

// compare password
// takes a username and a password, looks up the user by the given username
// and returns promise which resolves to a boolean indicating whether the
// passwords matched
exports.findAndComparePassword = function(username, password) {
  return exports.findByUsername(username).then(function(user) {
    return bcrypt
      .compare(password, user.password)
      .then(function(match) {
        return { match: match, user: user };
      })
      .catch(function(err) {
        return false;
      });
  });
};

exports.create = function(username, password) {
  return bcrypt
    .hash(password, SALT_ROUNDS)
    .then(function(hash) {
      return query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
        [ username, hash ]
      ).then(function(users) {
        return users[0];
      });
    })
    .catch(function(err) {
      console.log("Error creating user", err);
    });
};

// exports.create('test', '1234').then(function() {
//   console.log('Created a test user');
// });
// exports.findByUsername('test').then(function(user){
//   console.log(user);
// })
// exports.findById('2').then(function(user){
//   console.log(user);
// });
// exports.findAndComparePassword("test", "12345").then(function(match) {
//   console.log("Passwords match", match);
// });
// query("SELECT * FROM users")
//   .then(function(result) {
//     console.log(result.rows);
//   })
//   .catch(function(err) {
//     console.log("Error running test query", err);
//   });
function query(sqlString, data) {
  return new Promise(function(resolve, reject) {
    pool.connect(function(err, client, done) {
      try {
        if (err) {
          return reject(err);
        }

        client.query(sqlString, data, function(err, result) {
          if (err) {
            return reject(err);
          }

          resolve(result.rows);
        });
      } finally {
        done();
      }
    });
  });
}
//
