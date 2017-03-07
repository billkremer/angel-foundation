angular.module("AngelApp").controller("DataVisController", ['$location','$http',
  function($location,$http) {
    console.log('datavis controller loaded');

    var vm=this;
    var currentCounty='';
    var lowLimit=null;
    var highLimit=null;
    var years=["2010","2011","2012","2013","2014","2015"];
    d3.select('#slider').call(d3.slider().axis(true).min(2010).max(2015).step(1).value( [ 2010, 2015 ] ).on("slide", function(evt, value) {
      // d3.select('#slidertextmin').text(value[ 0 ]);
      lowLimit=value[0];
      // console.log(value[0]);
      years=[];
      // d3.select('#slidertextmax').text(value[ 1 ]);
      highLimit=value[1];
      // console.log(value[1]);
      for(var i=0;i<value[1]-value[0]+1;i++){
        years[i]=(value[0]+i).toString();
      }
      years = years.map(function(d){return parseDate.parse(d);});
      getSelectToggleCounty();
    }));
    //Check if info exists, by school number
    Array.prototype.returnCountyInfo = function(county){
    		for (var i = 0; i < this.length; i++) {
    				if (this[i].countyName == county){
    						return this[i];
    				}
    		}
    		return undefined;
    };

    function countyObj(countyInfo){
      var outArr = [];
      var popArr = [];
      var collArr = [];

      for(var prop in countyInfo){
        if (typeof countyInfo[prop] === 'string'){
          if (prop == 'countyName'){
            outArr.countyName = countyInfo[prop];
          }
          else if (prop == 'metro'){
            outArr.metro = countyInfo[prop];
          }
          else if (prop.substring(0,3) == 'pop'){
            popArr[prop.substring(4)] = Number(countyInfo[prop]);
          }
          else if (prop.substring(0,11) == 'collOrByond'){
            collArr[prop.substring(12)] = (Number(countyInfo[prop]) / 100) * popArr[prop.substring(12)];
          }
        }
      }

      outArr.populations = popArr;
      outArr.collegeAmt = collArr;
      return outArr;
    }

    var statewideOptionList = [
    	{condensedName: 'all', friendlyName: 'State-wide'},
    	{condensedName: 'metro', friendlyName: 'All Metropolitan Counties'},
    	{condensedName: 'MinneapolisStPaulBloomingtonMNWI', friendlyName: 'Minneapolis-St. Paul-Bloomington MN-WI Metro Region'},
    	{condensedName: 'StCloudMN', friendlyName: '    St. Cloud MN Metro Region'},
    	{condensedName: 'MankatoNorthMankatoMN', friendlyName: '    Mankato-North Mankato MN Metro Region'},
    	{condensedName: 'DuluthMNWI', friendlyName: '    Duluth MN-WI Metro Region'},
    	{condensedName: 'FargoNDMN', friendlyName: '    Fargo ND-MN Metro Region'},
    	{condensedName: 'RochesterMN', friendlyName: '    Rochester MN Metro Region'},
    	{condensedName: 'LaCrosseOnalaskaWIMN', friendlyName: '    La Crosse-Onalaska WI-MN Metro Region'},
    	{condensedName: 'GrandForksNDMN', friendlyName: '    Grand Forks ND-MN Metro Region'},
    	{condensedName: 'nonmetro', friendlyName: 'All Non-Metropolitan Counties'}
    ];

    var allCountyInfo = [];
    var allRegionInfo = [];
    var countyJson = {};

    var parseDate = d3.time.format("%Y");

    // var years = ["1998","2001","2004","2007","2010"];
    years = years.map(function(d){return parseDate.parse(d);});
    console.log(years);
    var width = 400,height = 430;

    //other functions use the projection/path for highlighting certain sections of the map
    var projection = d3.geo.conicEqualArea()
    	.center([1.5, 46.5])
    	.rotate([95, 0])
    	.parallels([29.5, 45.5])
    	.scale(4000)
    	.translate([width / 2, height / 2]);

    var path = d3.geo.path()
    	.projection(projection);

    function loadData(){
    	var svg = d3.selectAll("svg#mapMain")
    		.attr("width", width)
    		.attr("height", height);

    	d3.json("data/mncounties.json", function(errorJ, mn) {
    		countyJson=mn;
    		d3.csv("data/regionData.csv", function(errorC, regionData){
    			allRegionInfo=regionData;
    			d3.csv("data/countypop.csv", function(errorC, studentData){
    				allCountyInfo = studentData;

    				//build the county list in a separate variable so we can sort them easily
    				//remove the last element, which is statewide
    				var countyList = studentData.map(function(d){return d.countyName;}).slice(0, -1).sort();
    				d3.select("select#countyOptions").selectAll('option').data(countyList).enter()    //appends all counties to div in html
    				.append("option").attr("value", function(d){return d;}).text(function(d){return d;});

    				//build the metro area list
    				d3.select("select#statewideOptions").selectAll('option').data(statewideOptionList).enter()
    				.append("option").attr("value", function(d){return d.condensedName;}).text(function(d){return d.friendlyName;});

            //building svg map
    				svg.selectAll(".county")
    				.data(topojson.feature(mn, mn.objects.counties).features).enter().append("path")
    				.attr({
    					d: path,
    					id: function(d) {return d.properties.name;},
    					stroke: '#000',
    					'class' : function(d){
    						var countyData = studentData.returnCountyInfo(d.properties.name);
      						if(countyData['pop-2010']<1500){
                     classCall='lowest';
                  }else if(countyData['pop-2010']<1800){
                     classCall='lower';
                  }else if(countyData['pop-2010']<11000){
                     classCall='low';
                  }else if(countyData['pop-2010']<13000){
                     classCall='medium';
                  }else if(countyData['pop-2010']<15000){
                     classCall='high';
                  }else if(countyData['pop-2010']<110000){
                     classCall='higher';
                  }else {
                     classCall='highest';
                  }

    						return classCall}
    				})
    				.on('click', function(d){
    					var clickedCounty = studentData.returnCountyInfo(d.properties.name);
    					//what happens when clicked depends on the selection option
    					var displayOption = getRadioVal('displayOptions');
    					if (displayOption == 'state'){
    						var region = clickedCounty.metro === "" ? 'nonmetro' : clickedCounty.metro;
    						var stateElement = document.getElementById('statewideOptions');
    						stateElement.value = region;
    						toggleRegion(region);
    					}
    					else { //by county
    						var countyElement = document.getElementById('countyOptions');
    						// countyElement.value = d.properties.name;
                currentCounty=d.properties.name;
    						toggleCounty(clickedCounty);
    					}
    				});

    				svg.append("path")
    				.datum(topojson.mesh(mn, mn.objects.counties, function(a, b) { return a === b; }))
    				.attr({
    					"id": "highlightPath",
    					"d": path
    				});

    				// getSelectToggleCounty();
    			});
    		});
    	});
    }

    function getSelectToggleCounty(){
    	var e = document.getElementById("countyOptions");
    	var county = currentCounty;
      // e.options[e.selectedIndex].text;
      // console.log(e.selectedIndex);
    	toggleCounty(allCountyInfo.returnCountyInfo(county));
    }

    function getSelectToggleRegion(){
    	var e = document.getElementById("statewideOptions");
    	var region = e.options[e.selectedIndex].value;
    	toggleRegion(region);
    }

    function toggleCounty(countyInfo){
    	d3.select("#highlightPath").remove();

    	d3.selectAll("svg#mapMain").append("path")
    	.datum(topojson.mesh(countyJson, countyJson.objects.counties, function(a, b) { return a.properties.name == countyInfo.countyName || b.properties.name == countyInfo.countyName; }))
    	.attr({
    		"id": "highlightPath",
    		"d": path
    	});

    	displayCountyData(countyInfo);
    }

    function toggleRegion(regionType){
    	d3.select("#highlightPath").remove();

    	if (regionType == 'all'){
    		d3.selectAll("svg#mapMain").append("path")
    		.datum(topojson.mesh(countyJson, countyJson.objects.counties, function(a, b) { return a === b; }))
    		.attr({
    			"id": "highlightPath",
    			"d": path
    		});

    		displayStateData();
    	}
    	else if (regionType == 'metro'){
    		d3.selectAll("svg#mapMain").append("path")
    		.datum(topojson.mesh(countyJson, countyJson.objects.counties, function(a, b) {
    			var aCounty = allCountyInfo.returnCountyInfo(a.properties.name);
    			var bCounty = allCountyInfo.returnCountyInfo(b.properties.name);
    			//I realize this logic can be simplified but I need it spelled out
    			return (aCounty.metro === "" && bCounty.metro !== "") || //either border between metro and non metro
    				(aCounty.metro !== "" && bCounty.metro === "") || //either border between metro and non metro
    				(aCounty.metro !== "" && aCounty === bCounty) || //or border between metro and outside
    				(bCounty.metro !== "" && aCounty === bCounty);  })) //or border between metro and outside
    		.attr({
    			"id": "highlightPath",
    			"d": path
    		});

    		displayMetroOrRuralData(true);
    	}
    	else if (regionType == 'nonmetro'){
    		d3.selectAll("svg#mapMain").append("path")
    		.datum(topojson.mesh(countyJson, countyJson.objects.counties, function(a, b) {
    			var aCounty = allCountyInfo.returnCountyInfo(a.properties.name);
    			var bCounty = allCountyInfo.returnCountyInfo(b.properties.name);
    			//I realize this logic can be simplified but I need it spelled out
    			return (aCounty.metro === "" && bCounty.metro !== "") || //either border between metro and non metro
    				(aCounty.metro !== "" && bCounty.metro === "") || //either border between metro and non metro
    				(aCounty.metro === "" && aCounty === bCounty) || //or border between nonmetro and outside
    				(bCounty.metro === "" && aCounty === bCounty);  })) //or border between nonmetro and outside
    		.attr({
    			"id": "highlightPath",
    			"d": path
    		});

    		displayMetroOrRuralData(false);
    	}
    	else  { //specific metro region
    		d3.selectAll("svg#mapMain").append("path")
    		.datum(topojson.mesh(countyJson, countyJson.objects.counties, function(a, b) {
    			var aCounty = allCountyInfo.returnCountyInfo(a.properties.name);
    			var bCounty = allCountyInfo.returnCountyInfo(b.properties.name);
    			//I realize this logic can be simplified but I need it spelled out
    			return (aCounty.metro === regionType && bCounty.metro !== regionType) || //either border between specified region and outside specified region
    				(aCounty.metro !== regionType && bCounty.metro === regionType) || //either border between metro and non metro
    				(aCounty.metro === regionType && aCounty === bCounty) || //or border between nonmetro and outside
    				(bCounty.metro === regionType && aCounty === bCounty);  })) //or border between nonmetro and outside
    		.attr({
    			"id": "highlightPath",
    			"d": path
    		});

    		displayMetroRegionData(regionType);
    	}
    }

    function toggleDisplay(displayType) {
    	if (displayType == 'state') {
    		document.getElementById('statewideOptions').disabled = false;
    		document.getElementById('countyOptions').disabled = true;
    		getSelectToggleRegion();
    	}
    	else { //displayType is county
    		document.getElementById('statewideOptions').disabled = true;
    		document.getElementById('countyOptions').disabled = false;
    		getSelectToggleCounty();
    	}
    }

    function displayCountyData(countyInfo){
    	var margin = {top: 20, right: 20, bottom: 30, left: 78},
        thisWidth = 348 - margin.left - margin.right,
        thisHeight = 204 - margin.top - margin.bottom;

    	var chartInfo = countyObj(countyInfo);

    	d3.select("div#selectedTitle>h2").remove();
    	d3.selectAll("div#selectedContent>p").remove();
    	d3.selectAll("svg#selectedChart>g").remove();

    	d3.select("div#selectedTitle").append("h2").text(countyInfo.countyName);
    	var content = d3.select("div#selectedContent");

    	// content.append("p").text(function(d){
    	// 	if (countyInfo.metro === "") {
    	// 		return "Not classified as a metropolitan county.";
    	// 	}
    	// 	else {
    	// 		return _.find(statewideOptionList, function(d){ return d.condensedName == countyInfo.metro;}).friendlyName;
    	// 	}
    	// });

    	// content.append("p").text("Ranks " + countyInfo.rank + "/87 for number of students who plan to go to college or beyond.");

    	var svgChart = d3.select("svg#selectedChart").append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    	var x = d3.time.scale()
    		.range([0, thisWidth])
    		.domain(d3.extent(years));

    	var y = d3.scale.linear()
    		.range([thisHeight, 0])
    		.domain([d3.min(chartInfo.populations, function(d,i) {return d; }), d3.max(chartInfo.populations, function(d,i) {return d; })]);

    	var xAxis = d3.svg.axis()
    		.scale(x)
    		.tickValues(years)
    		.orient("bottom");

    	var yAxis = d3.svg.axis()
    		.scale(y)
    		.orient("left");

    	var popArea = d3.svg.area()
    		.x(function(d,i) { return x(years[i]); })
    		.y0(thisHeight)
    		.y1(function(d) {return y(chartInfo.populations[d.getFullYear()]); });

    	// var schoolArea = d3.svg.area()
    	// 	.x(function(d,i) { return x(years[i]); })
    	// 	.y0(thisHeight)
    	// 	.y1(function(d) { return y(chartInfo.collegeAmt[d.getFullYear()]); });
      //
    	// var stateAvgLine = d3.svg.line()
    	// .x(function(d,i) { return x(years[i]); })
      //   .y(function(d) {
      //     var population = chartInfo.populations[d.getFullYear()];
      //     var stateInfo = _.find(allCountyInfo, function(d){return d.countyName == 'Statewide';});
      //     return y((stateInfo['collOrByond-'+d.getFullYear()]/100) * population);
      //   });

    	svgChart.append("path")
    		.datum(years)
    		.attr("class", "popArea")
    		.attr("d", popArea);
      //
    	// svgChart.append("path")
      //     .datum(years)
      //     .attr("class", "schoolArea")
      //     .attr("d", schoolArea);
      //
    	// svgChart.append("path")
      //     .datum(years)
      //     .attr("class", "stateLine")
      //     .attr("d", stateAvgLine);

    	svgChart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + thisHeight + ")")
          .call(xAxis);

    	svgChart.append("g")
          .attr("class", "y axis")
          .call(yAxis);

    	var index = svgChart.append("g")
    	.attr("transform", "translate(0," + 179 + ")");

    	index.append("rect")
    	.attr({
          height: 20,
          width: 20,
          'class': 'popArea'
    	});

    	// index.append("rect")
    	// .attr({
      //     y: 25,
      //     height: 20,
      //     width: 20,
      //     'class': 'schoolArea'
    	// });

    	// index.append("path")
    	// .attr({
      //     d : "M0,50L22,50",
      //     "transform": "translate(0," + 11 + ")",
      //     'class': 'stateLine'
    	// });
      //
    	// index.append("text").attr({
      //     x: 25,
      //     y: 16
    	// }).text("Students Surveyed");
      //
    	// index.append("text").attr({
      //     x: 25,
      //     y: 41
    	// }).text("Students Planning on Going to College or Beyond");
      //
    	// index.append("text").attr({
      //     x: 25,
      //     y: 66
    	// }).text("State Avg % of Students Planning on Going to College or Beyond");
    }

    function displayMetroRegionData(regionName){
    	var longRegionName = _.find(statewideOptionList, function(d){ return d.condensedName == regionName;}).friendlyName;
    	var regionData = _.find(allRegionInfo, function(d){ return d.regionName == regionName;});

    	d3.select("div#selectedTitle>h2").remove();
    	d3.selectAll("div#selectedContent>p").remove();
    	d3.selectAll("svg#selectedChart>g").remove();

    	d3.select("div#selectedTitle").append("h2").text(longRegionName);

    	var content = d3.select("div#selectedContent");

    	// content.append("p").text("This region is ranked " + regionData.regionRank + "/8 for having " + Math.floor(regionData.collOrByond) + "% of students interested in going to college or beyond.");
    }

    function displayMetroOrRuralData(isMetro){
    	var metroDataPct = Math.floor(_.find(allRegionInfo, function(d){if (d.regionName == 'Metro')  { return d;}}).collOrByond);
    	var nonMetroDataPct = Math.floor(_.find(allRegionInfo, function(d){if (d.regionName == 'NonMetro')  { return d;}}).collOrByond);

    	d3.select("div#selectedTitle>h2").remove();
    	d3.selectAll("div#selectedContent>p").remove();
    	d3.selectAll("svg#selectedChart>g").remove();

    	d3.select("div#selectedTitle").append("h2").text(function(){return isMetro ? "All Metropolitan Regions" : "All Non-Metropolitan Regions";});
    	var content = d3.select("div#selectedContent");
    	content.append("p").text((isMetro ? "Metro" : "Non-Metro") + " regions had an average of " + (isMetro? metroDataPct : nonMetroDataPct)+ "% of students express interest in attending college or beyond.");

    	var difference = isMetro? metroDataPct - nonMetroDataPct : nonMetroDataPct - metroDataPct;
    	var compareWord = difference > 0 ? "more" : "less";
    	difference = Math.abs(difference); //todo the same as
    	content.append("p").text("This is " + difference + "% " + compareWord + " than " + (isMetro ? "non-metro" : "metro") + " regions.");
    }

    function displayStateData(){
    	var stateInfo = _.find(allCountyInfo, function(d){return d.countyName == 'Statewide';});

    	d3.select("div#selectedTitle>h2").remove();
    	d3.selectAll("div#selectedContent>p").remove();
    	d3.selectAll("svg#selectedChart>g").remove();

    	d3.select("div#selectedTitle").append("h2").text("Minnesota");
    	var content = d3.select("div#selectedContent");

    	var avgStudents = d3.mean([stateInfo['number']]);
    	var avgPct = d3.mean([stateInfo['number']]);
    	content.append("p").text("On average, " + Math.floor(avgStudents)+ " students were surveyed a year.");
    	content.append("p").text("Of those students, on average " + Math.floor(avgPct) + "% planned to go to college or beyond.");
    }

    // window.setInterval(function(){
    //   if(document.getElementById('cycleToggle').checked){
    // 	selectRandom();
    //   }
    // }, 10000);

    function selectRandom(){
    	var displayType = getRadioVal('displayOptions');

    	if(displayType == 'state'){
    		var newIdxState = getRandomInt(0, statewideOptionList.length-1);
    		var toggledValueState = statewideOptionList[newIdxState].condensedName;
    		document.getElementById('statewideOptions').value = toggledValueState;
    		toggleRegion(toggledValueState);

    	}
    	else { //displayType == county
    		var newIdxCounty = getRandomInt(0, allCountyInfo.length-1);
    		var toggledCountyInfo = allCountyInfo[newIdxCounty];
    		document.getElementById('countyOptions').value = toggledCountyInfo.countyName;
    		toggleCounty(toggledCountyInfo);
    	}
    }

    function getRadioVal (groupName){
    	// var radioElements = document.getElementsByName(groupName);
    	// for(var i = 0; i < radioElements.length; i++){
    		// if(radioElements[i].checked){
    		// 	return radioElements[i].value;
    		// }
      // }
        return 'county';
    }

    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    loadData();
}]);
