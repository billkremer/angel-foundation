angular.module("AngelApp").controller("StandardReportController", ['$location','$http',
  function($location,$http) {
    console.log('standard controller loaded');

    var vm=this;

    vm.csvButtonClass = "active";
    vm.csvButton = "csvButton";
    vm.pdfButton = "pdfButton";
    vm.dataVisButton = "dataVisButton";
    vm.goButtonSelected = "csvButton";



    vm.showStandardReports = function () {

    }; // closes showStandardReports

    vm.showStandardReports();


    vm.selectStandardReport = function () {

    }; // closes selectStandardReport


    vm.changeActive = function (buttonSelected) {
      console.log(buttonSelected);
      vm.csvButtonClass = "";
      vm.pdfButtonClass = "";
      vm.dataVisButtonClass = "";

      if (buttonSelected == "csvButton") {
        vm.csvButtonClass = "active";
        vm.goButtonSelected = "csvButton";
      } else if (buttonSelected == "pdfButton") {
        vm.pdfButtonClass = "active";
        vm.goButtonSelected = "pdfButton";
      } else if (buttonSelected == "dataVisButton") {
        vm.dataVisButtonClass = "active";
        vm.goButtonSelected = "dataVisButton";
      };
      console.log(vm);
    }; // closes changeActive



    vm.goNext = function () {
      console.log('which selected',vm.goButtonSelected);


    }; // closes goNext




}]);
