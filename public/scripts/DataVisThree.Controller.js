angular.module("AngelApp").controller("DataVisThreeController", ['$location','$http',
  function($location,$http) {
    console.log('datavis3 controller loaded');

    var vm=this;



      d3.csv('data/AngelFoundation2016.csv', function (error, data) {

        var width = 1000, height = 1000;
        var fill = d3.scale.ordinal().range(['rgb(68,68,68);','rgb(0,82,156)','rgb(68,136,187)','rgb(36,126,176)','rgb(192,215,234)','rgb(230,238,242)'])
        var svg = d3.select("#chart").append("svg")
            .attr("width", width)
            .attr("height", height);

        for (var j = 0; j < data.length; j++) {
          data[j].radius = 4;
          data[j].x = Math.random() * width;
          data[j].y = Math.random() * height;
        }

        var padding = 4;
        var maxRadius = d3.max(_.pluck(data, 'radius'));


        var getCenters = function (vname, size) {
          var centers, map;
          centers = _.uniq(_.pluck(data, vname)).map(function (d) {
            return {name: d, value: 1};
          });

          map = d3.layout.pack().size(size);
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
          .style("fill", function (d) { return fill(d.Gender); })
          .on("mouseover", function (d) { showPopover.call(this, d); })
          .on("mouseout", function (d) { removePopovers(); })
          .call(d3.behavior.drag()
          .on("dragstart", dragstarted)
          .on("drag", dragged)
          .on("dragend", dragended));

function dragstarted(d) {
  d3.select(this).classed("active", true);
}

function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed("active", false);
  force.start();
}

        nodes.transition().duration(1000)
          .attr("r", function (d) { return d.radius; })

        var force = d3.layout.force();

        draw('Ethnic');

        $( ".btn" ).click(function() {
          draw(this.id);
        });

        function draw (varname) {
          if(varname=='age'){
            for (var j = 0; j < data.length; j++) {
              data[j].radius = +data[j].age / 3;
              var maxRadius = d3.max(_.pluck(data, 'radius'));
            }
            nodes.transition().duration(1000)
              .attr("r", function (d) { return d.radius; })
              force.start();
          }else if(varname=='income'){
            for (var j = 0; j < data.length; j++) {
              data[j].radius = +data[j].income / 2500;
              var maxRadius = d3.max(_.pluck(data, 'radius'));
            }
            nodes.transition().duration(1000)
              .attr("r", function (d) { return d.radius; })
              force.start();
          }else if(varname=='uniform'){
            for (var j = 0; j < data.length; j++) {
              data[j].radius = 20;
              var maxRadius = d3.max(_.pluck(data, 'radius'));
            }
            nodes.transition().duration(1000)
              .attr("r", function (d) { return d.radius; })
              force.start();
          }else{
            var centers = getCenters(varname, [900, 900]);
            force.on("tick", tick(centers, varname));
            labels(centers)
            force.start();
          }
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
              o.y += (f.y - o.y) * e.alpha;
              o.x += (f.x - o.x) * e.alpha;
            }
            nodes.each(collide(.11))
              .attr("cx", function (d) { return d.x; })
              .attr("cy", function (d) { return d.y; });
          }
        }

        function labels (centers) {
          svg.selectAll(".label").remove();

          svg.selectAll(".label")
          .data(centers).enter().append("text")
          .attr("class", "label")
          .text(function (d) { return d.name })
          .attr("transform", function (d) {
            return "translate(" + (d.x  - ((d.name.length)*3))+ ", " + (d.y - d.r) + ")";
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
              return "Ethnicity: " + d.Ethnic + "<br/>Income: " + d.MonthlyIncome + "<br/>Maritial Status: " + d.MaritalStatus +
                     "<br/>Diagnosis: " + d.Diagnosis + "<br/>Age: " + d.age; }
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
      });


}]);
