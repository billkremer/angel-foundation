angular.module("AngelApp").controller("UploadReportController", ['$location','$http',
  function($location,$http) {
    console.log('upload controller loaded');

    var vm=this;
    vm.csv = {
          content: null,
          header: true,
          headerVisible: true,
          separator: ',',
          separatorVisible: true,
          result: null,
          encoding: 'ISO-8859-1',
          encodingVisible: true,
          accept:".csv"
      };

    vm.upload = function($event){
      $event.preventDefault();
      // console.log(vm.csv.result); // array of objects.  each row is an object.
      var objectToSend = {dataArray: vm.csv.result};
        console.log(objectToSend);

        // put in error checking?


      // vm.csv.result.forEach(function(object){
            $http.post('/upload/patientData', objectToSend // just pass the object...

            ).then(function(response){
                console.log(response);
              }, function(error) {
                console.log('error uploading patient csv', error);
              });
      };


      vm.uploadDistributionData = function($event){
        $event.preventDefault();
        // console.log(vm.csv.result); // array of objects.  each row is an object.
        var objectToSend = {dataArray: vm.csv.result};
          console.log(objectToSend);
        // put in error checking?

              $http.post('/upload/distributionData', objectToSend // just pass the object...
              ).then(function(response){
                  console.log(response);
                }, function(error) {
                  console.log('error uploading patient csv', error);
                });
        };







    vm.logout = function() {
      console.log('Inside logout function');
      $http.delete('/login').then(function(){
        console.log('Successfully logged out!');
        $location.path('/');
      }).catch(function(err){
        console.log('Error logging out');
      });
    }


}]);
