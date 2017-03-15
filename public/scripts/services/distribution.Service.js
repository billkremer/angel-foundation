app.service("distributionService", function($http){
  var vm = this;

  vm.getDistinct = function(query){
    return $http({
      method: "GET",
      url: "/dist",
      params: {
        search: query.title
      }
    }).then(function(response){
      console.log(response);
      return response;
    }).catch(function(err){
      console.log("error running standard report", err);
    })
  }//end of getDistinct

  vm.getValues = function(query,index){
    return $http({
      method: "GET",
      url: "/dist2",
      params: {
        field: query.field,
        item:  query.item
      }
    }).then(function(response){
      console.log(response);
      response.data[0].i=index;
      return response;
    }).catch(function(err){
      console.log("error running standard report", err);
    })
  }//end of getValues

});
