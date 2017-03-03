app.service("StandardReportGetService", function($http){
  var vm = this;

  vm.getData = function(){
    return $http({
      method: "GET",
      url: "/data"
    }).then(function(response){
      console.log("got a response from the db", response);
      return response.data;
    }).catch(function(err){
      console.log("error getting info from db", err);
    });
  };


});
