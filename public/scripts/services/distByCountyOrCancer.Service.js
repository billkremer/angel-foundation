app.service("distByCountyOrCancerService", function($http){
  var vm = this;

  var verbose = false;

  vm.getDistinct = function(query,index){
    return $http({
      method: "GET",
      url: "/distByCountyOrCancer",
      params: {
        search: query
      }
    }).then(function(response){
      if (verbose) console.log(response);
      response.data[0].i=index;
      return response;
    }).catch(function(err){
      if (verbose) console.log("error running standard report", err);
    })
  }//end of getDistinct



});
