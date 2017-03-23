app.controller("StandardReportController",
  function(StandardReportGetService,tableHoldService,$http) {

    var verbose = true; // hides console logs

    if (verbose) console.log('standard controller loaded');


    var vm=this;
    vm.dataArray = [];
    vm.dataObject = {}
    vm.keys = [];

    alertify.defaults.glossary.title = 'Angel Foundation';
    alertify.defaults.transition = "slide";
    alertify.defaults.theme.ok = "btn btn-danger";
    alertify.defaults.theme.cancel = "btn btn-primary";
    alertify.defaults.theme.input = "form-control";

    vm.standardReportList = [];
    vm.standardReportResponse = {};

    // vm.csvButtonClass = "active";
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

    vm.showDelete = false; // opens the page without the delete buttons
    vm.showDeleteString = "Delete a Report";

    vm.showDeleteButton = function (resetBoolean) {
      // this function shows the delete Xs on each report to delete them.
      // after deleting, running the function in the deleteReport hides the Xs again

      vm.showDelete = !vm.showDelete; // toggles between true and false
      if (verbose) console.log(vm.showDelete);
      if (vm.showDelete) { vm.showDeleteString = "Hide Delete"; };
      if (!vm.showDelete) { vm.showDeleteString = "Delete a Report"; };
      if (verbose) console.log(vm.showDeleteString);
    }; // end of showDeleteButton function

    vm.deleteReport = function (report) {
      if (verbose) console.log(report);
      if (verbose) console.log("vm in delete report", vm);


      alertify.confirm("Are you sure you want to delete: <strong>" + report.report_name + "?</strong>",


// var i = req.body.dataSetSelections.findIndex(function (x) { return x.title == "age" }); // gets the index for the age array




        function(){
          alertify.success("Deleted "+ report.report_name);
          // alertify.success('Delete ' + vm.currentReport.report_name);


          $http.delete('/standardReports/delReport/' + report.report_number).then( function () {


            var selectPrevIndex = vm.standardReportList.findIndex(function (x) {return x.report_name == report.report_name})

            console.log(selectPrevIndex, "selectPrevIndex");

            if (selectPrevIndex > 0) {
              selectPrevIndex--; // to select the previous report
              vm.selectStandardReport(vm.standardReportList[selectPrevIndex]);
              vm.showStandardReports(); // redraws the page
            } else {
// TODO go to custom-report page?
            };
          });

          vm.showDeleteButton(); // hides the delete buttons

        },
        function(){
          alertify.error("kept");
        }).setting({  labels: {ok: ('Delete: ' + report.report_name), cancel: "Keep it"},

          'defaultFocus': "Keep it",
                      'modal': true,
                      'movable': false,
        }).setHeader('<strong> Angel Foundation  </strong> ');

    }; // end deleteReport buttons


    //queries db for specific report
    vm.selectStandardReport = function (report) {
      vm.reportSelected=true;
      vm.keys = [];

      vm.reportTitle=report.report_name;
      if (verbose) console.log('report title - selectStandardReport',vm.reportTitle)
      vm.currentReport=report;
      StandardReportGetService.selectedStandardReport(report).then(function(response){
        vm.standardReportResponse=response.data;
        docDefinition.content[0].table.body=[[]];
        if (verbose) console.log('standard report returned', vm.standardReportResponse);
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

        if (verbose) console.log(csv);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = vm.currentReport.report_name.split(" ").join("-") + "-"+ (new Date()).toISOString().substring(0,10) +'.csv';
        hiddenElement.click();
    }

    vm.changeActive = function (buttonSelected) {
      if (verbose) console.log(buttonSelected);
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
      if (verbose) console.log(vm);
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

    vm.goNext = function (selection) {
      if (verbose) console.log('which selected',vm.goButtonSelected);
      if(selection=='csvButton'){
        vm.downloadCSV();
      }
      if(selection=='pdfButton'){

         pdfMake.createPdf(docDefinition).open()

         setTimeout(vm.selectStandardReport(vm.currentReport),500);

      }

    }; // closes goNext


});//end of StandardReportController
