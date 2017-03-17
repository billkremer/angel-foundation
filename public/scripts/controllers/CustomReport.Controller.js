angular.module("AngelApp").controller("CustomReportController",
  function(CustomReportService,subcategoryBucketService,$location,$http) {

    var verbose = true;

    if (verbose) console.log('custom controller loaded');

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
        table: 'patient'
      },
      {
        title:'App. Expiration Date',
        options:[],
        dateOptions: {flag:true},
        table: 'patient'
      },
      {
        title:'Distribution Date',
        options:[],
        dateOptions: {flag:true},
        table: 'distributions'
      },
      {
        title:'Qualify Amount',
        options:['0-100','101-300','301-500','501-800','> 801'],
        table: 'patient'
      },
      {
        title:'Transaction Type',
        options:["General", "Margie's Fund"],
        table: 'patient'
      },
      {
        title:'Diagnosis',
        options: vm.diagnosis,
        table: 'patient'
      },
      {
        title:'Cancer Stage',
        options:["Remission","None Specified","IV","III","II","I"],
        table: 'patient'
      },
      {
        title:'Age',
        options:['< 18','19-29','30-39','40-49','50-59','60-69','> 70'],
        table: 'patient'
      },
      {
        title:'Gender',
        options:['Female','Male'],
        table: 'patient'
      },
      {
        title:'Ethnicity',
        options:['African American or Black', 'American Indian or Alaskan Native',
                'Asian', 'Asian Indian', 'Caucasian', 'Chinese', 'Hispanic', 'Hmong', 'Japanese',
                'Korean', 'Middle Eastern', 'Other', 'Unknown', 'Vietnamese'],
        table: 'patient'
      },
      {
        title:'Marital Status',
        options:['Married','Single', 'Widowed', 'Seperated', 'Not specified'],
        table: 'patient'
      },
      {
        title:'Veteran',
        options:['Yes','No'],
        table: 'patient'
      },
      {
        title:'City',
        options: vm.cities,
        table: 'patient'
      },
      {
        title:'County',
        options: vm.counties,
        table: 'patient'
      },
      {
        title:'State',
        options: vm.states,
        table: 'patient'
      },
      {
        title:'Zip Code',
        options: vm.zipCodes,
        table: 'patient'
      },
      {
        title:'Yearly Income',
        options:['0','1-15000','15001-30000','30001-45000','45001-60000','60001-75000','> 75001'],
        table: 'patient'
      },
      {
        title:'Household Count',
        options: ['0','1-3','4-6','6-8','>8'],
        table: 'patient'
      },
      {
        title:'FaCT Family',
        options:['yes','no'],
        table: 'patient'
      },
      {
        title:'Reason',
        options:['Cannot work due to treatment','Extreme Circumstances', 'Forced to move/homeless',
                'Has young children', 'High medical costs', 'In school/recently finished', 'Increasing exp. due to treatment',
                'Lost job', 'Other', 'Terminal', 'Waiting for other funds'],
        table: 'patient'
      },
      {
        title:'Referred by',
        options:['Brochure', 'Family', 'Friend', 'Internet', 'Nurse', 'Nurse Navigator', 'Oncologist', 'Other', 'Patient Financial Counselor',
                'Patient Navigator', 'Social Worker', 'United Way 211'],
        table: 'patient'
      },
      {
        title:'Social Worker ID',
        options: vm.socialWorkerId,
        table: 'patient'
      },
      {
        title:'Social Worker Clinic',
        options: vm.socialWorkerClinic,
        table: 'patient'
      },
      {
        title:'Doctor ID',
        options: vm.doctorIds,
        table: 'patient'
      },
      {
        title:'Doctor Clinic',
        options: vm.doctorClinic,
        table: 'patient'
      },
      {
        title:'Does not qualify',
        options: ['True', 'False'],
        table: 'patient'
      },
      {
        title:'Not qualify reason',
        options: ["Already received grant", "Applied too soon (2 years)", "Exceeds income guidelines",
                  "Margie's Fund DNQ", "No cancer diagnosis", "Not in active treatment", "Not in service area"],
        table: 'patient'
      },
      {
        title:'Grant Type',
        options: ['Adjustment', 'Electric Bill Payment', 'Fuel Card', 'Garbage Bill Payment',
                  'Gas Bill Payment', 'Grocery Card', 'Mortgage Payment', 'Phone Bill Payment',
                  'Rent Payment', 'Schwans Food Card', 'Target Card', 'Water Bill Payment', 'Other'],
        table: 'distributions'
      },
      {
        title:'Fund General',
        options: ['< 0', '0', '1-200', '201-400', '401-600', '600-800', '> 800'],
        table: 'distributions'
      },
      {
        title:'Fund Komen',
        options: ['< 0', '1-200', '201-400', '401-600', '600-800', '> 800'],
        table: 'distributions'
      },
      {
        title:'Fund Brain',
        options: ['< 0', '1-200', '201-400', '401-600', '600-800', '> 800'],
        table: 'distributions'
      },
      {
        title:'Fund Park Nicollet',
        options: ['< 0', '1-200', '201-400', '401-600', '600-800', '> 800'],
        table: 'distributions'
      },
      {
        title:'Fund Lung',
        options: ['< 0', '1-200', '201-400', '401-600', '600-800', '> 800'],
        table: 'distributions'
      },
      {
        title:'Fund Melanoma',
        options: ['< 0', '1-200', '201 -- 400', '401-600', '600-800', '> 800'],
        table: 'distributions'
      },
      {
        title:'Fund Margies',
        options: ['< 0', '1-200', '201-400', '401-600', '600-800', '> 800'],
        table: 'distributions'
      },
      {
        title:'Fund Colon',
        options: ['< 0', '1-200', '201-400', '401-600', '600-800', '> 800'],
        table: 'distributions'
      },
      {
        title:'Fund Total',
        options: ['< 0', '1-200', '201-400', '401-600', '600-800', '> 800'],
        table: 'distributions'
      },
      {
        title:'Fund Qualify Amount',
        options: ['< 0', '1-200', '201-400', '401-600', '600-800', '> 800'],
        table: 'distributions'
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
      if (verbose) console.log(vm.selectedCategory);
      vm.selected = $index;
      if (verbose) console.log("selected", vm.selected);
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
    if (verbose) console.log(vm.columnLimitSelections);
  }

  vm.showHeaders=false;

  vm.addSelection = function(category,option,table) {
    if (vm.dataSetSelections[0].title == 'no filters selected'){
      vm.dataSetSelections=[];
    }

    if (verbose) console.log('category', category);
    if (verbose) console.log('option', option);
    if (verbose) console.log('table', category.table);

    function isMatch(element,index,array){
      return element.title == category.title;
    }

    if (vm.dataSetSelections.some(isMatch)) {
      for(var i=0; i < vm.dataSetSelections.length; i++) {
        if (vm.dataSetSelections[i].title == category.title){
          if (vm.dataSetSelections[i].options.indexOf(option) == -1) {
            vm.dataSetSelections[i].options.push(
              {
                title: category.title,
                options: option,
                table: category.table
              });
            vm.showHeaders=true;
          };
        };
      };
    } else {
      vm.dataSetSelections.push(
        {
          title:category.title,
          options: option,
          table: category.table
        });
        vm.showHeaders=true;
      }
      if (verbose) console.log(vm.dataSetSelections);
    }; // close addSelection


    vm.removeOptionSelection = function(category,option){
      for(var i=0;i<vm.dataSetSelections.length;i++){
        if (vm.dataSetSelections[i].title == category.title){
          var index = vm.dataSetSelections[i].options.indexOf(option);
          vm.dataSetSelections[i].options.splice(index,1);
        }
      } if (verbose) console.log(vm.dataSetSelections[0]);
      if(vm.dataSetSelections[0] == undefined){
        vm.dataSetSelections=[{title:'no filters selected'}];
      } if (verbose) console.log(vm.dataSetSelections[0]);
    }


    vm.removeCategorySelection=function(category){
      for(var i=0;i<vm.dataSetSelections.length;i++){
        if (vm.dataSetSelections[i].title==category.title){
          vm.dataSetSelections.splice(i,1);
        }
      }if (verbose) console.log(vm.dataSetSelections[0]);
      if(vm.dataSetSelections[0]==undefined){
        vm.dataSetSelections=[{title:'no filters selected'}];
        vm.showHeaders=false;
      }if (verbose) console.log(vm.dataSetSelections[0]);
    }

    vm.removeColumnSelection=function(category){
      for(var i=0;i<vm.columnLimitSelections.length;i++){
        if (vm.columnLimitSelections[i]==category){
          vm.columnLimitSelections.splice(i,1);
        }
      }if (verbose) console.log(vm.columnLimitSelections[0]);
      if(vm.columnLimitSelections[0]==undefined){
        vm.columnLimitSelections=['no filters selected'];
        vm.showHeaders=false;
      }if (verbose) console.log(vm.columnLimitSelections[0]);
    }

    var table=[]; // this variable is used in saveReport when choosing the database tables.

    vm.saveReport=function(reportNameForSaving){
    // this function builds the SQL query string
      var reportString="SELECT ";
      if (verbose) console.log(reportString);
      if (verbose) console.log(vm.dataSetSelections);
      if (vm.dataSetSelections[0].title != "no filters selected") {
        for (var i=0;i<vm.dataSetSelections.length-1;i++) {
          if (vm.dataSetSelections[i].title.toLowerCase() == "app. expiration date") {
            reportString += " expiration_date, ";
          } else if (vm.dataSetSelections[i].title.toLowerCase() == "fund qualify amount") {
            reportString += " qualify_amount, ";
          } else if (vm.dataSetSelections[i].title.toLowerCase() == "zip code") {
            reportString += " zip, ";
          } else if (vm.dataSetSelections[i].title.toLowerCase() == "yearly income") {
            reportString += " monthly_income, ";
          } else if (vm.dataSetSelections[i].title.toLowerCase() == "not qualify reason") {
            reportString += " does_not_qualify_reason, ";
          } else if (vm.dataSetSelections[i].title.toLowerCase() == "age") {
            reportString += " age(date_of_birth), ";
          } else {
            reportString+=(vm.dataSetSelections[i].title.toLowerCase().split(" ").join("_")+", ");
          }; // last else
        }; // end of for

        if (vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "app. expiration date") {
          reportString += " expiration_date ";
        } else if (vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "fund qualify amount") {
          reportString += " qualify_amount ";
        } else if (vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "zip code") {
          reportString += " zip ";
        } else if (vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "yearly income") {
          reportString += " monthly_income ";
        } else if (vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "not qualify reason") {
          reportString += " does_not_qualify_reason ";
        } else if (vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "age") {
          reportString += " age(date_of_birth) ";
        } else {
          reportString+=(vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase().split(" ").join("_") + " ");
        };

//
// var titleForQ = dataSetSelectionsObject.title.toLowerCase().split(" ").join("_");

      if (verbose) console.log(vm.dataSetSelections, vm.dataFilterSelections);

        var table=[];
        var bothTables=false;
        var dbTable='';
        for (var i = 0; i < vm.dataSetSelections.length; i++) {
          table.push(vm.dataSetSelections[i].table);
                  if (verbose) console.log("table1", table);
        }
        for (var j = 0; j < vm.dataFilterSelections.length; j++) {
          table.push(vm.dataFilterSelections[j].table);
                  if (verbose) console.log("table2", table);
        }

        if (verbose) console.log("table", table);

        if (table.includes('patient')){
          if (verbose) console.log("it has patient");
        }
        if (table.includes('distributions')) {
          if (verbose) console.log("it has distributions");
        }
        if (table.includes('distributions') && table.includes('patient')){
          if (verbose) console.log("it has both!!!!");
          bothTables=true;
        }

        if (bothTables==true) {
          reportString+=' FROM (SELECT DISTINCT ON (patient.patient_id) * FROM patient ) as p FULL JOIN distributions ON p.patient_id = distributions.patient_id ';
        } else {
          dbTable=table[0];
          reportString+=' FROM '+dbTable;
        }

          // if (vm.dataSetSelections[i].table!='patient'){
          //   reportString+="FROM distributions ";
          // }
          // if (vm.dataSetSelections[i].table!='distributions'){
          //   reportString+="FROM patient";
          // }
          // if (vm.dataSetSelections)
          // }



        if (verbose) console.log(reportString);
// table selecting section end
      } else {

        reportString = "SELECT * FROM patient ";

      }
      if (verbose) console.log(reportString);


      if (vm.dataFilterSelections[0].title == "no filters selected"){
        if (verbose) console.log(reportString);
      } else {


        // this builds the string where filters are added
        reportString+=" WHERE ";
        for(var j=0; j<vm.dataFilterSelections.length-1; j++){


          // if (vm.dataSetSelections[j].title.toLowerCase() == "age" || vm.dataSetSelections[j].title.toLowerCase() == "yearly income" ||  vm.dataSetSelections[j].title.toLowerCase() == "fund qualify amount" || vm.dataSetSelections[j].title.toLowerCase() == "qualify amount" || vm.dataSetSelections[j].title.toLowerCase() == "app. expiration date" || vm.dataSetSelections[j].title.toLowerCase() == "application date" || vm.dataSetSelections[j].title.toLowerCase() == "distribution date")

          if (verbose) console.log((["age",  "yearly income" , "fund qualify amount" , "qualify amount" , "app. expiration date" , "application date" , "distribution date", "fund general" , "fund komen" , "fund brain" , "fund park nicollet" , "fund lung" , "fund melanoma" , "fund margies" , "fund colon" , "fund total"].indexOf(vm.dataFilterSelections[j].title.toLowerCase()) != -1));


// if the filter needs special fixing - spaces in name, different name between table and column, age is not in the table -- it is a function within postgres.
          if (["age",  "yearly income" , "fund qualify amount" , "qualify amount" , "app. expiration date" , "application date" , "distribution date", "fund general" , "fund komen" , "fund brain" , "fund park nicollet" , "fund lung" , "fund melanoma" , "fund margies" , "fund colon" , "fund total"].indexOf(vm.dataFilterSelections[j].title.toLowerCase()) != -1)
          // if it's in the list, send to the bucketservice.
          {
            //write code based on format of these things!!!!
            // example: vm.dataSetSelections[j] = {title: "age", options:["30+","50+"]}

            reportString += subcategoryBucketService.returnString(vm.dataFilterSelections[j]);

          }else{
            // no special handling, put OR between all the filters
            for(var i=0;i<vm.dataFilterSelections[j].options.length-1;i++){
              reportString+="("+vm.dataFilterSelections[j].title.toLowerCase().split(" ").join("_") +" = '" + vm.dataFilterSelections[j].options[i] + "') OR "
            }
              reportString+="("+vm.dataFilterSelections[j].title.toLowerCase().split(" ").join("_") + "='"+vm.dataFilterSelections[j].options[vm.dataFilterSelections[j].options.length-1]+"')";
          }
          reportString+=" AND "; // or OR?
        };
        if (verbose) console.log(reportString);

        // if it's the last filter in the category, no AND
        if (["age",  "yearly income" , "fund qualify amount" , "qualify amount" , "app. expiration date" , "application date" , "distribution date", "fund general" , "fund komen" , "fund brain" , "fund park nicollet" , "fund lung" , "fund melanoma" , "fund margies" , "fund colon" , "fund total"].indexOf(vm.dataFilterSelections[vm.dataFilterSelections.length-1].title.toLowerCase()) != -1) {

        if (verbose) console.log("filters",(vm.dataFilterSelections[vm.dataFilterSelections.length-1]));
        // if ( vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "age" || vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "yearly income" || vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "qualify amount" || vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "fund qualify amount" || vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "app. expiration date" || vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "application date" || vm.dataSetSelections[vm.dataSetSelections.length-1].title.toLowerCase() == "distribution date") {
          //write code based on format of these things!!!! - DONE!
          // the last filter needs a different end compared to the others.

          reportString += subcategoryBucketService.returnString(vm.dataFilterSelections[vm.dataFilterSelections.length-1]);

        }else{

          reportString += " ( "

          // ORs between the filters per category
          for(var i=0;i<vm.dataFilterSelections[vm.dataFilterSelections.length-1].options.length-1;i++){
            reportString+="("+vm.dataFilterSelections[vm.dataFilterSelections.length-1].title.toLowerCase().split(" ").join("_")+"='"+vm.dataFilterSelections[vm.dataFilterSelections.length-1].options[i]+"') OR "
          }
          // the last filter doesn't take an OR
          reportString+="("+vm.dataFilterSelections[vm.dataFilterSelections.length-1].title.toLowerCase().split(" ").join("_")+"='"+vm.dataFilterSelections[vm.dataFilterSelections.length-1].options[vm.dataFilterSelections[vm.dataFilterSelections.length-1].options.length-1]+"') )";
        }
      }; // end of WHERE filters
      reportString += ";"
      if (verbose) console.log(reportString);

// TODO insert code to actually save the reportString to the database

  var objectToPost = {reportQuery: reportString, reportName: reportNameForSaving}

  $http.post('/data',objectToPost).then(function(response) {
    alertify.success("Saved to Standard Reports")
  });




    }; // end of saveReport function



    vm.addToDateFilters = function (category, dateObject) {
      if (verbose) console.log(category, dateObject);
      // category.title = "Application Date"
      // dateObject.startDate = date type
      // dateObject.stopDate = date type --> stopDateString for display and passing  // the subBucket service will do a new Date(stopDateString) & is ok.

      if (!(dateObject == undefined || dateObject.startDate == undefined || dateObject.stopDate == undefined )) {
        // prevents error if there is no dates picked.

        dateObject.startDateString = dateObject.startDate.toString().substring(0,15);
        if (verbose) console.log(dateObject.startDate);

        dateObject.stopDateString = dateObject.stopDate.toString().substring(0,15);

        if (verbose) console.log(dateObject.stopDate);
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
      var table=vm.selectedCategory.table;
      if (verbose) console.log('category', category);
      if (verbose) console.log('option', option);

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
// =======
//       var newItem={
//         title:category,
//         options:option,
//         table:table
//         };
// >>>>>>> master

      if (vm.dataFilterSelections.some(isMatch)) {
        for(var i=0; i < vm.dataFilterSelections.length; i++) {
          if (vm.dataFilterSelections[i].title == category){
            if (vm.dataFilterSelections[i].options.indexOf(option) == -1) {
              vm.dataFilterSelections[i].options.push(option);
              vm.showHeaders=true;
            };
          };
        };
      } else {
        vm.dataFilterSelections.push(
          {
            title:category,
            options:[option],
            table: table
          });
          vm.showHeaders=true;
        }

      if (verbose) console.log(vm.dataFilterSelections);

    };//end of addToFilters



    vm.removeFilter=function(optionToRemove){
      if (verbose) console.log("removing,", optionToRemove, " from filters");
      if (verbose) console.log(vm.dataFilterSelections,"filter selections");

      for (var i = 0; i < vm.dataFilterSelections.length; i++) {

        for (var k = 0; k < vm.dataFilterSelections[i].options.length; k++) {

          if (verbose) console.log(vm.dataFilterSelections[i].options[k],"options");
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
        if (verbose) console.log(vm.dataFilterSelections);
    };

});
