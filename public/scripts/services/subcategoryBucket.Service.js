app.service("subcategoryBucketService", function($http){
  var vm = this;


// put each into a function that takes in a value and returns the bucket name
// or function takes in an array of values and returns an array of counts.
// or function takes in ...

/* this section creates lower and upper amounts for the qualifying amount bins */
/* change these values if new buckets are desired */
vm.qualifyingAmountLowerUpperObjectArray = [ { qualAmtRange: 0,
                                               lower: 0,
                                               upper: 300 },
                                             { qualAmtRange: 300,
                                               lower: 300,
                                               upper: 600 },
                                             { qualAmtRange: 600,
                                               lower: 600,
                                               upper: 900 },
                                             { qualAmtRange: 900,
                                               lower: 900,
                                               upper: 100000 } ]; // highest catchall


  vm.qualAmtBuckets = function (qualAmtsData) {
   // qualAmtsData is an array of qualifying amounts from the query to be sorted
   // example: qualAmtsData = [200, 200, 200, 400, 300, 850, 0, 0, 600]

   // initialize the bucket array, based on the initial declaration above.
   vm.qualAmtsDataBucketArray = []; // clears before remaking.

   for (var p = 0; p < vm.qualifyingAmountLowerUpperObjectArray.length; p++) {
          vm.qualAmtsDataBucketArray.push({ qualAmtRange: vm.qualifyingAmountLowerUpperObjectArray[p].qualAmtRange,
                                         numInBucket: 0});

   }; // end for p
   // in each item of the lower, upper array, copy the qualAmtRange value,
   // and add the numInBucket value.


  // should be more or less equivalent to below if buckets stay the same.
  //  var qualAmtsDataBucketArray = [ { qualAmtRange:0,
  //                                    numInBucket: 0},
  //                                  { qualAmtRange:300,
  //                                    numInBucket: 0},
  //                                  { qualAmtRange:600,
  //                                    numInBucket: 0},
  //                                  { qualAmtRange:900,
  //                                    numInBucket: 0} ];

    for (var k = 0; k < qualAmtsData.length; k++) {
        val = qualAmtsData[k];

        for (var m = 0; m < vm.qualifyingAmountLowerUpperObjectArray.length; m++) {
            if (val >= vm.qualifyingAmountLowerUpperObjectArray[m].lower && val < vm.qualifyingAmountLowerUpperObjectArray[m].upper) {

              var n = vm.qualAmtsDataBucketArray.findIndex(function (x) { return x.qualAmtRange == vm.qualifyingAmountLowerUpperObjectArray[m].qualAmtRange };

              vm.qualAmtsDataBucketArray[n].numInBucket++; //adds one to the bucket

            }; // end if
        }; // end for m
    }; // end for k

  }; // end vm.qualAmtBuckets function




    /* this section creates lower and upper amounts for the income bins */
    vm.incomeLowerUpperObjectArray = [ { incomeRange: 0,
                                         lower: 0,
                                         upper: 10000 },
                                       { incomeRange: 10000,
                                         lower: 10000,
                                         upper: 20000 },
                                       { incomeRange: 20000,
                                         lower: 20000,
                                         upper: 30000 },
                                       { incomeRange: 30000,
                                         lower: 30000,
                                         upper: 40000 },
                                       { incomeRange: 40000,
                                         lower: 40000,
                                         upper: 50000 },
                                       { incomeRange: 50000,
                                         lower: 50000,
                                         upper: 60000 },
                                       { incomeRange: 60000,
                                         lower: 60000,
                                         upper: 70000 },
                                       { incomeRange: 70000,
                                         lower: 70000,
                                         upper: 80000 },
                                       { incomeRange: 80000,
                                         lower: 80000,
                                         upper: 90000 },
                                       { incomeRange: 90000,
                                         lower: 90000,
                                         upper: 100000 },
                                       { incomeRange: 100000,
                                         lower: 100000,
                                         upper: 110000000 } ]; // highest catchall






  /* this section creates start and stop dates for the age bins */
  /* because the patients age depends on their DOB and the current date, it must be calculated at the time of the report */
    var i = req.body.dataSetSelections.findIndex(function (x) { return x.title == "age" }); // gets the index for the age array

    var ageArray = req.body.dataSetSelections[i]; // array of ages selected for report
    // for example ageArray = ['>18','19-29','30-39','40-49','50-59','60-69','70+']

    vm.ageStartStopObjectArray = [];
    // = [{ageRange: ageOption, startDate: "", stopDate: ""}];
    // converts ages to dates.
    // title:'age',
    // options:['>18','19-29','30-39','40-49','50-59','60-69','70+']

    for (var j = 0; j < ageArray.length; j++) {

      var ageOption = ageArray[j];

      var stopDate = new Date();
      var startDate = new Date();

      switch (ageOption) {
        case '>18':
          stopDate = stopDate;
          startDate = startDate.setFullYear(startDate.getFullYear() - 19);
          break;
        case '19-29':
          stopDate = stopDate.setFullYear(stopDate.getFullYear() - 19)
          startDate = startDate.setFullYear(startDate.getFullYear() - 29);
          break;
        case '30-39':
          stopDate = stopDate.setFullYear(stopDate.getFullYear() - 29)
          startDate = startDate.setFullYear(startDate.getFullYear() - 39);
          break;
        case '40-49':
          stopDate = stopDate.setFullYear(stopDate.getFullYear() - 39)
          startDate = startDate.setFullYear(startDate.getFullYear() - 49);
          break;
        case '50-59':
          stopDate = stopDate.setFullYear(stopDate.getFullYear() - 49)
          startDate = startDate.setFullYear(startDate.getFullYear() - 59);
          break;
        case '60-69':
          stopDate = stopDate.setFullYear(stopDate.getFullYear() - 59)
          startDate = startDate.setFullYear(startDate.getFullYear() - 69);
          break;
        case '70-79':
          stopDate = stopDate.setFullYear(stopDate.getFullYear() - 69)
          startDate = startDate.setFullYear(startDate.getFullYear() - 79);
          break;
        case '80+':
          stopDate = stopDate.setFullYear(stopDate.getFullYear() - 79)
          startDate = startDate.setFullYear(startDate.getFullYear() - 130);
          break;
        case '70+':
          stopDate = stopDate.setFullYear(stopDate.getFullYear() - 69)
          startDate = startDate.setFullYear(startDate.getFullYear() - 130);
          break;
        default:
          stopDate = stopDate;
          startDate = startDate.setFullYear(startDate.getFullYear() - 130);
        // oldest possible people?
      }; // end ageOption switch

      console.log(new Date(stopDate), new Date(startDate));

      ageStartStopObjectArray.push({ageRange: ageOption, startDate: new Date(startDate), stopDate: new Date(stopDate)});

    }; // end for loop



});
