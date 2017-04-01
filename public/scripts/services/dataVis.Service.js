app.service("dataVisService", function($http){
  var vm = this;

  var verbose = false;

  vm.getDistinct = function(query){
    return $http({
      method: "GET",
      url: "/dataVis",
      params: {
        search: query.title
      }
    }).then(function(response){
      if (verbose) console.log(response);
      return response;
    }).catch(function(err){
      if (verbose) console.log("error running standard report", err);
    })
  }//end of getDistinct

  vm.getValues = function(query,index){
    return $http({
      method: "GET",
      url: "/dataVis2",
      params: {
        field: query.field,
        item:  query.item
      }
    }).then(function(response){
      if (verbose) console.log(response);
      response.data[0].i=index;
      return response;
    }).catch(function(err){
      if (verbose) console.log("error running standard report", err);
    })
  }//end of getValues

});
