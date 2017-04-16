app.service("StandardReportGetService", function($http){
  var vm = this;

  var verbose = false;

  vm.getAllStandardReports = function(){
    return $http({
      method: "GET",
      url: "/standardReports"
    }).then(function(response){
      return response.data;
    }).catch(function(err){
      if (verbose) console.log("error getting standard reports", err);
    });
  };//end of getAllStandardReports

  vm.selectedStandardReport = function(report){
    return $http({
      method: "GET",
      url: "/data",
      params: {
        search: report.query
      }
    }).then(function(response){
      return response;
    }).catch(function(response){
      if (verbose) console.log("error running standard report", err);
    })
  }//end of selectedStandardReport

});
