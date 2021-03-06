app.service("StandardReportGetService", function($http){
  var vm = this;

  vm.getAllStandardReports = function(){
    return $http({
      method: "GET",
      url: "/standardReports"
    }).then(function(response){
      return response.data;
    }).catch(function(err){
      console.log("error getting standard reports", err);
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
      console.log("error running standard report", err);
    })
  }//end of selectedStandardReport

});
