var app=angular.module('AngelApp',['ngRoute','ngAnimate']);


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
  });

    $locationProvider.html5Mode(true);
});
