angular.module("AngelApp").controller("UploadReportController", ['$location','$http',
  function($location,$http) {
    console.log('upload controller loaded');

    var vm=this;

    vm.test = function(){
      console.log(vm.csv.result);
    }




}]);
