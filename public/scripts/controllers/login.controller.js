angular.module('AngelApp')
.controller('LoginController', LoginController);

function LoginController($http, $location) {

  var verbose = false; // turns off error messages
  if (verbose) console.log('LoginController loaded');

  var ctrl = this;

  ctrl.login = function() {
    if (verbose) console.log('logging in');
    $http.post('/login', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){

      // sessionStorage.setItem('username', ctrl.username);
      // console.log('Value: ', ctrl.username);
      // console.log('User ID', req.user.id);

      if (verbose) console.log(response);
      $location.path('/data-upload');
    }, function(error) {
      alertify.alert('Angel Foundation', 'Username or Password incorrect.  Please try again.', function(){});
      if (verbose) console.log('error logging in', error);
    });
  };
}
