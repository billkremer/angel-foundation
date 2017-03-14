angular.module("AngelApp").controller("CustomReportController",
  function(CustomReportService,subcategoryBucketService,$location,$http) {
    console.log('custom controller loaded');

    var vm=this;

    vm.diagnosis=[];
    vm.cities=[];
    vm.counties=[];
    vm.zipCodes=[];
    vm.states=[];
    vm.socialWorkerId=[];
    vm.socialWorkerClinic=[];
    vm.doctorClinic=[];
    vm.doctorIds=[];

    //gets all diagnosis from the database
    vm.getDiagnosis=function(){
      CustomReportService.getAllDiagnosis().then(function(response){
        var allDiagnosis=response.data;
        allDiagnosis.forEach(function(item){
          vm.diagnosis.push(item.diagnosis);
        })
      });
    };
    vm.getCities=function(){
      CustomReportService.getAllCities().then(function(response){
        var allCities=response.data;
        allCities.forEach(function(item){
          vm.cities.push(item.city);
        })
      });
    };
    vm.getCounties=function(){
      CustomReportService.getAllCounties().then(function(response){
        var allCounties=response.data;
        allCounties.forEach(function(item){
          vm.counties.push(item.county);
        })
      });
    };
    vm.getStates=function(){
      CustomReportService.getAllStates().then(function(response){
        var allStates=response.data;
        allStates.forEach(function(item){
          vm.states.push(item.state);
        })
      });
    };
    vm.getZipCodes=function(){
      CustomReportService.getAllZipCodes().then(function(response){
        var allZipCodes=response.data;
        allZipCodes.forEach(function(item){
          vm.zipCodes.push(item.zip);
        })
      });
    };
    vm.getSwIds=function(){
      CustomReportService.getAllSwIds().then(function(response){
        var allSwIds=response.data;
        allSwIds.forEach(function(item){
          vm.socialWorkerId.push(item.social_worker_id);
        })
      });
    };
    vm.getSwClinics=function(){
      CustomReportService.getAllSwClinics().then(function(response){
        var allSwClinics=response.data;
        allSwClinics.forEach(function(item){
          vm.socialWorkerClinic.push(item.social_worker_clinic);
        })
      });
    };
    vm.getDrClinics=function(){
      CustomReportService.getAllDrClinics().then(function(response){
        var allDrClinics=response.data;
        allDrClinics.forEach(function(item){
          vm.doctorClinic.push(item.doctor_clinic);
        })
      });
    };
    vm.getDrIds=function(){
      CustomReportService.getAllDrIds().then(function(response){
        var allDrIds=response.data;
        allDrIds.forEach(function(item){
          vm.doctorIds.push(item.doctor_id);
        })
      });
    };

    //calls on page load
    vm.getDiagnosis();//gets all diagnosis
    vm.getCities();//gets all cities
    vm.getCounties();//gets all counties
    vm.getStates();//get all states
    vm.getZipCodes();//gets all zip codes
    vm.getSwIds();//get all Social Workers Ids
    vm.getSwClinics();//get all Social Worker clinics
    vm.getDrClinics();//get all doctor clinics
    vm.getDrIds();//get all doctor IDs

    vm.dataSetList=[
      {
        title:'Application Date',
        options:[]
      },
      {
        title:'Application Expiration Date',
        options:[]
      },
      {
        title:'Distribution Date',
        options:[]
      },
      {
        title:'Qualify Amount',
        options:['0','100-300','301-500','501-800','801+']
      },
      {
        title:'Transaction Type',
        options:["General", "Margie's Fund"]
      },
      {
        title:'Diagnosis',
        options: vm.diagnosis
      },
      {
        title:'Cancer Stage',
        options:["Remission","None Specified","IV","III","II","I"]
      },
      {
        title:'Age',
        options:['<18','19-29','30-39','40-49','50-59','60-69','70+']
      },
      {
        title:'Gender',
        options:['Female','Male']
      },
      {
        title:'Ethncity',
        options:['African American or Black', 'American Indian or Alaskan Native',
                'Asian', 'Asian Indian', 'Caucasian', 'Chinese', 'Hispanic', 'Hmong', 'Japanese',
                'Korean', 'Middle Eastern', 'Other', 'Unknown', 'Vietnamese']
      },
      {
        title:'Marital Status',
        options:['Married','Single', 'Widowed', 'Seperated', 'Not specified']
      },
      {
        title:'Veteran',
        options:['Yes','No']
      },
      {
        title:'City',
        options: vm.cities
      },
      {
        title:'County',
        options: vm.counties
      },
      {
        title:'State',
        options: vm.states
      },
      {
        title:'Zip Code',
        options: vm.zipCodes
      },
      {
        title:'Yearly Income',
        options:['0','1-15000','15001-30000','300001-45000','45001-60000','60001-75000','75001+']
      },
      {
        title:'FaCT Family',
        options:['yes','no']
      },
      {
        title:'Reason',
        options:['Cannot work die to treatment','Extreme Circumstances', 'Forced to move/homeless',
                'Has young children', 'High medical costs', 'In school/recently finished', 'Increasing exp. due to treatment',
                'Lost job', 'Other', 'Terminal', 'Waiting for other funds']
      },
      {
        title:'Referred by',
        options:['Brochure', 'Family', 'Friend', 'Internet', 'Nurse', 'Nurse Navigator', 'Oncologist', 'Other', 'Patient Financial Counselor',
                'Patient Navigator', 'Social Worker', 'United Way 211']
      },
      {
        title:'Social Worker ID',
        options: vm.socialWorkerId
      },
      {
        title:'Social Worker Clinic',
        options: vm.socialWorkerClinic
      },
      {
        title:'Doctor ID',
        options: vm.doctorIds
      },
      {
        title:'Doctor Clinic',
        options: vm.doctorClinic
      },
      {
        title:'Does not qualify',
        options: ['True', 'False']
      },
      {
        title:'Does not qualify reason',
        options: ["Already received grant", "Applied too soon (2 years)", "Exceeds income guidelines",
                  "Margie's Fund DNQ", "No cancer diagnosis", "Not in active treatment", "Not in service area"]
      },
      {
        title:'Grant Type',
        options: ['Adjustment', 'Electric Bill Payment', 'Fuel Card', 'Garbage Bill Payment',
                  'Gas Bill Payment', 'Grocery Card', 'Mortgage Payment', 'Phone Bill Payment',
                  'Rent Payment', 'Schwans Food Card', 'Target Card', 'Water Bill Payment', 'Other']
      },
      {
        title:'Fund General',
        options: ['< -800', '-800- -600', '-599- -400', '-399- -200', '-199-1', '0', '1-200', '201-400', '401-600', '600-800', '>800']
      },
      {
        title:'Fund Komen',
        options: ['< -800', '-800- -600', '-599- -400', '-399- -200', '-199-1', '0', '1-200', '201-400', '401-600', '600-800', '>800']
      },
      {
        title:'Fund Brain',
        options: ['< -800', '-800- -600', '-599- -400', '-399- -200', '-199-1', '0', '1-200', '201-400', '401-600', '600-800', '>800']
      },
      {
        title:'Fund Park Nicollet',
        options: ['< -800', '-800- -600', '-599- -400', '-399- -200', '-199-1', '0', '1-200', '201-400', '401-600', '600-800', '>800']
      },
      {
        title:'Fund Lung',
        options: ['< -800', '-800- -600', '-599- -400', '-399- -200', '-199-1', '0', '1-200', '201-400', '401-600', '600-800', '>800']
      },
      {
        title:'Fund Melanoma',
        options: ['< -800', '-800- -600', '-599- -400', '-399- -200', '-199-1', '0', '1-200', '201-400', '401-600', '600-800', '>800']
      },
      {
        title:'Fund Margies',
        options: ['< -800', '-800- -600', '-599- -400', '-399- -200', '-199-1', '0', '1-200', '201-400', '401-600', '600-800', '>800']
      },
      {
        title:'Fund Colon',
        options: ['< -800', '-800- -600', '-599- -400', '-399- -200', '-199-1', '0', '1-200', '201-400', '401-600', '600-800', '>800']
      },
      {
        title:'Fund Total',
        options: ['< -800', '-800- -600', '-599- -400', '-399- -200', '-199-1', '0', '1-200', '201-400', '401-600', '600-800', '>800']
      },
      {
        title:'Fund Qualify Amount',
        options: ['< -800', '-800- -600', '-599- -400', '-399- -200', '-199-1', '0', '1-200', '201-400', '401-600', '600-800', '>800']
      },
    ];  // end of dataSetList object

    // vm.dataSetListCategoryOrder = ['gender', 'age', 'income', 'marital'];
    // trying to order the categories on the html page.

    vm.dataSetSelections=[{title:'no selections'}];
    vm.dataFilterSelections=[{title:'no selections',
                              options:'no selections'}];
    vm.selectedCategory={};

    vm.openSubCats=function(category,option) {
      vm.selectedCategory=category;
      console.log(vm.selectedCategory);
    };

    // vm.addSelection = function(category,option) {
    //   if (vm.dataSetSelections[0].title == 'no selections'){
    //     vm.dataSetSelections=[];
    //   }

// angular.module("AngelApp").controller("CustomReportController", ['$location','$http',
//   function($location,$http) {
// angular.module("AngelApp").controller("CustomReportController", ['subcategoryBucketService','$location','$http',
// function(subcategoryBucketService, $location, $http) {
  //
  //
  // console.log('custom controller loaded');
  //
  // var vm=this;
  //
  //
  // vm.dataSetList=[
  //   {
  //     title:'gender',
  //     options:['female','male']
  //   },
  //   {
  //     title:'age',
  //     options:['20+','30+','40+','50+','60+']
  //   },
  //   {
  //     title:'income',
  //     options:[40000,50000,60000,70000,80000]
  //   },
  //   {
  //     title:'marital_status',
  //     options:['married','single']
  //   },
  // ];  // end of dataSetList object
  vm.columnLimitList=[];
  for(var i=0;i<vm.dataSetList.length;i++){
    vm.columnLimitList[i]=vm.dataSetList[i].title;
  };
  // console.log(vm.columnLimitList);
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

    vm.addToFilters=function(option){
      if (vm.dataFilterSelections[0].options == 'no selections'){
        vm.dataFilterSelections=[];
      }

      var category=vm.selectedCategory.title;
      console.log('category', category);
      console.log('option', option);
      var newItem={
        title:category,
        options:option
        };

      if (vm.dataFilterSelections.length == 0){
        vm.dataFilterSelections.push(newItem);
      } else {
        var dupe = false;
        for (var i = 0; i < vm.dataFilterSelections.length; i++) {
          if (vm.dataFilterSelections[i].options==option){
            console.log("already added");
            dupe=true;
          }
        }
        if (dupe==false){
          vm.dataFilterSelections.push(newItem);
          console.log("adding", newItem);
        }

      };

      console.log(vm.dataFilterSelections);

    };//end of addToFilters

});
