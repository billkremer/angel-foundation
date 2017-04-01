angular.module('AngelApp').service('AuthService', function($http, $location){

   this.checkLoginStatus = function(){
     // console.log('Checking login status');
     return $http.get('/loginStatus').then(function(res){
       if (res.data) {
         return true;
       } else {
         return false;
       }
     });
   }
 });
