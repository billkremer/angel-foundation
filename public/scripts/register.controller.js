angular.module('AngelApp').controller('RegisterController', function($http, $location){

  var ctrl = this;

  ctrl.register = function() {
    console.log('creating a new user');

    $http.post('/register', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){
      console.log(response);
      $location.path('/data-upload');
    }, function(error) {
      console.log('error registering new user', error);
    });
  };
});
