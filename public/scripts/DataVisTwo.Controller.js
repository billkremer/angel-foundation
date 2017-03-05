angular.module("AngelApp").controller("DataVisTwoController", ['$location','$http',
  function($location,$http) {
    console.log('datavis2 controller loaded');

    var vm=this;




    // //transitions
    var duration = 200;
    var delay = 0;


    var diameter = 500, //max size of the bubbles
        color    = d3.scale.category20b(); //color category

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("#graph")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");


        var data=[{Fruit:'apple',value:4},{Fruit:'grapes',value:5},{Fruit:'orange',value:2}];
        //bubbles needs very specific format, convert data to this.
        var nodes = bubble.nodes({children:data}).filter(function(d) { return !d.children; });
        var data2=[{Fruit:'apple',value:2},{Fruit:'grapes',value:1},{Fruit:'orange',value:8}];
        vm.swap=function(){
          nodes = bubble.nodes({children:data2}).filter(function(d) { return !d.children; });
          console.log('hello');
          var allBubbles = d3.selectAll('circle');
          allBubbles.transition()
          .duration(duration + delay)
          .style('opacity', 0)
          .remove();
        }
        //setup the chart
        var bubbles = svg.append("g")
            .attr("transform", "translate(0,0)")
            .selectAll(".bubble")
            .data(nodes)
            ;

        //create the bubbles
        bubbles.enter().append("circle")
            .attr("r", function(d){ return d.r; })
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; })
            .style("fill", function(d) { return color(d.value); })
            .style('opacity', 0)
              .transition()
              .duration(duration * 5.2)
            	.style('opacity', 1);;

        //format the text for each bubble
        bubbles.enter().append("text")
            .attr("x", function(d){ return d.x; })
            .attr("y", function(d){ return d.y + 5; })
            .attr("text-anchor", "middle")
            .text(function(d){ return d["Fruit"]; })
            .style({
                "fill":"white",
                "font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
                "font-size": "12px"
            });




















//     var json = {"countries_msg_vol": {
//       "Welcome": 100
//     }};
//
//    // D3 Bubble Chart
//
//    var diameter = 600;
//
//    var svg = d3.select('#graph').append('svg')
//                    .attr('width', diameter)
//                    .attr('height', diameter);
//
//    var bubble = d3.layout.pack()
//                .size([diameter, diameter])
//                .value(function(d) {return d.size;})
//         // .sort(function(a, b) {
//                //  return -(a.value - b.value)
//                // })
//                .padding(3);
//
//
//     var nodes = bubble.nodes(processData(json))
//                 .filter(function(d) { return !d.children; });
// vm.swap=function(thing){
//   // Fake JSON data
//   if(thing=='json'){
//      var json = {"countries_msg_vol": {
//        "CA": 170, "US": 393, "BB": 12, "CU": 9, "BR": 89, "MX": 192, "PY": 32, "UY": 9, "VE": 25, "BG": 42, "CZ": 12, "HU": 7, "RU": 184, "FI": 42, "GB": 162, "IT": 87, "ES": 65, "FR": 42, "DE": 102, "NL": 12, "CN": 92, "JP": 65, "KR": 87, "TW": 9, "IN": 98, "SG": 32, "ID": 4, "MY": 7, "VN": 8, "AU": 129, "NZ": 65, "GU": 11, "EG": 18, "LY": 4, "ZA": 76, "A1": 2, "Other": 254
//      }};
//    }else{
//      var json = {"countries_msg_vol": {
//        "CA": 70, "US": 93, "BB": 102, "CU": 90, "BR": 9, "MX": 92, "PY": 132, "UY": 91, "VE": 25, "BG": 42, "CZ": 121, "HU": 17, "RU": 14, "FI": 242, "GB": 12, "IT": 187, "ES": 65, "FR": 42, "DE": 102, "NL": 12, "CN": 92, "JP": 65, "KR": 87, "TW": 9, "IN": 98, "SG": 32, "ID": 4, "MY": 7, "VN": 8, "AU": 129, "NZ": 65, "GU": 11, "EG": 18, "LY": 4, "ZA": 76, "A1": 2, "Other": 254
//      }};
//    }
//  // generate data with calculated layout values
//   nodes = bubble.nodes(processData(json))
//                       .filter(function(d) { return !d.children; });
//   console.log('hello');
// }
//

//
//
//  vis.enter().append('circle')
//            .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
//            .attr('r', function(d) { return d.r; })
//            .attr('class', function(d) { return d.className; });
//
//  function processData(data) {
//    var obj = data.countries_msg_vol;
//
//    var newDataSet = [];
//
//    for(var prop in obj) {
//      newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
//    }
//    return {children: newDataSet};
//  }
//
//
//
//
// //transitions
// var duration = 200;
// var delay = 0;
//
// // update - This only applies to updating nodes
// bubbles.transition()
//   .duration(duration)
//   .delay(function(d, i) {delay = i * 7; return delay;})
//   .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
//   .attr('r', function(d) { return d.r; })
//
// // enter
// bubbles.enter().append('circle')
//   .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
//   .attr('r', function(d) { return d.r; })
//   .attr('class', function(d) { return d.className; })
//   .style('opacity', 0)
//   .transition()
//   .duration(duration * 1.2)
// 	.style('opacity', 1);
//
// // exit
bubbles.exit()
  .transition()
  .duration(duration + delay)
  .style('opacity', 0)
  .remove();
//
// vm.swap('json');
}]);
