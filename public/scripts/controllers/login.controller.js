angular.module('AngelApp')
.controller('LoginController', LoginController);

function LoginController($http, $location) {
  console.log('LoginController loaded');
  var ctrl = this;

  ctrl.login = function() {
    console.log('logging in');
    $http.post('/login', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){

      // sessionStorage.setItem('username', ctrl.username);
      // console.log('Value: ', ctrl.username);
      // console.log('User ID', req.user.id);

      console.log(response);
      $location.path('/data-upload');
    }, function(error) {
      alertify.alert('Angel Foundation', 'Username or Password incorrect.  Please try again.', function(){});
      console.log('error logging in', error);
    });
  };
}
