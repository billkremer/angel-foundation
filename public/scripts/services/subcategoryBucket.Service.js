app.service("subcategoryBucketService", function($http){
  var vm = this;
  var verbose = false;
  // functions and data interact primarily with CustomReportController.js

  vm.returnString = function (dataSetSelectionsObject) {
    // example: dataSetSelectionsObject = vm.dataSetSelections[j] = {title: "age", options:["30+","50+"]}
    // if / else-if tree for age, income,

    if (verbose) console.log("dataSetSelectionsObject",dataSetSelectionsObject);

    var whereString = ""; // string to return

    if (verbose) console.log((dataSetSelectionsObject.title.toLowerCase() == "age"));
    /* ------------ age section ------------    */
    if (dataSetSelectionsObject.title.toLowerCase() == "age") {
      whereString += " ( ";
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
        if (verbose) console.log(whereString);
      }; // for loop end
      whereString += " ) ";
    }; // end "age" if
    /* ------------ end age section ------------    */

    /* ---------  start monthly or yearly income section ------    */
    //dataSetSelectionsObject.title.toLowerCase() == "monthly income" ||
    if ( dataSetSelectionsObject.title.toLowerCase() == "income" || dataSetSelectionsObject.title.toLowerCase() == "yearly income" ) {

      if (verbose) console.log("inside income block", dataSetSelectionsObject.options);

      //  title:'Monthly Income', --- Should be yearly!
      //  options:['0','1-15000','15001-30000','300001-45000','45001-60000','60001-75000','75001+']

      // // converts yearly income to monthly, as in the database
      // var whereString = "";
      // var dataSetSelectionsObject = {options: ['< 1000','>15000','15001-30000','30001-45000']};
      whereString += " ( ";
      for (var j = 0; j < dataSetSelectionsObject.options.length; j++) {

        if (verbose) console.log(typeof dataSetSelectionsObject.options[j]);
        if (verbose) console.log(dataSetSelectionsObject.options[j].toString().charAt(0));

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
        if (verbose) console.log(whereString);
      }; // for loop end
      whereString += " ) ";
    }; // end if "monthly income"


    /* ---------  funds section ------    */

    // if ( dataSetSelectionsObject.title.toLowerCase() == "qualify amount" || dataSetSelectionsObject.title.toLowerCase() == "fund qualify amount") {

    if (["fund brain" , "fund park nicollet" , "fund lung" , "fund melanoma" , "fund margies" , "fund colon" , "fund total"].indexOf(dataSetSelectionsObject.title.toLowerCase()) != -1) {

      var titleForQ = dataSetSelectionsObject.title.toLowerCase().split(" ").join("_");

      // title:'Qualify Amount', // or "fund qualify amount"
      // options:['0','100-300','301-500','501-800','801+']
      // var whereString = "";
      // var dataSetSelectionsObject = {options: ['< 100','501-800','801+']};
      whereString += " ( ";
      for (var k = 0; k < dataSetSelectionsObject.options.length; k++) {

        if ((typeof dataSetSelectionsObject.options[k]) == "number") {
          whereString += " (" + titleForQ + " < CAST (" + dataSetSelectionsObject.options[k] + " AS MONEY))";

        } else if (dataSetSelectionsObject.options[k].charAt(0) == "<" ) {
          whereString += " (" + titleForQ + " < CAST (" + (Number.parseInt(dataSetSelectionsObject.options[k].substring(1))) + " AS MONEY))"; // for "< 1000" (Number.parseInt(dataSetSelectionsObject.options[i]))

        } else if (dataSetSelectionsObject.options[k].charAt(0) == ">" ) {
          whereString += " (" + titleForQ + " > CAST (" + (Number.parseInt(dataSetSelectionsObject.options[k].substring(1))) + " AS MONEY))";
          // for "> 100000"

        } else if ( dataSetSelectionsObject.options[k].indexOf("+") != -1) {
          whereString += " (" + titleForQ + " > CAST (" + (Number.parseInt(dataSetSelectionsObject.options[k])) + " AS MONEY))";
          // for "100000+"

        } else if ( dataSetSelectionsObject.options[k] == "0" || dataSetSelectionsObject.options[k] == "") {
          whereString += " (" + titleForQ + " = CAST(0 AS MONEY))";
          // for "O" or ""

        } else {
          var arrayForString = dataSetSelectionsObject.options[k].split("-");
          // "45001-60000" -> ["45001","60000"]

          whereString +=" (" + titleForQ + " > CAST(" + arrayForString[0] + " AS MONEY) AND " + titleForQ + " <= CAST(" + arrayForString[1] + " as MONEY))";
        };

        if (k < dataSetSelectionsObject.options.length - 1) {
          whereString += " OR ";
        };
        if (verbose) console.log(whereString);
      }; // for loop end
      whereString += " ) ";
    }; // end if "funds, etc"



    /* ---------  funds amount section ------    */

    // if ( dataSetSelectionsObject.title.toLowerCase() == "qualify amount" || dataSetSelectionsObject.title.toLowerCase() == "fund qualify amount") {

    if (["fund qualify amount" , "qualify amount"].indexOf(dataSetSelectionsObject.title.toLowerCase()) != -1) {

      var titleForQualAmt = dataSetSelectionsObject.title.toLowerCase();

      if (titleForQualAmt == "fund qualify amount") {
        titleForQualAmt = "distributions.qualify_amount";
      } else {
        titleForQualAmt = "p.qualify_amount";
      };


      // title:'Qualify Amount', // or "fund qualify amount"
      // options:['0','100-300','301-500','501-800','801+']
      // var whereString = "";
      // var dataSetSelectionsObject = {options: ['< 100','501-800','801+']};
      whereString += " ( ";
      for (var k = 0; k < dataSetSelectionsObject.options.length; k++) {

        if ((typeof dataSetSelectionsObject.options[k]) == "number") {
          whereString += " (" + titleForQualAmt + " < " + dataSetSelectionsObject.options[k] + " ) ";

        } else if (dataSetSelectionsObject.options[k].charAt(0) == "<" ) {
          whereString += " (" + titleForQualAmt + " < " + (Number.parseInt(dataSetSelectionsObject.options[k].substring(1))) + " )"; // for "< 1000" (Number.parseInt(dataSetSelectionsObject.options[i]))

        } else if (dataSetSelectionsObject.options[k].charAt(0) == ">" ) {
          whereString += " (" + titleForQualAmt + " > " + (Number.parseInt(dataSetSelectionsObject.options[k].substring(1))) + " )";
          // for "> 100000"

        } else if ( dataSetSelectionsObject.options[k].indexOf("+") != -1) {
          whereString += " (" + titleForQualAmt + " > " + (Number.parseInt(dataSetSelectionsObject.options[k])) + " A)";
          // for "100000+"

        } else if ( dataSetSelectionsObject.options[k] == "0" || dataSetSelectionsObject.options[k] == "") {
          whereString += " (" + titleForQualAmt + " = 0)";
          // for "O" or ""

        } else {
          var arrayForString = dataSetSelectionsObject.options[k].split("-");
          // "45001-60000" -> ["45001","60000"]

          whereString +=" (" + titleForQualAmt + " > " + arrayForString[0] + "  AND " + titleForQualAmt + " <= " + arrayForString[1] + " )";
        };

        if (k < dataSetSelectionsObject.options.length - 1) {
          whereString += " OR ";
        };
        if (verbose) console.log(whereString);
      }; // for loop end
      whereString += " ) ";
    }; // end if "qualify amount, etc"




    /* ------------ expiration date section ------------    */

    if ( dataSetSelectionsObject.title.toLowerCase() == "app. expiration date" ) {

      // title:'exp date',
      // options:['date1 -- date2', 'date3 -- date4']
      //  var whereString = "";
      //  var dataSetSelectionsObject = {options: ['1 Jan 2010','5/12/2016']};

      var expStartDate = new Date();
      var expStopDate = new Date();
      var expDateArray = []

      if (verbose) console.log(dataSetSelectionsObject,"obj");
      // .options is a string, not an array. so no for loop
      whereString += " ( ";
      for (var p = 0; p < dataSetSelectionsObject.options.length; p++) {
        // console.log(dataSetSelectionsObject.options[p]);
        expDateArray = dataSetSelectionsObject.options[p].split("--");
        if (verbose) console.log(expDateArray);
        // 'date3 -- date4'.split(" -- "); // ["date3","date4"]

        expStartDate = (new Date(expDateArray[0]).toISOString().substring(0,10));
        expStopDate = (new Date(expDateArray[1]).toISOString().substring(0,10));

        if (verbose) console.log(expStartDate, expStopDate);

        if (expStartDate < expStopDate) {
          whereString += "(expiration_date >= '" + expStartDate + "' AND expiration_date <= '" + expStopDate + "')";
        } else {
          whereString += "(expiration_date >= '" + expStopDate + "' AND expiration_date <= '" + expStartDate + "')";
        };

        if (verbose) console.log(whereString);

        if ( p < dataSetSelectionsObject.options.length-1) {
          whereString += " OR ";
        }; // connects all the potential strings

      }; // end for loop
      whereString += " ) ";
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
      whereString += " ( ";
      for (var m = 0; m < dataSetSelectionsObject.options.length; m++) {

        appDateArray = dataSetSelectionsObject.options[m].split(" -- ");

        // 'date3 -- date4'.split(" -- "); // ["date3","date4"]

        appStartDate = (new Date(appDateArray[0]).toISOString().substring(0,10));
        appStopDate = (new Date(appDateArray[1]).toISOString().substring(0,10));

        if (verbose) console.log(appStartDate, appStopDate);

        if (appStartDate < appStopDate) {
          whereString += "(p.application_date >= '" + appStartDate + "' AND p.application_date <= '" + appStopDate + "')";
        } else {
          whereString += "(p.application_date >= '" + appStopDate + "' AND p.application_date <= '" + appStartDate + "')";
        };


        if (verbose) console.log(whereString);

        if ( m < dataSetSelectionsObject.options.length-1) {
          whereString += " OR ";
        }; // connects all the potential strings

      }; // end for loop
      whereString += " ) ";
    }; // end if "application date"



    /* ------------ distribution date section ------------ */
    if ( dataSetSelectionsObject.title.toLowerCase() == "distribution date" ) {

      // title:'exp date',
      // options:['date1 -- date2']
      // var whereString = "";
      // var dataSetSelectionsObject = {options: ['1 Jan 2010','5/12/2016']};

      var distStartDate = new Date();
      var distStopDate = new Date();
      var distDateArray = [];

      whereString += " ( ";
      for (var n = 0; n < dataSetSelectionsObject.options.length; n++) {

        distDateArray = dataSetSelectionsObject.options[n].split(" -- ");

        // 'date3 -- date4'.split(" -- "); // ["date3","date4"]

        var distStartDateString = (new Date(distDateArray[0])).toISOString().substring(0,10);
        var distStopDateString = (new Date(distDateArray[1])).toISOString().substring(0,10);

        if (verbose) console.log(distStopDateString);

        if (verbose) console.log(distStartDate, distStopDateString);

        if (distStartDateString < distStopDateString) {
          whereString += "(distribution_date >= '" + distStartDateString + "' AND distribution_date <= '" + distStopDateString + "')";
        } else {
          whereString += "(distribution_date >= '" + distStopDateString + "' AND distribution_date <= '" + distStartDateString + "')";
        };

        if (verbose) console.log(whereString);

        if ( n < dataSetSelectionsObject.options.length-1) {
          whereString += " OR ";
        }; // connects all the potential strings

      }; // end for loop
      whereString += " ) ";
    }; // end if "distribution date"



    return whereString;

  }; // end returnString function


}); // end of service.
