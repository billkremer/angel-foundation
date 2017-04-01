angular.module("AngelApp").controller("allContainerController", ['$location','$http','dataVisService',
  function($location,$http,dataVisService) {
  //  console.log('datavis controller loaded');

    var vm=this;
    vm.dataVis=false;
    vm.dataVisThree=false;
    vm.d3bar=false;
    vm.dataVisFour=false;

    vm.setActive=function(selector){

      if(selector=='dataVis'){
        vm.dataVis=true;
        vm.dataVisThree=false;
        vm.d3bar=false;
        vm.dataVisFour=false;
      }else if(selector=='dataVisThree'){
        vm.dataVisThree=true;
        vm.dataVis=false;
        vm.d3bar=false;
        vm.dataVisFour=false;
      }else if(selector=='d3bar'){
        vm.d3bar=true;
        vm.dataVis=false;
        vm.dataVisThree=false;
        vm.dataVisFour=false;
      }else{
        vm.dataVis=false;
        vm.dataVisThree=false;
        vm.d3bar=false;
        vm.dataVisFour=true;
      }
    }

}]);
