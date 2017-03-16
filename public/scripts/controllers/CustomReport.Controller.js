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
        options:[],
        dateOptions: {flag:true},
      },
      {
        title:'App. Expiration Date',
        options:[],
        dateOptions: {flag:true}
      },
      {
        title:'Distribution Date',
        options:[],
        dateOptions: {flag:true}
      },
      {
        title:'Qualify Amount',
        options:['0-100','101-300','301-500','501-800','801+']
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
        title:'Ethnicity',
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
        options:['0','1-15000','15001-30000','30001-45000','45001-60000','60001-75000','75001+']
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
        title:'Not qualify reason',
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
        options: ['< -800', '-800 -- -600', '-599- -400', '-399- -200', '-199-1', '0', '1-200', '201 -- 400', '401-600', '600-800', '>800']
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

    vm.dataSetSelections=[{title:'no filters selected'}];
    vm.dataFilterSelections=[{title:'no filters selected'}];
    vm.selectedCategory={};

    vm.selected = null;

    vm.openSubCats=function(category,option,$index) {
      vm.selectedCategory=category;
      console.log(vm.selectedCategory);
      vm.selected = $index;
      console.log("selected", vm.selected);
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

  vm.dataSetSelections=[{title:'no filters selected'}];
  vm.columnLimitSelections=['no filters selected'];

  vm.addColumnLimitSelection=function(category){
    if (vm.columnLimitSelections[0] == 'no filters selected'){
      vm.columnLimitSelections=[];
    }
    vm.columnLimitSelections.push(category);
    console.log(vm.columnLimitSelections);
  }

  vm.showHeaders=false;

  vm.addSelection = function(category,option) {
    if (vm.dataSetSelections[0].title == 'no filters selected'){
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
            vm.showHeaders=true;
          };
        };
      };
    } else {
      vm.dataSetSelections.push(
        {
          title:category.title,
          options:[option]
        });
        vm.showHeaders=true;
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
        vm.dataSetSelections=[{title:'no filters selected'}];
      } console.log(vm.dataSetSelections[0]);
    }


    vm.removeCategorySelection=function(category){
      for(var i=0;i<vm.dataSetSelections.length;i++){
        if (vm.dataSetSelections[i].title==category.title){
          vm.dataSetSelections.splice(i,1);
        }
      }console.log(vm.dataSetSelections[0]);
      if(vm.dataSetSelections[0]==undefined){
        vm.dataSetSelections=[{title:'no filters selected'}];
        vm.showHeaders=false;
      }console.log(vm.dataSetSelections[0]);
    }

    vm.removeColumnSelection=function(category){
      for(var i=0;i<vm.columnLimitSelections.length;i++){
        if (vm.columnLimitSelections[i]==category){
          vm.columnLimitSelections.splice(i,1);
        }
      }console.log(vm.columnLimitSelections[0]);
      if(vm.columnLimitSelections[0]==undefined){
        vm.columnLimitSelections=['no filters selected'];
        vm.showHeaders=false;
      }console.log(vm.columnLimitSelections[0]);
    }


    vm.saveReport=function(){
    // this function builds the SQL query string
      var reportString="SELECT ";
      console.log(reportString);
      if (vm.columnLimitSelections!="no filters selected") {
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
// TODO need to add in logic whether patient or distributions table
        // if columnLimitSelections == "no selections"
      }
      console.log(reportString);
      if (vm.dataFilterSelections[0].title == "no filters selected"){
        console.log(reportString);
      } else {
        reportString+="WHERE ";
        for(var j=0; j<vm.dataFilterSelections.length-1; j++){


          // if (vm.dataSetSelections[j].title.toLowerCase() == "age" || vm.dataSetSelections[j].title.toLowerCase() == "yearly income" ||  vm.dataSetSelections[j].title.toLowerCase() == "fund qualify amount" || vm.dataSetSelections[j].title.toLowerCase() == "qualify amount" || vm.dataSetSelections[j].title.toLowerCase() == "app. expiration date" || vm.dataSetSelections[j].title.toLowerCase() == "application date" || vm.dataSetSelections[j].title.toLowerCase() == "distribution date")

          console.log((["age",  "yearly income" , "fund qualify amount" , "qualify amount" , "app. expiration date" , "application date" , "distribution date", "fund general" , "fund komen" , "fund brain" , "fund park nicollet" , "fund lung" , "fund melanoma" , "fund margies" , "fund colon" , "fund total"].indexOf(vm.dataFilterSelections[j].title.toLowerCase()) != -1));

          if (["age",  "yearly income" , "fund qualify amount" , "qualify amount" , "app. expiration date" , "application date" , "distribution date", "fund general" , "fund komen" , "fund brain" , "fund park nicollet" , "fund lung" , "fund melanoma" , "fund margies" , "fund colon" , "fund total"].indexOf(vm.dataFilterSelections[j].title.toLowerCase()) != -1)
          // if it's in the list, send to the bucketservice.
          {
            //write code based on format of these things!!!!
            // example: vm.dataSetSelections[j] = {title: "age", options:["30+","50+"]}

            reportString += subcategoryBucketService.returnString(vm.dataFilterSelections[j]);

          }else{
            for(var i=0;i<vm.dataFilterSelections[j].options.length-1;i++){
              reportString+="("+vm.dataFilterSelections[j].title+"='"+vm.dataFilterSelections[j].options[i]+"') OR "
            }
              reportString+="("+vm.dataFilterSelections[j].title+"='"+vm.dataFilterSelections[j].options[vm.dataFilterSelections[j].options.length-1]+"')";
          }
          reportString+=" AND "; // or OR?
        };
        console.log(reportString);

        if (["age",  "yearly income" , "fund qualify amount" , "qualify amount" , "app. expiration date" , "application date" , "distribution date", "fund general" , "fund komen" , "fund brain" , "fund park nicollet" , "fund lung" , "fund melanoma" , "fund margies" , "fund colon" , "fund total"].indexOf(vm.dataFilterSelections[vm.dataFilterSelections.length-1].title.toLowerCase()) != -1) {

        console.log("asdf",(vm.dataFilterSelections[vm.dataFilterSelections.length-1]));
        // if ( vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "age" || vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "yearly income" || vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "qualify amount" || vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "fund qualify amount" || vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "app. expiration date" || vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "application date" || vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "distribution date") {
          //write code based on format of these things!!!! - DONE!
          // the last filter needs a different end compared to the others.

          reportString += subcategoryBucketService.returnString(vm.dataFilterSelections[vm.dataFilterSelections.length-1]);

        }else{
          for(var i=0;i<vm.dataFilterSelections[vm.dataFilterSelections.length-1].options.length-1;i++){
            reportString+="("+vm.dataFilterSelections[vm.dataFilterSelections.length-1].title+"='"+vm.dataFilterSelections[vm.dataFilterSelections.length-1].options[i]+"') OR "
          }
          reportString+="("+vm.dataFilterSelections[vm.dataFilterSelections.length-1].title+"='"+vm.dataFilterSelections[vm.dataFilterSelections.length-1].options[vm.dataFilterSelections[vm.dataFilterSelections.length-1].options.length-1]+"')";
        }
      }; // end of WHERE filters
      reportString += ";"
      console.log(reportString);


    }; // end of saveReport function



    vm.addToDateFilters = function (category, dateObject) {
      console.log(category, dateObject);
      // category.title = "Application Date"
      // dateObject.startDate = date type
      // dateObject.stopDate = date type --> stopDateString for display and passing  // the subBucket service will do a new Date(stopDateString) & is ok.

      if (!(dateObject == undefined || dateObject.startDate == undefined || dateObject.stopDate == undefined )) {
        // prevents error if there is no dates picked.

        dateObject.startDateString = dateObject.startDate.toString().substring(0,15);
        console.log(dateObject.startDate);

        dateObject.stopDateString = dateObject.stopDate.toString().substring(0,15);

        console.log(dateObject.stopDate);
        if (dateObject.startDate < dateObject.stopDate) {
          vm.addToFilters( dateObject.startDateString + " -- " + dateObject.stopDateString );
        } else {
            vm.addToFilters( dateObject.stopDateString + " -- " + dateObject.startDateString );
        }
      };
    }; // close addToDateFilters function




    vm.showFilters=false;


    vm.addToFilters=function(option){
      if (vm.dataFilterSelections[0].title == 'no filters selected'){
        vm.dataFilterSelections=[];
      }

      var category=vm.selectedCategory.title;
      console.log('category', category);
      console.log('option', option);
      // var newItem={
      //   title:category,
      //   options:option
      //   };
      //
      // if (vm.dataFilterSelections.length == 0){
      //   vm.dataFilterSelections.push(newItem);
      //   vm.showFilters=true;
      // } else {
      //   var dupe = false;
      //   for (var i = 0; i < vm.dataFilterSelections.length; i++) {
      //     if (vm.dataFilterSelections[i].options == option && vm.dataFilterSelections[i].title == category){
      //
      //       console.log("already added");
      //       dupe=true;
      //     }
      //   }
      //   if (dupe==false){
      //     vm.dataFilterSelections.push(newItem);
      //     console.log("adding", newItem);
      //     vm.showFilters=true;
      //   }
      //
      // };

      function isMatch(element,index,array){
        return element.title == category;
      }

      if (vm.dataFilterSelections.some(isMatch)) {
            console.log("here1");
        for(var i=0; i < vm.dataFilterSelections.length; i++) {
          if (vm.dataFilterSelections[i].title == category){
            if (vm.dataFilterSelections[i].options.indexOf(option) == -1) {
              vm.dataFilterSelections[i].options.push(option);
              vm.showHeaders=true;
            };
          };
        };
      } else {
        console.log("here2");
        vm.dataFilterSelections.push(
          {
            title:category,
            options:[option]
          });
          vm.showHeaders=true;
        }

      console.log(vm.dataFilterSelections);

    };//end of addToFilters



    vm.removeFilter=function(optionToRemove){
      console.log("removing,", optionToRemove, " from filters");
      console.log(vm.dataFilterSelections,"filter");

      for (var i = 0; i < vm.dataFilterSelections.length; i++) {

        for (var k = 0; k < vm.dataFilterSelections[i].options.length; k++) {

          console.log(vm.dataFilterSelections[i].options[k],"options");
          if (vm.dataFilterSelections[i].options[k] == optionToRemove){
            vm.dataFilterSelections[i].options.splice(k,1);
          };
        }; // close for k

        if (vm.dataFilterSelections[i].options[0] == undefined) {
          vm.dataFilterSelections.splice(i,1)
        }

      }; // close for i

        if (vm.dataFilterSelections[0]==undefined){
          vm.dataFilterSelections=[{title:'no filters selected'}];
          vm.showFilters=false;
        };
        console.log(vm.dataFilterSelections);
    };

});
