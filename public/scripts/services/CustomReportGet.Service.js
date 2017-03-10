app.service("StandardReportGetService", function($http){
  var vm = this;

  this.getCustomReport = function(data){
    return $http({
      method: "GET",
      url: "/data"
    }).then(function(response){
      return response.data;
    }).catch(function(err){
      console.log("error getting custom report", err);
    });
  };//end of getCustomReport

});//end of StandardReportGetService
