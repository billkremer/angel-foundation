app.service("tableHoldService", function($http){
  var vm = this;

  vm.holdTable=function(table){
    vm.table=table;
    console.log(vm.table);
  }

  vm.returnTable=function(){
    console.log(vm.table);
    return vm.table;
  }



});
