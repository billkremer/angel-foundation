app.service("subcategoryBucketService", function($http){
  var vm = this;
  // functions and data interact primarily with CustomReportController.js

  vm.returnString = function (dataSetSelectionsObject) {
    // example: dataSetSelectionsObject = vm.dataSetSelections[j] = {title: "age", options:["30+","50+"]}
    // if / else-if tree for age, income,

    console.log("dataSetSelectionsObject",dataSetSelectionsObject);

    var whereString = ""; // string to return

    if (dataSetSelectionsObject.title.toLowerCase() == "age") {

      for (var i = 0; i < dataSetSelectionsObject.options.length; i++) {

        if ((typeof dataSetSelectionsObject.options[i]) == "number") {
          whereString += " (CAST (SUBSTRING (CAST (age(date_of_birth) AS varchar(3)), '([0-9]{1,3})') AS INT) < " + dataSetSelectionsObject.options[i] + ")";

        } else if(dataSetSelectionsObject.options[i].charAt(0) == "<" ) {
          whereString += " (CAST (SUBSTRING (CAST (age(date_of_birth) AS varchar(3)), '([0-9]{1,3})') AS INT) < " + (dataSetSelectionsObject.options[i].substring(1)) + ")";
          // for "<18"

        } else if (dataSetSelectionsObject.options[i].charAt(0) == ">" ) {
          whereString += " (CAST (SUBSTRING (CAST (age(date_of_birth) AS varchar(3)), '([0-9]{1,3})') AS INT) > " + (dataSetSelectionsObject.options[i].substring(1)) + ")";
          // for ">70"

        } else if ( dataSetSelectionsObject.options[i].indexOf("+") != -1) {
          whereString += " (CAST (SUBSTRING (CAST (age(date_of_birth) AS varchar(3)), '([0-9]{1,3})') AS INT) > " + (Number.parseInt(dataSetSelectionsObject.options[i])) + ")";
          // for 70+

        } else {
          var ageArrayForString = dataSetSelectionsObject.options[i].split("-"); // "30-40" -> ["30","40"]

          whereString +=" (CAST (SUBSTRING (CAST (age(date_of_birth) AS varchar(3)), '([0-9]{1,3})') AS INT) > " + ageArrayForString[0] + " AND CAST (SUBSTRING (CAST (age(date_of_birth) AS varchar(3)), '([0-9]{1,3})') AS INT) <= " + ageArrayForString[1] + ")";
        };

        if (i < dataSetSelectionsObject.options.length - 1) {
          whereString += " OR "
        };
        console.log(whereString);
      }; // for loop end
    }; // end "age" if

    /* ---------  monthly income section ------    */
    //dataSetSelectionsObject.title.toLowerCase() == "monthly income" ||
    if ( dataSetSelectionsObject.title.toLowerCase() == "income" || dataSetSelectionsObject.title.toLowerCase() == "yearly income" ) {

      console.log("inside income block", dataSetSelectionsObject.options);

      //  title:'Monthly Income', --- Should be yearly!
      //  options:['0','1-15000','15001-30000','300001-45000','45001-60000','60001-75000','75001+']

      // // converts yearly income to monthly, as in the database
      // var whereString = "";
      // var dataSetSelectionsObject = {options: ['< 1000','>15000','15001-30000','30001-45000']};

      for (var j = 0; j < dataSetSelectionsObject.options.length; j++) {

        console.log(typeof dataSetSelectionsObject.options[j]);
        console.log(dataSetSelectionsObject.options[j].toString().charAt(0));

        if ((typeof dataSetSelectionsObject.options[j]) == "number") {
          whereString += " (monthly_income < CAST (" + dataSetSelectionsObject.options[j] + " AS MONEY))";

        } else if (dataSetSelectionsObject.options[j].charAt(0) == "<" ) {
          whereString += " (monthly_income < CAST (" + (Number.parseInt(dataSetSelectionsObject.options[j].substring(1)) / 12) + " AS MONEY))"; // for "< 1000" (Number.parseInt(dataSetSelectionsObject.options[i]))

        } else if (dataSetSelectionsObject.options[j].charAt(0) == ">" ) {
          whereString += " (monthly_income > CAST (" + (Number.parseInt(dataSetSelectionsObject.options[j].substring(1)) / 12) + " AS MONEY))";
          // for "> 100000"

        } else if ( dataSetSelectionsObject.options[j].indexOf("+") != -1) {
          whereString += " (monthly_income > CAST (" + (Number.parseInt(dataSetSelectionsObject.options[j]) / 12) + " AS MONEY))";
          // for "100000+"

        } else if ( dataSetSelectionsObject.options[j] == "0" || dataSetSelectionsObject.options[j] == "") {
          whereString += " monthly_income = CAST(0 AS MONEY)";
          // for "O" or ""

        } else {
          var incomeArrayForString = dataSetSelectionsObject.options[j].split("-");
          // "45001-60000" -> ["45001","60000"]

          whereString +=" (monthly_income > CAST(" + incomeArrayForString[0]/12 + " AS MONEY) AND monthly_income <= CAST(" + incomeArrayForString[1]/12 + " as MONEY))";
        };

        if (j < dataSetSelectionsObject.options.length - 1) {
          whereString += " OR ";
        };
        console.log(whereString);
      }; // for loop end
    }; // end if "monthly income"


    /* ---------  qualify amount section ------    */

    if ( dataSetSelectionsObject.title.toLowerCase() == "qualify amount" ) {

      // title:'Qualify Amount',
      // options:['0','100-300','301-500','501-800','801+']
      // var whereString = "";
      // var dataSetSelectionsObject = {options: ['< 100','501-800','801+']};

      for (var k = 0; k < dataSetSelectionsObject.options.length; k++) {

        if ((typeof dataSetSelectionsObject.options[k]) == "number") {
          whereString += " (qualify_amount < CAST (" + dataSetSelectionsObject.options[k] + " AS MONEY))";

        } else if (dataSetSelectionsObject.options[k].charAt(0) == "<" ) {
          whereString += " (qualify_amount < CAST (" + (Number.parseInt(dataSetSelectionsObject.options[k].substring(1))) + " AS MONEY))"; // for "< 1000" (Number.parseInt(dataSetSelectionsObject.options[i]))

        } else if (dataSetSelectionsObject.options[k].charAt(0) == ">" ) {
          whereString += " (qualify_amount > CAST (" + (Number.parseInt(dataSetSelectionsObject.options[k].substring(1))) + " AS MONEY))";
          // for "> 100000"

        } else if ( dataSetSelectionsObject.options[k].indexOf("+") != -1) {
          whereString += " (qualify_amount > CAST (" + (Number.parseInt(dataSetSelectionsObject.options[k])) + " AS MONEY))";
          // for "100000+"

        } else if ( dataSetSelectionsObject.options[k] == "0" || dataSetSelectionsObject.options[k] == "") {
          whereString = " qualify_amount = CAST(0 AS MONEY)";
          // for "O" or ""

        } else {
          var qualArrayForString = dataSetSelectionsObject.options[k].split("-");
          // "45001-60000" -> ["45001","60000"]

          whereString +=" (qualify_amount > CAST(" + qualArrayForString[0] + " AS MONEY) AND qualify_amount <= CAST(" + qualArrayForString[1] + " as MONEY))";
        };

        if (k < dataSetSelectionsObject.options.length - 1) {
          whereString += " OR ";
        };
        console.log(whereString);
      }; // for loop end
    }; // end if "qualify amount income"


    /* ------------ expiration date section ------------    */

    if ( dataSetSelectionsObject.title.toLowerCase() == "exp date" ) {

      // title:'exp date',
      // options:['date1', 'date2']
      //  var whereString = "";
      //  var dataSetSelectionsObject = {options: ['1 Jan 2010','5/12/2016']};



      var expStartDate = (new Date(dataSetSelectionsObject.options[0]).toISOString().substring(0,10));
      var expStopDate = (new Date(dataSetSelectionsObject.options[1]).toISOString().substring(0,10));

      console.log(expStartDate, expStopDate);

      if (expStartDate < expStopDate) {
        whereString = "(expiration_date >= '" + expStartDate + "' AND expiration_date <= '" + expStopDate + "')";
      } else {
        whereString = "(expiration_date >= '" + expStopDate + "' AND expiration_date <= '" + expStartDate + "')";
      };


      console.log(whereString);

    }; // end if "expiration date"



    /* ------------ application  date section ------------    */
    if ( dataSetSelectionsObject.title.toLowerCase() == "application date" ) {

      // title:'app date',
      // options:['date1 -- date2', 'date3 -- date4']
      //  var whereString = "";
      //  var dataSetSelectionsObject = {options: ['1 Jan 2010 -- 5/12/2016']};
      var appStartDate = new Date();
      var appStopDate = new Date();
      var appDateArray = []

      for (var m = 0; m < dataSetSelectionsObject.options.length; m++) {

        appDateArray = dataSetSelectionsObject.options[m].split(" -- ");

  // 'date3 -- date4'.split(" -- "); // ["date3","date4"]

        appStartDate = (new Date(appDateArray[0]).toISOString().substring(0,10));
        appStopDate = (new Date(appDateArray[1]).toISOString().substring(0,10));

        console.log(appStartDate, appStopDate);

        if (appStartDate < appStopDate) {
          whereString = "(application_date >= '" + appStartDate + "' AND application_date <= '" + appStopDate + "')";
        } else {
          whereString = "(application_date >= '" + appStopDate + "' AND application_date <= '" + appStartDate + "')";
        };


        console.log(whereString);

        if ( m < dataSetSelectionsObject.options.length-1) {
          whereString += " OR ";
        }; // connects all the potential strings

      }; // end for loop
    }; // end if "application date"


    return whereString;

  }; // end returnString function





  // vm.getBucket = function (dataObject) {
  //   // dataObject = {dataCategory: "age", dataOption: "", data}?
  //
  //
  // }; // closes getBucket function



  // put each into a function that takes in a value and returns the bucket name
  // or function takes in an array of values and returns an array of counts.
  // or function takes in ...

  /* this section creates lower and upper amounts for the qualifying amount bins */
  /* change these values if new buckets are desired */
  // vm.qualifyingAmountLowerUpperObjectArray = [ { qualAmtRange: 0,
  //                                                lower: 0,
  //                                                upper: 300 },
  //                                              { qualAmtRange: 300,
  //                                                lower: 300,
  //                                                upper: 600 },
  //                                              { qualAmtRange: 600,
  //                                                lower: 600,
  //                                                upper: 900 },
  //                                              { qualAmtRange: 900,
  //                                                lower: 900,
  //                                                upper: 100000 } ]; // highest catchall
  //
  //
  //         vm.qualAmtBuckets = function (qualAmtsData) {
  //           // qualAmtsData is an array of qualifying amounts from the query to be sorted
  //           // example: qualAmtsData = [200, 200, 200, 400, 300, 850, 0, 0, 600]
  //
  //           // initialize the bucket array, based on the initial declaration above.
  //           vm.qualAmtsDataBucketArray = []; // clears before remaking.
  //
  //           for (var p = 0; p < vm.qualifyingAmountLowerUpperObjectArray.length; p++) {
  //             vm.qualAmtsDataBucketArray.push({ qualAmtRange: vm.qualifyingAmountLowerUpperObjectArray[p].qualAmtRange,
  //               numInBucket: 0});
  //
  //             }; // end for p
  //             // in each item of the lower, upper array, copy the qualAmtRange value,
  //             // and add the numInBucket value.
  //
  //
  //             // should be more or less equivalent to below if buckets stay the same.
  //             //  var qualAmtsDataBucketArray = [ { qualAmtRange:0,
  //             //                                    numInBucket: 0},
  //             //                                  { qualAmtRange:300,
  //             //                                    numInBucket: 0},
  //             //                                  { qualAmtRange:600,
  //             //                                    numInBucket: 0},
  //             //                                  { qualAmtRange:900,
  //             //                                    numInBucket: 0} ];
  //
  //             for (var k = 0; k < qualAmtsData.length; k++) {
  //               val = qualAmtsData[k];
  //
  //               for (var m = 0; m < vm.qualifyingAmountLowerUpperObjectArray.length; m++) {
  //                 if (val >= vm.qualifyingAmountLowerUpperObjectArray[m].lower && val < vm.qualifyingAmountLowerUpperObjectArray[m].upper) {
  //
  //                   var n = vm.qualAmtsDataBucketArray.findIndex(function (x) { return x.qualAmtRange == vm.qualifyingAmountLowerUpperObjectArray[m].qualAmtRange };
  //
  //                   vm.qualAmtsDataBucketArray[n].numInBucket++; //adds one to the bucket
  //
  //                 }; // end if
  //               }; // end for m
  //             }; // end for k
  //
  //           }; // end vm.qualAmtBuckets function
  //
  //
  //
  //
  //           /* this section creates lower and upper amounts for the income bins */
  //           vm.incomeLowerUpperObjectArray = [ { incomeRange: 0,
  //             lower: 0,
  //             upper: 10000 },
  //             { incomeRange: 10000,
  //               lower: 10000,
  //               upper: 20000 },
  //               { incomeRange: 20000,
  //                 lower: 20000,
  //                 upper: 30000 },
  //                 { incomeRange: 30000,
  //                   lower: 30000,
  //                   upper: 40000 },
  //                   { incomeRange: 40000,
  //                     lower: 40000,
  //                     upper: 50000 },
  //                     { incomeRange: 50000,
  //                       lower: 50000,
  //                       upper: 60000 },
  //                       { incomeRange: 60000,
  //                         lower: 60000,
  //                         upper: 70000 },
  //                         { incomeRange: 70000,
  //                           lower: 70000,
  //                           upper: 80000 },
  //                           { incomeRange: 80000,
  //                             lower: 80000,
  //                             upper: 90000 },
  //                           { incomeRange: 90000,
  //                             lower: 90000,
  //                             upper: 100000 },
  //                           { incomeRange: 100000,
  //                             lower: 100000,
  //                             upper: 110000000 } ]; // highest catchall
  //
  /* ---------- Don't really need anymore?  ---------- */

  // vm.setAgeArray = function () {
  // // this function sets the array of age buckets for the age based on the current date
  //
  // vm.ageStartStopObjectArray = [];
  // // = [{ageRange: ageOption, startDate: "", stopDate: ""}];
  //
  // today = new Date();
  // startDate = new Date();
  // stopDate = new Date();
  //
  // vm.ageStartStopObjectArray.push( {  ageRange: '<18',
  //                                     stopDate: new Date(today),
  //                                     startDate: new Date(startDate.setFullYear(today.getFullYear() - 19))} ,
  //                                   { ageRange: '19-29',
  //                                     stopDate: new Date(stopDate.setFullYear(today.getFullYear() - 19)),
  //                                     startDate: new Date(startDate.setFullYear(today.getFullYear() - 30))} ,
  //                                   { ageRange: '20-29',
  //                                     stopDate: new Date(stopDate.setFullYear(today.getFullYear() - 20)),
  //                                     startDate: new Date(startDate.setFullYear(today.getFullYear() - 30))} ,
  //                                   { ageRange: '30-39',
  //                                     stopDate: new Date(stopDate.setFullYear(today.getFullYear() - 30)),
  //                                     startDate: new Date(startDate.setFullYear(today.getFullYear() - 40))} ,
  //                                   { ageRange: '40-49',
  //                                     stopDate: new Date(stopDate.setFullYear(today.getFullYear() - 40)),
  //                                     startDate: new Date(startDate.setFullYear(today.getFullYear() - 50))} ,
  //                                   { ageRange: '50-59',
  //                                     stopDate: new Date(stopDate.setFullYear(today.getFullYear() - 50)),
  //                                     startDate: new Date(startDate.setFullYear(today.getFullYear() - 60))} ,
  //                                   { ageRange: '60-69',
  //                                     stopDate: new Date(stopDate.setFullYear(today.getFullYear() - 60)),
  //                                     startDate: new Date(startDate.setFullYear(today.getFullYear() - 70))} ,
  //                                   { ageRange: '70-79',
  //                                     stopDate: new Date(stopDate.setFullYear(today.getFullYear() - 70)),
  //                                     startDate: new Date(startDate.setFullYear(today.getFullYear() - 80))} ,
  //                                   { ageRange: '70+',
  //                                     stopDate: new Date(stopDate.setFullYear(today.getFullYear() - 70)),
  //                                     startDate: new Date(startDate.setFullYear(today.getFullYear() - 130))} ,
  //                                   { ageRange: '80+',
  //                                     stopDate: new Date(stopDate.setFullYear(today.getFullYear() - 80)),
  //                                     startDate: new Date(startDate.setFullYear(today.getFullYear() - 130))} ,
  //                                   { ageRange: 'All',
  //                                     stopDate: new Date(today),
  //                                     startDate: new Date(startDate.setFullYear(today.getFullYear() - 130))}
  //                                   )
  //
  //       //
  //       // ageStartStopObjectArray.push({ageRange: ageOption, startDate: new Date(startDate), stopDate: new Date(stopDate)});
          //
          // }; // end setDateArray function

          // vm.setAgeArray(); // resets the array every time the controller is loaded.
          // may not need anymore

          /* ------------- may not need anymore ------------ */

          //  // TODO - fix req.body by doing a post or passing somehting else in.
          // /* this section creates start and stop dates for the age bins */
          // /* because the patients age depends on their DOB and the current date, it must be calculated at the time of the report */
          //   var i = req.body.dataSetSelections.findIndex(function (x) { return x.title == "age" }); // gets the index for the age array
          //
          //   var ageArray = req.body.dataSetSelections[i]; // array of ages selected for report
          //   // for example ageArray = ['>18','19-29','30-39','40-49','50-59','60-69','70+']
          //
          //   vm.ageStartStopObjectArray = [];
          //   // = [{ageRange: ageOption, startDate: "", stopDate: ""}];
          //   // converts ages to dates.
          //   // title:'age',
          //   // options:['>18','19-29','30-39','40-49','50-59','60-69','70+']
          //
          //   for (var j = 0; j < ageArray.length; j++) {
          //
          //     var ageOption = ageArray[j];
          //
          //     var stopDate = new Date();
          //     var startDate = new Date();
          //
          //     switch (ageOption) {
          //       case '>18':
          //         stopDate = stopDate;
          //         startDate = startDate.setFullYear(startDate.getFullYear() - 19);
          //         break;
          //       case '19-29':
          //         stopDate = stopDate.setFullYear(stopDate.getFullYear() - 19)
          //         startDate = startDate.setFullYear(startDate.getFullYear() - 29);
          //         break;
          //       case '30-39':
          //         stopDate = stopDate.setFullYear(stopDate.getFullYear() - 29)
          //         startDate = startDate.setFullYear(startDate.getFullYear() - 39);
          //         break;
          //       case '40-49':
          //         stopDate = stopDate.setFullYear(stopDate.getFullYear() - 39)
          //         startDate = startDate.setFullYear(startDate.getFullYear() - 49);
          //         break;
          //       case '50-59':
          //         stopDate = stopDate.setFullYear(stopDate.getFullYear() - 49)
          //         startDate = startDate.setFullYear(startDate.getFullYear() - 59);
          //         break;
          //       case '60-69':
          //         stopDate = stopDate.setFullYear(stopDate.getFullYear() - 59)
          //         startDate = startDate.setFullYear(startDate.getFullYear() - 69);
          //         break;
          //       case '70-79':
          //         stopDate = stopDate.setFullYear(stopDate.getFullYear() - 69)
          //         startDate = startDate.setFullYear(startDate.getFullYear() - 79);
          //         break;
          //       case '80+':
          //         stopDate = stopDate.setFullYear(stopDate.getFullYear() - 79)
          //         startDate = startDate.setFullYear(startDate.getFullYear() - 130);
          //         break;
          //       case '70+':
          //         stopDate = stopDate.setFullYear(stopDate.getFullYear() - 69)
          //         startDate = startDate.setFullYear(startDate.getFullYear() - 130);
          //         break;
          //       default:
          //         stopDate = stopDate;
          //         startDate = startDate.setFullYear(startDate.getFullYear() - 130);
          //       // oldest possible people?
          //     }; // end ageOption switch
          //
          //     console.log(new Date(stopDate), new Date(startDate));
          //
          //     ageStartStopObjectArray.push({ageRange: ageOption, startDate: new Date(startDate), stopDate: new Date(stopDate)});
          //
          //   }; // end for loop



}); // end of service.
