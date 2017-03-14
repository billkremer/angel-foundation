angular.module("AngelApp").controller("UploadReportController", ['$location','$http', '$route',
function($location,$http,$route) {
  console.log('upload controller loaded');

  var vm=this;


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

  vm.uploadAllPatient = function($event){
    $event.preventDefault();
    // console.log(vm.csv.result); // array of objects.  each row is an object.
    var objectToSend = {dataArray: vm.csv.result};
    console.log('Updating All Patients', objectToSend);

    // put in error checking?


    // vm.csv.result.forEach(function(object){
    $http.post('/upload/allPatientData', objectToSend // just pass the object...

  ).then(function(response){
    console.log(response);
    alertify.set('notifier','position', 'bottom-right');
    alertify.success(vm.csv.result.filename + ' Submitted!');
    $route.reload();
  }, function(error) {
    console.log('error uploading patient csv', error);
  });
};

vm.uploadAllDistributionData = function($event){
  $event.preventDefault();
  // console.log(vm.csv.result); // array of objects.  each row is an object.
  var objectToSend = {dataArray: vm.csv.result};
  console.log('Updating All Distributions', objectToSend);
  // put in error checking?

  $http.post('/upload/allDistributionData', objectToSend // just pass the object...
).then(function(response){
  console.log('response',response);
  alertify.set('notifier','position', 'bottom-right');
  alertify.success(vm.csv.result.filename + ' Submitted!');
  $route.reload();
}, function(error) {
  console.log('error uploading patient csv', error);
});
};



vm.uploadAddPatient = function($event){
  $event.preventDefault();
  // console.log(vm.csv.result); // array of objects.  each row is an object.
  var objectToSend = {dataArray: vm.csv.result};
  console.log('Adding to Patients', objectToSend);

  // put in error checking?


  // vm.csv.result.forEach(function(object){
  $http.post('/upload/addPatientData', objectToSend // just pass the object...

).then(function(response){
  console.log(response);
  alertify.set('notifier','position', 'bottom-right');
  alertify.success(vm.csv.result.filename + ' Submitted!');
  $route.reload();
}, function(error) {
  console.log('error uploading patient csv', error);
});
};

vm.uploadAddDistributionData = function($event){
$event.preventDefault();
// console.log(vm.csv.result); // array of objects.  each row is an object.
var objectToSend = {dataArray: vm.csv.result};
console.log('Adding to Distributions', objectToSend);
// put in error checking?

$http.post('/upload/addDistributionData', objectToSend // just pass the object...
).then(function(response){
console.log('response',response);
alertify.set('notifier','position', 'bottom-right');
alertify.success(vm.csv.result.filename + ' Submitted!');
$route.reload();
}, function(error) {
console.log('error uploading patient csv', error);
});
};



//
//   });
//   alertify.set('notifier','position', 'bottom-right');
//   alertify.success(vm.csv.result.filename + ' Submitted!!!!!!!!!');
//   $route.reload();
// }


vm.logout = function() {
  console.log('Inside logout function');
  $http.delete('/login').then(function(){
    console.log('Successfully logged out!');
    $location.path('/');
  }).catch(function(err){
    console.log('Error logging out');
  });
}


vm.allTab = "allTab";
vm.addTab = "addTab";

vm.changeActive = function (tabSelected) {
  vm.allTabClass = "";
  vm.addTabClass = "";
  console.log('Tab selected: ', tabSelected);

  if (tabSelected == "addTab") {
    vm.allTabClass = "active";
    vm.submitTabSelected = "addTab";
  } else if (tabSelected == "allTab") {
    vm.addTabClass = "active";
    vm.submitTabSelected = "allTab";
  };
  console.log('This: ', vm);
};



}]);
