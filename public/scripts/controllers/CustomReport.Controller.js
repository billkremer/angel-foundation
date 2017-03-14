// angular.module("AngelApp").controller("CustomReportController", ['$location','$http',
//   function($location,$http) {
angular.module("AngelApp").controller("CustomReportController", ['subcategoryBucketService','$location','$http',
function(subcategoryBucketService, $location, $http) {


  console.log('custom controller loaded');

  var vm=this;


  vm.dataSetList=[
    {
      title:'gender',
      options:['female','male']
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
      title:'marital_status',
      options:['married','single']
    },
  ];  // end of dataSetList object
  vm.columnLimitList=[];
  for(var i=0;i<vm.dataSetList.length;i++){
    vm.columnLimitList[i]=vm.dataSetList[i].title;
  };
  console.log(vm.columnLimitList);
  // vm.dataSetListCategoryOrder = ['gender', 'age', 'income', 'marital'];
  // trying to order the categories on the html page.

  vm.dataSetSelections=[{title:'no selections'}];
  vm.columnLimitSelections=['no selections'];
  vm.addColumnLimitSelection=function(category){
    if (vm.columnLimitSelections[0] == 'no selections'){
      vm.columnLimitSelections=[];
    }
    vm.columnLimitSelections.push(category);
    console.log(vm.columnLimitSelections);
  }

  vm.addSelection = function(category,option) {
    if (vm.dataSetSelections[0].title == 'no selections'){
      vm.dataSetSelections=[];
    }

    console.log('category', category);
    console.log('option', option);

    function isMatch(element,index,array){
      return element.title == category.title;
    }

    if (vm.dataSetSelections.some(isMatch)) {
      for(var i=0; i < vm.dataSetSelections.length; i++) {
        if (vm.dataSetSelections[i].title == category.title){
          if (vm.dataSetSelections[i].options.indexOf(option) == -1) {
            vm.dataSetSelections[i].options.push(option);
          };
        };
      };
    } else {
      vm.dataSetSelections.push(
        {
          title:category.title,
          options:[option]
        });
      }
      console.log(vm);
    }; // close addSelection


    vm.removeOptionSelection = function(category,option){
      for(var i=0;i<vm.dataSetSelections.length;i++){
        if (vm.dataSetSelections[i].title == category.title){
          var index = vm.dataSetSelections[i].options.indexOf(option);
          vm.dataSetSelections[i].options.splice(index,1);
        }
      } console.log(vm.dataSetSelections[0]);
      if(vm.dataSetSelections[0] == undefined){
        vm.dataSetSelections=[{title:'no selections'}];
      } console.log(vm.dataSetSelections[0]);
    }


    vm.removeCategorySelection=function(category){
      for(var i=0;i<vm.dataSetSelections.length;i++){
        if (vm.dataSetSelections[i].title==category.title){
          vm.dataSetSelections.splice(i,1);
        }
      }console.log(vm.dataSetSelections[0]);
      if(vm.dataSetSelections[0]==undefined){
        vm.dataSetSelections=[{title:'no selections'}];
      }console.log(vm.dataSetSelections[0]);
    }
    vm.removeColumnSelection=function(category){
      for(var i=0;i<vm.columnLimitSelections.length;i++){
        if (vm.columnLimitSelections[i]==category){
          vm.columnLimitSelections.splice(i,1);
        }
      }console.log(vm.columnLimitSelections[0]);
      if(vm.columnLimitSelections[0]==undefined){
        vm.columnLimitSelections=['no selections'];
      }console.log(vm.columnLimitSelections[0]);
    }


    vm.saveReport=function(){
    // this function builds the SQL query string
      var reportString="SELECT ";
      console.log(reportString);
      if (vm.columnLimitSelections!="no selections") {
        for (var i=0;i<vm.columnLimitSelections.length-1;i++) {
          if (vm.columnLimitSelections[i] == "age") {
            reportString += "age(date_of_birth),";
          } else {
            reportString+=(vm.columnLimitSelections[i]+",");
          };
        };

        if (vm.columnLimitSelections[vm.columnLimitSelections.length-1] == "age") {
          reportString += "age(date_of_birth) ";
        } else {
          reportString+=(vm.columnLimitSelections[vm.columnLimitSelections.length-1] + " ");
        };

        reportString+="FROM patient ";
        console.log(reportString);
      } else {
        reportString = "SELECT * FROM patient ";
        // if columnLimitSelections == "no selections"
      }
      console.log(reportString);
      if (vm.dataSetSelections[0].title == "no selections"){
        console.log(reportString);
      } else {
        reportString+="WHERE ";
        for(var j=0; j<vm.dataSetSelections.length-1; j++){

          if (vm.dataSetSelections[j].title == "age" || vm.dataSetSelections[j].title == "income" || vm.dataSetSelections[j].title == "qualify amount" || vm.dataSetSelections[j].title == "exp date" || vm.dataSetSelections[j].title == "app date") {
            //write code based on format of these things!!!!
            // example: vm.dataSetSelections[j] = {title: "age", options:["30+","50+"]}

            reportString += subcategoryBucketService.returnString(vm.dataSetSelections[j]);

          }else{
            for(var i=0;i<vm.dataSetSelections[j].options.length-1;i++){
              reportString+="("+vm.dataSetSelections[j].title+"='"+vm.dataSetSelections[j].options[i]+"') OR "
            }
              reportString+="("+vm.dataSetSelections[j].title+"='"+vm.dataSetSelections[j].options[vm.dataSetSelections[j].options.length-1]+"')";
          }
          reportString+=" AND ";
        };
        console.log(reportString);
        if(vm.dataSetSelections[vm.dataSetSelections.length-1].title=="age"||vm.dataSetSelections[vm.dataSetSelections.length-1].title=="income"||vm.dataSetSelections[vm.dataSetSelections.length-1].title=="qualify amount"||vm.dataSetSelections[vm.dataSetSelections.length-1].title=="exp date"||vm.dataSetSelections[vm.dataSetSelections.length-1].title=="app date"){
          //write code based on format of these things!!!! - DONE!
          // the last filter needs a different end compared to the others.

          reportString += subcategoryBucketService.returnString(vm.dataSetSelections[vm.dataSetSelections.length-1]);

        }else{
          for(var i=0;i<vm.dataSetSelections[vm.dataSetSelections.length-1].options.length-1;i++){
            reportString+="("+vm.dataSetSelections[vm.dataSetSelections.length-1].title+"='"+vm.dataSetSelections[vm.dataSetSelections.length-1].options[i]+"') OR "
          }
          reportString+="("+vm.dataSetSelections[vm.dataSetSelections.length-1].title+"='"+vm.dataSetSelections[vm.dataSetSelections.length-1].options[vm.dataSetSelections[vm.dataSetSelections.length-1].options.length-1]+"')";
        }
      }; // end of WHERE filters
      reportString += ";"
      console.log(reportString);


    }; // end of saveReport function


  }]);
