angular.module('AngelApp').controller('RegisterController', function($http, $location){

  var verbose = false; // turns off consolelogs.
  if (verbose) console.log('Register Controller loaded.');
  var ctrl = this;

  ctrl.register = function() {
    // console.log('creating a new user');

    $http.post('/register', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){
      if (verbose) console.log('Response from the db', response);
      $location.path('/data-upload');
    }, function(error) {
      if (verbose) console.log('error registering new user', error);
    });
  };
});
