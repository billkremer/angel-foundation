app.service("dataVisFourService", function($http){
  var vm = this;

  vm.getDistinct = function(query){
    return $http({
      method: "GET",
      url: "/dataVis",
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
      url: "/dataVisFour2",
      params: {
        field: query.field,
        item:  query.item,
        start:query.start,
        end:query.end
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
