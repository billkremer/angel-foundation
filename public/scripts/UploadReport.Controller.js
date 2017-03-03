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
      console.log(vm.csv.result);
      vm.csv.result.forEach(function(object){
            $http.post('/upload', {
                id        :object['angel patient id'],
                age       :object.age,
                ethnicity :object.ethnicity,
                status    :object['marital status'],
                diagnoses :object.diagnoses,
                grant     :object['grant used'],
                county    :object.county,
                clinic    :object.clinic,
                income    :object.income,
                gender    :object.gender
              }).then(function(response){
                console.log(response);
              }, function(error) {
                console.log('error uploading csv', error);
              });
      });
    }


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
