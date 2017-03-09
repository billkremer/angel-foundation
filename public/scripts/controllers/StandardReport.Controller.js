app.controller("StandardReportController",
  function(StandardReportGetService,tableHoldService) {
    console.log('standard controller loaded');


    var vm=this;
    vm.dataArray = [];
    vm.dataObject = {}
    vm.keys = [];


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
      vm.keys = [];
      vm.currentReport=report;
      StandardReportGetService.selectedStandardReport(report).then(function(response){
        vm.standardReportResponse=response.data;
        docDefinition.content[0].table.body=[[]];
        console.log('standard report returned', vm.standardReportResponse);
        for(key in vm.standardReportResponse[0]){
          vm.keys.push(key);
          docDefinition.content[0].table.body[0].push(key);
        }
        vm.dataArray=[];

        vm.standardReportResponse.forEach(function(object){
          var arr=[];
          for (category in object){
            arr.push(object[category]);
          }
          vm.dataArray.push(arr);
          docDefinition.content[0].table.body.push(arr);
        });

      })
    }; // closes selectStandardReport

    vm.downloadCSV=function() {
        var csv = '';
        csv=vm.keys.join(',');
        csv+='\n';
        vm.dataArray.forEach(function(row) {
                csv += row.join(',');
                csv += "\n";
        });

        console.log(csv);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'people.csv';
        hiddenElement.click();
    }

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

    var docDefinition = {
            content: [
              {
                table: {
                  // headers are automatically repeated if the table spans over multiple pages
                  // you can declare how many rows should be treated as headers
                  headerRows: 1,

                  body: [


                  ]
                },
                layout: {
                  fillColor: function (i, node) { return (i % 2 === 0) ?  '#CCCCCC' : null; }
                }

              }
            ],	styles: {
              		tableHeader: {
              			fontSize: 18,
              			bold: true,
              			margin: [0, 0, 0, 10]
              		}
              	}
          };

    vm.goNext = function () {
      console.log('which selected',vm.goButtonSelected);
      if(vm.goButtonSelected=='csvButton'){
        vm.downloadCSV();
      }
      if(vm.goButtonSelected=='pdfButton'){

         pdfMake.createPdf(docDefinition).open()

         setTimeout(vm.selectStandardReport(vm.currentReport),500);

      }

    }; // closes goNext


});//end of StandardReportController
