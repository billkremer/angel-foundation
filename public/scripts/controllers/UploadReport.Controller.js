angular.module("AngelApp").controller("UploadReportController", ['$location','$http', '$route',
function($location,$http,$route) {

  var verbose = false; // turns off consolelogs
  if (verbose) console.log('upload controller loaded');

  var vm=this;


  //Alertify styling
  alertify.defaults.glossary.title = 'Angel Foundation';
  alertify.defaults.transition = "slide";
  alertify.defaults.theme.ok = "btn btn-danger";
  alertify.defaults.theme.cancel = "btn btn-primary";
  alertify.defaults.theme.input = "form-control";

  vm.csv = {
    content: null,
    header: true,
    headerVisible: true,
    separator: ',',
    separatorVisible: true,
    result: null,
    encoding: 'ISO-8859-1',
    encodingVisible: true,
    accept:".csv"
  };


//Radio buttons on All tab
  vm.uploadAll=function($event){
    alertify.confirm('Are you sure?  This will overwrite ALL data in the table', 'Clicking OK will replace all the data in your database').set('onok', function(closeEvent){
      $event.preventDefault();
      if(vm.type=='Patient Data'){
        vm.uploadAllPatient();
        vm.databasePatientTimeStamp();
      }
      else{
        vm.uploadAllDistributionData();
        vm.databaseDistTimeStamp();
      }
    }).set('oncancel', function(closeEvent){ alertify.error('Cancel');} );
  }

  vm.uploadAllPatient = function(){
    // console.log(vm.csv.result); // array of objects.  each row is an object.
    var objectToSend = {dataArray: vm.csv.result};
    if (verbose) console.log('Updating All Patients', objectToSend);
    // put in error checking?
    // vm.csv.result.forEach(function(object){
    $http.post('/upload/allPatientData', objectToSend // just pass the object...
  ).then(function(response){
    if (verbose) console.log(response);
    alertify.set('notifier','position', 'bottom-right');
    alertify.success(vm.csv.result.filename + ' Submitted!');
    $route.reload();
  }).catch( function(error) {
    if (verbose) console.log('error uploading patient csv', error);

  });
  // });
};

vm.uploadAllDistributionData = function(){
  // console.log(vm.csv.result); // array of objects.  each row is an object.
  var objectToSend = {dataArray: vm.csv.result};
  if (verbose) console.log('Updating All Distributions', objectToSend);
  // put in error checking?
  $http.post('/upload/allDistributionData', objectToSend // just pass the object...
).then(function(response){
  if (verbose) console.log('response',response);
  alertify.set('notifier','position', 'bottom-right');
  alertify.success(vm.csv.result.filename + ' Submitted!');
  $route.reload();
}).catch( function(error) {
  if (verbose) console.log('error uploading patient csv', error);

});
};

//Radio buttons on Addendum tab
vm.uploadAdd=function($event){
  $event.preventDefault();
  if (verbose) console.log('vm.type',vm.type);
  if (verbose) console.log('stuff to send',vm.csv.result);
  if(vm.type=='Patient Data'){
    vm.uploadAddPatient();
    vm.databasePatientTimeStamp();
  }
  else{
    vm.uploadAddDistributionData();
    vm.databaseDistTimeStamp();
  }
}


vm.uploadAddPatient = function(){
  // console.log(vm.csv.result); // array of objects.  each row is an object.
    var objectToSend = {dataArray: vm.csv.result};
    if (verbose) console.log('Adding to Patients', objectToSend);
    // put in error checking?
    // vm.csv.result.forEach(function(object){
    $http.post('/upload/addPatientData', objectToSend // just pass the object...
      ).then(function(response){
        if (verbose) console.log(response);
        alertify.set('notifier','position', 'bottom-right');
        alertify.success(vm.csv.result.filename + ' Submitted!');
        $route.reload();
      }, function(error) {
        if (verbose) console.log('error uploading patient csv', error);
      });

}

vm.uploadAddDistributionData = function(){
  // console.log(vm.csv.result); // array of objects.  each row is an object.
  var objectToSend = {dataArray: vm.csv.result};
  if (verbose) console.log('Adding to Distributions', objectToSend);
  // put in error checking?
  $http.post('/upload/addDistributionData', objectToSend // just pass the object...
).then(function(response){
  if (verbose) console.log('response',response);
  alertify.set('notifier','position', 'bottom-right');
  alertify.success(vm.csv.result.filename + ' Submitted!');
  $route.reload();
}, function(error) {
  if (verbose) console.log('error uploading patient csv', error);
});
};



//Geting Patient Table timestamp
vm.patientTimeStamp = {};
vm.databasePatientTimeStamp = function () {
  $http.get('/upload/databasePatientTimeStamp')
  .then(function(response){
    if (verbose) console.log('Patient Time Stamp: ', response);
    vm.patientTimeStamp = response.data[0];
    if (verbose) console.log('Timestamp log: ', vm.timeStamp);
  }).catch(function(err){
    if (verbose) console.log('Error grabbing Patient Table Time Stamp', err);
  })
}
vm.databasePatientTimeStamp();


//Getting Distributions Table timestamp
vm.distTimeStamp = {};
vm.databaseDistTimeStamp = function () {
  $http.get('/upload/databaseDistTimeStamp')
  .then(function(response){
    if (verbose) console.log('Distributions Time Stamp: ', response);
    vm.distTimeStamp = response.data[0];
  }).catch(function(err){
    if (verbose) console.log('Error grabbing Dist Table Time Stamp', err);
  })
}
vm.databaseDistTimeStamp();



vm.logout = function() {
  if (verbose) console.log('Inside logout function');
  $http.delete('/login').then(function(){
    if (verbose) console.log('Successfully logged out!');
    $location.path('/');
  }).catch(function(err){
    if (verbose) console.log('Error logging out');
  });
}


//Changing active tabs
vm.allTab = "allTab";
vm.addTab = "addTab";

vm.changeActive = function (tabSelected) {
  vm.allTabClass = "";
  vm.addTabClass = "";
  if (verbose) console.log('Tab selected: ', tabSelected);

  if (tabSelected == "addTab") {
    vm.allTabClass = "active";
    vm.submitTabSelected = "addTab";
  } else if (tabSelected == "allTab") {
    vm.addTabClass = "active";
    vm.submitTabSelected = "allTab";
  };
  if (verbose) console.log('This: ', vm);
};



}]);
