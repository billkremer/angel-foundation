angular.module("AngelApp").controller("UploadReportController", ['$location','$http', '$route',
  function($location,$http,$route) {
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
                id        :object['angel_patient_id'],
                age       :object.age,
                ethnicity :object.ethnicity,
                status    :object['marital_status'],
                diagnoses :object.diagnoses,
                grant     :object['grant_used'],
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
      alertify.set('notifier','position', 'top-right');
      alertify.success(vm.csv.result.filename + ' Submitted!!!!!!!!!');
      $route.reload();
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
