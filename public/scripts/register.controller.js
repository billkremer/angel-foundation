angular.module('AngelApp').controller('RegisterController', function($http, $location){
  console.log('Register Controller loaded.');
  var ctrl = this;

  ctrl.register = function() {
    // console.log('creating a new user');

    $http.post('/register', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){
      console.log('Response from the db', response);
      $location.path('/data-upload');
    }, function(error) {
      console.log('error registering new user', error);
    });
  };
});
