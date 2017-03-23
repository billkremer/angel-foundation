angular.module("AngelApp").controller("DataVisThreeController", ['$location','$http',
  function($location,$http) {
    console.log('datavis3 controller loaded');

    var vm=this;
    vm.startDate=new Date('12-01-2016');
    vm.endDate=new Date('01-01-2017');
    vm.changeDate=function(){
    vm.bubbleSize=2;


  // .toString().substring(0,15)
      $http({
        method: "GET",
        url: "/bubblechart",
        params: {
          start: vm.startDate.toISOString().substring(0,10),
          end: vm.endDate.toISOString().substring(0,10)
        }
      }).then(function(response){
        console.log('data from db',response.data);
        var data=response.data;


          console.log('here is what data looks like',data);
          var width = 1500, height = 700;

          var fill = d3.scale.ordinal().range(['rgb(149,193,69)','rgb(68,68,68)','rgb(0,82,156)','rgb(68,136,187)','rgb(36,126,176)','rgb(112, 46, 58)','rgb(48, 11, 82)','rgb(1, 9, 84)','rgb(12, 71, 0)','rgb(87, 62, 0)','rgb(249, 62, 12)','rgb(0, 111, 71)','rgb(88, 22, 64)','rgb(125, 116, 0)','rgb(0, 0, 0)'])
          // var fill=d3.scale.category20();
          d3.selectAll('#bubblesvg').remove();
          var svg = d3.select("#chart").append("svg")
              .attr("id","bubblesvg")
              .attr("width", width)
              .attr("height", height);

          for (var j = 0; j < data.length; j++) {
            data[j].radius = 2;
            data[j].x = Math.random() * width;
            data[j].y = Math.random() * height;
          }

          var padding = 2;
          var maxRadius = d3.max(_.pluck(data, 'radius'));


          var getCenters = function (vname, size) {
            var centers, map;
            centers = _.uniq(_.pluck(data, vname)).map(function (d) {
              return {name: d, value: 1};
            });
            map = d3.layout.treemap().size(size).ratio(1/1);
            // map = d3.layout.pack().size(size);
            map.nodes({children: centers});

            return centers;
          };

          var nodes = svg.selectAll("circle")
            .data(data);

          nodes.enter().append("circle")
            .attr("class", "node")
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
            .attr("r", 2)
            .style('stroke', function(d){ return fill(d.gender);})
            .style("fill", function (d) { return fill(d.gender); })
            .on("mouseover", function (d) { showPopover.call(this, d); })
            .on("mouseout", function (d) { removePopovers(); })
  //           .call(d3.behavior.drag()
  //           .on("dragstart", dragstarted)
  //           .on("drag", dragged)
  //           .on("dragend", dragended));
  //
  // function dragstarted(d) {
  //   d3.select(this).classed("active", true);
  // }
  //
  // function dragged(d) {
  //   d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  // }
  //
  // function dragended(d) {
  //   d3.select(this).classed("active", false);
  //   force.start();
  // }

          nodes.transition().duration(1000)
            .attr("r", function (d) { return d.radius; })

          var force = d3.layout.force();
          vm.color='ethnicity';
          vm.currentCat='ethnicity';
          vm.dbColor='ethnicity';
          vm.dbCurrentCat='ethnicity';
          draw(vm.dbCurrentCat,vm.dbColor);

          vm.catsel=function() {
            switch(vm.currentCat){
                case 'Ethnicity':
                    vm.dbCurrentCat='ethnicity'
                    break;
                case 'Marital Status':
                    vm.dbCurrentCat='marital_status'
                    break;
                case 'Household Size':
                    vm.dbCurrentCat='householdcount'
                    break;
                case 'Cancer Stage':
                    vm.dbCurrentCat='cancer_stage'
                    break;
                case 'Gender':
                    vm.dbCurrentCat='gender'
                    break;
            }
            draw(vm.dbCurrentCat,vm.dbColor);
          };
          vm.colsel=function() {
            switch(vm.color){
                case 'Ethnicity':
                    vm.dbColor='ethnicity'
                    break;
                case 'Marital Status':
                    vm.dbColor='marital_status'
                    break;
                case 'Household Size':
                    vm.dbColor='householdcount'
                    break;
                case 'Cancer Stage':
                    vm.dbColor='cancer_stage'
                    break;
                case 'Gender':
                    vm.dbColor='gender'
                    break;
            }

            draw(vm.dbCurrentCat,vm.dbColor);
          };

          vm.changeBubbleSize=function(){

            for (var j = 0; j < data.length; j++) {
              data[j].radius = Number(vm.bubbleSize);
              maxRadius = d3.max(_.pluck(data, 'radius'));

            }
            nodes.transition().duration(1000)
                .attr("r", function (d) { return d.radius; })

            //
            // var centers = getCenters(vm.currentCat, [1000, 600]);
            // force.on("tick", tick(centers, vm.currentCat));
            // labels(centers)
            force.start();


          }

          function draw (varname,color) {
            d3.selectAll("circle")
            .style("fill", function (d) { return fill(d[color]); })
            .style("stroke", function (d) { return fill(d[color]); });
            // .attr("r", vm.bubbleSize);
            //


            // if(varname=='age'){
            //   for (var j = 0; j < data.length; j++) {
            //     data[j].radius = +data[j].age / 3;
            //     var maxRadius = d3.max(_.pluck(data, 'radius'));
            //   }
            //   nodes.transition().duration(1000)
            //     .attr("r", function (d) { return d.radius; })
            //     force.start();
            // }else if(varname=='income'){
            //   for (var j = 0; j < data.length; j++) {
            //     data[j].radius = +data[j].income / 2500;
            //     var maxRadius = d3.max(_.pluck(data, 'radius'));
            //   }
            //   nodes.transition().duration(1000)
            //     .attr("r", function (d) { return d.radius; })
            //     force.start();
            // }else if(varname=='uniform'){
            //   for (var j = 0; j < data.length; j++) {
            //     data[j].radius = 20;
            //     var maxRadius = d3.max(_.pluck(data, 'radius'));
            //   }
            //   nodes.transition().duration(1000)
            //     .attr("r", function (d) { return d.radius; })
            //     force.start();
            // }else{
              var centers = getCenters(varname, [1400, 700]);
              force.on("tick", tick(centers, varname));
              labels(centers)
              force.start();
            // }
          }

          function tick (centers, varname) {
            var foci = {};
            for (var i = 0; i < centers.length; i++) {
              foci[centers[i].name] = centers[i];
            }
            return function (e) {

              for (var i = 0; i < data.length; i++) {
                var o = data[i];
                var f = foci[o[varname]];
                o.y += ((f.y + (f.dy / 2)) - o.y) * e.alpha;
                o.x += ((f.x + (f.dx / 2)) - o.x) * e.alpha;
              }
              // for (var i = 0; i < data.length; i++) {
              //   var o = data[i];
              //   var f = foci[o[varname]];
              //   o.y += ((f.y - o.y)-70) * e.alpha;
              //   o.x += (f.x - o.x) * e.alpha;
              // }
              nodes.each(collide(.23))
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; });
            }
          }

          function labels (centers) {
            // svg.selectAll(".label").remove();
            //
            // svg.selectAll(".label")
            // .data(centers).enter().append("text")
            // .attr("class", "label")
            // .text(function (d) { return d.name })
            // .attr("transform", function (d) {
            //   return "translate(" + (d.x  - ((d.name.length)*3))+ ", " + ((d.y - d.r)-50) + ")";
            // });

            svg.selectAll(".label").remove();

            svg.selectAll(".label")
            .data(centers).enter().append("text")
            .attr("class", "label")
            .text(function (d) { return d.name })
            .attr("transform", function (d) {
              if(d.name=='American Indian or Alaskan Native'){
                return "translate(" + (d.x + (d.dx / 3)-50) + ", " + (d.y + 20) + ")";
              }else{
                return "translate(" + (d.x + (d.dx / 3)) + ", " + (d.y + 20) + ")";
              }
            });
          }

          function removePopovers () {
            $('.popover').each(function() {
              $(this).remove();
            });
          }

          function showPopover (d) {
            $(this).popover({
              placement: 'auto top',
              container: 'body',
              trigger: 'manual',
              html : true,
              content: function() {
                return "Ethnicity: " + d.ethnicity + "<br/>Income: " + d.monthly_income + "<br/>Maritial Status: " + d.marital_status +
                       "<br/>Diagnosis: " + d.diagnosis + "<br/>Cancer Stage: " + d.cancer_stage; }
            });
            $(this).popover('show')
          }

          function collide(alpha) {
            var quadtree = d3.geom.quadtree(data);
            return function(d) {
              var r = d.radius + maxRadius + padding,
                  nx1 = d.x - r,
                  nx2 = d.x + r,
                  ny1 = d.y - r,
                  ny2 = d.y + r;
              quadtree.visit(function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                  var x = d.x - quad.point.x,
                      y = d.y - quad.point.y,
                      l = Math.sqrt(x * x + y * y),
                      r = d.radius + quad.point.radius + padding;
                  if (l < r) {
                    l = (l - r) / l * alpha;
                    d.x -= x *= l;
                    d.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                  }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
              });
            };
          }


        }).catch(function(err){
          console.log("error running standard report", err);
        });
    }
  vm.changeDate();

}]);
