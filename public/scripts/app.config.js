var app=angular.module('AngelApp',['ngRoute','ngCsvImport']);


app.config(function($routeProvider,$locationProvider){
  $routeProvider.when('/',{
    templateUrl:'views/standard-report.html',
    controller: 'StandardReportController as standardCtrl'
  }).when('/data-upload',{
    templateUrl:'views/data-upload.html',
    controller: 'UploadReportController as uploadCtrl'
    // authRequired: true
  }).when('/data-vis',{
    templateUrl:'views/data-vis.html',
    controller: 'DataVisController as visCtrl'
  }).when('/custom-report',{
    templateUrl:'views/custom-report.html',
    controller: 'CustomReportController as customCtrl'
  }).when('/login',{
    templateUrl:'views/login.html',
    controller: 'LoginController as loginCtrl'
  }).when('/register',{
    templateUrl:'views/register.html',
    controller: 'RegisterController as registerCtrl'
  });

  $locationProvider.html5Mode(true);

})

.run(function($rootScope, $location, $route, AuthService) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    AuthService.checkLoginStatus().then(function(loggedIn) {
      console.log(loggedIn);
      if (next.authRequired && !loggedIn) {
        $location.path("/login");
        $route.reload();
      }
    });
  });
});
