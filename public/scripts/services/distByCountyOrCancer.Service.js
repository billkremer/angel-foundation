app.service("distByCountyOrCancerService", function($http){
  var vm = this;

  vm.getDistinct = function(query,index){
    return $http({
      method: "GET",
      url: "/distByCountyOrCancer",
      params: {
        search: query
      }
    }).then(function(response){
      console.log(response);
      response.data[0].i=index;
      return response;
    }).catch(function(err){
      console.log("error running standard report", err);
    })
  }//end of getDistinct



});
