angular.module("AngelApp").controller("CustomReportController", ['$location','$http',
  function($location,$http) {
    console.log('custom controller loaded');

    var vm=this;

    vm.dataSetList=[
      {
        title:'gender',
        options:['male','female']
      },
      {
        title:'age',
        options:['20+','30+','40+','50+','60+']
      },
      {
        title:'income',
        options:[40000,50000,60000,70000,80000]
      },
      {
        title:'marital status',
        options:['married','single']
      },
    ]
    vm.dataSetSelections=[];
    vm.addSelection=function(category,option){
      console.log('category',category);
      console.log('option',option);
        function isMatch(element,index,array){
          return element.title == category.title
        }
      if(vm.dataSetSelections.some(isMatch)){
        for(var i=0;i<vm.dataSetSelections.length;i++){
            if (vm.dataSetSelections[i].title==category.title){
              vm.dataSetSelections[i].options.push(option);
            }
        }
      }else{
          vm.dataSetSelections.push(
            {
              title:category.title,
              options:[option]
            });
        }
    }
}]);
