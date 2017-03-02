angular.module("AngelApp").controller("UploadReportController", ['$location','$http',
  function($location,$http) {
    console.log('upload controller loaded');

    var vm=this;


    vm.test = function(){
      console.log(vm.csv.result);
      vm.csv.result.forEach(function(object){
        var stringAsArray=object['0'].split(',');
            $http.post('/upload', {
                id:stringAsArray[0],
                age:stringAsArray[1],
                ethnicity:stringAsArray[2],
                status:stringAsArray[3],
                diagnoses:stringAsArray[4],
                grant:stringAsArray[5],
                county:stringAsArray[6],
                clinic:stringAsArray[7],
                income:stringAsArray[8],
                gender:stringAsArray[9]
              }).then(function(response){
                console.log(response);
              }, function(error) {
                console.log('error uploading csv', error);
              });
      });
    }




}]);
