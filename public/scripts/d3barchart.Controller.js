angular.module("AngelApp").controller("d3barchartController", ['$location','$http','barChartService',
  function($location,$http,barChartService) {
    console.log('d3bar controller loaded');

    var vm=this;
    vm.responseOne=[];
    var data=[];

    vm.getBar=function(){
      vm.responseOne=[];
        var objectToGet={title:vm.option};
        barChartService.getDistinct(objectToGet).then(function(res){
          console.log('res.data',res.data);

            for(var i=0;i<res.data.length;i++){
              console.log('i1',i);
              var objectForValues={field:objectToGet.title,item:res.data[i][objectToGet.title]};
              barChartService.getValues(objectForValues,i).then(function(value){
                // console.log(value.data);
                console.log('i2',i);
                console.log('value.data.i',value.data[0].i);
                vm.responseOne.push({cat:res.data[value.data[0].i][objectToGet.title],val:Number(value.data[0].count)});

                if(value.data[0].i==res.data.length-1){
                  console.log(vm.responseOne);
                  data=vm.responseOne;
                    data.forEach(function(d) {
                        d.cat = d.cat;
                        d.val = +d.val;
                    });
                    d3.selectAll("svg").remove();
                    draw();
                }


              });

            }


            // data=vm.responseOne;
            //   data.forEach(function(d) {
            //       d.cat = d.cat;
            //       d.val = +d.val;
            //   });

            // var two=setTimeout(console.log(data),25000);
            // var three=setTimeout(console.log('one',vm.responseOne),25000);
            // var four=setTimeout(console.log('two',vm.responseTwo),25000);



        });
    }

    var draw=function(){
        // set the dimensions of the canvas
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;


    // set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    // define the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);


    // add the SVG element
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


    // load the data



      // scale the range of the data
      x.domain(data.map(function(d) { return d.cat; }));
      y.domain([0, d3.max(data, function(d) { return d.val; })]);

      // add axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-90)" );

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 5)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Count");


      // Add bar chart

        svg.selectAll("bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.cat); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.val); })
            .attr("height", function(d) { return height - y(d.val); });
      }

}]);
