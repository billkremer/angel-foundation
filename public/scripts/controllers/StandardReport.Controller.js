app.controller("StandardReportController", function(StandardReportGetService) {
    console.log('standard controller loaded');

    var vm=this;
    vm.data = [];
    vm.dataObject = {}
    vm.keys = [];
    vm.data.data = [];

    vm.standardReportList = [];
    vm.standardReportResponse = {};

    vm.csvButtonClass = "active";
    vm.csvButton = "csvButton";
    vm.pdfButton = "pdfButton";
    vm.dataVisButton = "dataVisButton";
    vm.goButtonSelected = "csvButton";

    //queries db for all saved standard reports
    vm.showStandardReports = function () {
      StandardReportGetService.getAllStandardReports().then(function(response){
        vm.standardReportList = response;
      })
    }; // closes showStandardReports

    vm.showStandardReports();

    //queries db for specific report
    vm.selectStandardReport = function (report) {
      StandardReportGetService.selectedStandardReport(report).then(function(response){
        vm.standardReportResponse=response.data;
        console.log('standard report returned', vm.standardReportResponse);
      })
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


});//end of StandardReportController
