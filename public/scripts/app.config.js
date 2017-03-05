var app=angular.module('AngelApp',['ngRoute']);


app.config(function($routeProvider,$locationProvider){
  $routeProvider.when('/',{
    templateUrl:'views/standard-report.html',
    controller: 'StandardReportController as standardCtrl'
  }).when('/data-upload',{
    templateUrl:'views/data-upload.html',
    controller: 'UploadReportController as uploadCtrl'
  }).when('/data-vis',{
    templateUrl:'views/data-vis.html',
    controller: 'DataVisController as visCtrl'
  }).when('/custom-report',{
    templateUrl:'views/custom-report.html',
    controller: 'CustomReportController as customCtrl'
  }).when('/data-vis-two',{
    templateUrl:'views/data-vis-two.html',
    controller: 'DataVisTwoController as visTwoCtrl'
  }).when('/d3test',{
    templateUrl:'views/d3test.html',
    controller: 'DataVisThreeController as visTwoCtrl'
  });

    $locationProvider.html5Mode(true);
});
