app.service("CustomReportService", function($http){
  var vm = this;

  vm.getAllDiagnosis=function(){
    return $http({
      method: "GET",
      url: "/diagnosis"
    }).then(function(response){
      return response;
    }).catch(function(err){
      console.log("error getting all diagnosis", err);
    });
  };//end of getAllDiagnosis
  vm.getAllCities=function(){
    return $http({
      method: "GET",
      url: "/cities"
    }).then(function(response){
      return response;
    }).catch(function(err){
      console.log("error getting all cities", err);
    });
  };//end of getAllCities
  vm.getAllCounties=function(){
    return $http({
      method: "GET",
      url: "/counties"
    }).then(function(response){
      return response;
    }).catch(function(err){
      console.log("error getting all counties", err);
    });
  };//end of getAllCounties
  vm.getAllStates=function(){
    return $http({
      method: "GET",
      url: "/state"
    }).then(function(response){
      return response;
    }).catch(function(err){
      console.log("error getting states", err);
    });
  };//end of getAllZipCodes
  vm.getAllZipCodes=function(){
    return $http({
      method: "GET",
      url: "/zipCodes"
    }).then(function(response){
      return response;
    }).catch(function(err){
      console.log("error getting zip codes", err);
    });
  };//end of getAllZipCodes
  vm.getAllSwIds=function(){
    return $http({
      method: "GET",
      url: "/socialWorkerId"
    }).then(function(response){
      return response;
    }).catch(function(err){
      console.log("error getting Social Worker Ids", err);
    });
  };//end of getAllSwIds
  vm.getAllSwClinics=function(){
    return $http({
      method: "GET",
      url: "/socialWorkerClinic"
    }).then(function(response){
      return response;
    }).catch(function(err){
      console.log("error getting social worker clinics", err);
    });
  };//end of getAllSwClinics
  vm.getAllDrClinics=function(){
    return $http({
      method: "GET",
      url: "/doctorClinic"
    }).then(function(response){
      return response;
    }).catch(function(err){
      console.log("error getting doctor clinics", err);
    });
  };//end of getAllDrClinics
  vm.getAllDrIds=function(){
    return $http({
      method: "GET",
      url: "/doctorId"
    }).then(function(response){
      return response;
    }).catch(function(err){
      console.log("error getting dcotor IDs", err);
    });
  };//end of getAllDrIds

  vm.getCustomReport=function(query){
    return $http({
      method: 'GET',
      url: '/customReport',
      params: {
        search: query
      }
    }).then(function(response){
      console.log('custom report response from db', response);
      return response;
    }).catch(function(err){
      console.log('error getting custom report', err);
    })
  }
});
