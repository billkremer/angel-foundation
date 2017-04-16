// <<<<<<< HEAD
// var app=angular.module('AngelApp',['ngRoute','ngAnimate']);
// =======
var app=angular.module('AngelApp',['ngRoute','ngCsvImport', 'ngAnimate','ngMaterial', 'ngMessages']);
// >>>>>>> master


app.config(function($routeProvider,$locationProvider){
  $routeProvider.when('/',{
    templateUrl:'views/standard-report.html',
    controller: 'StandardReportController as standardCtrl'
  }).when('/data-upload',{
    templateUrl:'views/data-upload.html',
    controller: 'UploadReportController as uploadCtrl',
    authRequired: true
  }).when('/data-vis',{
    templateUrl:'views/data-vis.html',
    controller: 'DataVisController as visCtrl'
  }).when('/custom-report',{
    templateUrl:'views/custom-report.html',
    controller: 'CustomReportController as customCtrl'
  }).when('/data-vis-two',{
    templateUrl:'views/data-vis-two.html',
    controller: 'DataVisTwoController as visTwoCtrl'
  }).when('/data-vis-three',{
    templateUrl:'views/data-vis-three.html',
    controller: 'DataVisThreeController as visThreeCtrl'
  }).when('/login',{
    templateUrl:'views/login.html',
    controller: 'LoginController as loginCtrl'
  }).when('/register',{
    templateUrl:'views/register.html',
    controller: 'RegisterController as registerCtrl'

  }).when('/d3barchart',{
    templateUrl:'views/d3barchart.html',
    controller: 'd3barchartController as barCtrl'

  }).when('/data-vis-four',{
    templateUrl:'views/data-vis-four.html',
    controller: 'dataVisFourController as visFourCtrl'

  }).when('/all-vis',{
    templateUrl:'views/all-vis.html'

  });

  $locationProvider.html5Mode(true);

})

.run(function($rootScope, $location, $route, AuthService) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    AuthService.checkLoginStatus().then(function(loggedIn) {
      // console.log(loggedIn);
      if (next.authRequired && !loggedIn) {
        $location.path("/login");
        $route.reload();
      }
    });
  });
});
