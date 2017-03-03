app.controller("StandardReportController", function(StandardReportGetService) {
    console.log('standard controller loaded');

    var vm=this;
    vm.data = [];
    vm.dataObject = {}
    vm.keys = [];
    vm.data.data = [];

    vm.getAllData = function(){
      StandardReportGetService.getData().then(function(response){
        console.log(response);
        vm.data = response;
        vm.dataObject = vm.data[0];
        console.log(vm.dataObject);
          for (var prop in vm.dataObject) {
            vm.keys.push(prop);
          };
          console.log(vm.keys);
      });
    };//end of getAllData


});//end of StandardReportController
