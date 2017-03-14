angular.module("AngelApp").controller("dataVisFourController", ['$location','$http','dataVisService',
  function($location,$http,dataVisService) {
    console.log('datavis4 controller loaded');

    var vm=this;

    var data=[{'label':'Other','value':0}];
    var objectToGet={title:'ethnicity'};
    var arrayOfCounties=[];
    dataVisService.getDistinct(objectToGet).then(function(res){
      res.data.shift();
      console.log(res.data);

      // var countyCountArray=[];
      for( var i=0; i<res.data.length;i++){
        var objectForValues={field:'ethnicity',item:res.data[i].ethnicity};
        dataVisService.getValues(objectForValues,i).then(function(res){
          console.log('new stuff from db',res.data);
          // var count=0;
          // for(var i=0;i<data.length;i++){
          //   if(res.data.length<=data[i].value){
          //     count++;
          //     if(count>=5){
          //       data[0].value+=res.data.length;
          //       i=data.length;
          //     }
          //   }
          //   if(i==data.length-1&&count<5){
          //     data.push({'label':res.data[0].ethnicity,'value':res.data.length});
          //   }
          // }
          data.push({'label':res.data[0].ethnicity,'value':res.data.length});
          // countyCountArray.push(count.data);
          // arrayOfCounties.push({countyName:res.data[count.data[0].i].county+' County',count:count.data[0].count});
          if(res.data[0].i==res.data.length){

            data.sort(function(a, b) {
                                          return parseFloat(b.value) - parseFloat(a.value);
                                      });

            console.log('data array',data);


    //       }
    //     });
    //   }
    //
    // });






    var legendRectSize = 18;
    var legendSpacing = 4;

    var w = 400;
    var h = 400;
    var r = h/2;
    var aColor = [
        'rgb(178, 55, 56)',
        'rgb(213, 69, 70)',
        'rgb(230, 125, 126)',
        'rgb(239, 183, 182)',
        'rgb(250, 205, 206)',
        'rgb(256, 230, 230)'
    ]
    // var color = d3.scale.ordinal(d3.schemeCategory20b);

    // var data = [
    //     {"label":"Colorectale levermetastase (n=336)", "value":74},
    //     {"label": "Primaire maligne levertumor (n=56)", "value":12},
    //     {"label":"Levensmetatase van andere origine (n=32)", "value":7},
    //     {"label":"Beningne levertumor (n=34)", "value":17},
    //     {"label":"Levensmetatase van andere origine (n=32)", "value":27},
    //     {"label":"Beningne levertumor (n=34)", "value":74}
    // ];


    var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");

    var pie = d3.layout.pie().value(function(d){return d.value;});

    // Declare an arc generator function
    var arc = d3.svg.arc().innerRadius(r/1.5).outerRadius(r);

    // Select paths, use arc generator to draw
    var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
    arcs.append("svg:path")
        .attr("fill", function(d, i){return aColor[i];})
        .attr("d", function (d) {return arc(d);})
    ;

    // Add the text
    arcs.append("svg:text")
        .attr("transform", function(d){
            d.innerRadius = 100; /* Distance of label to the center*/
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";}
        )
        .attr("text-anchor", "middle")
        .text( function(d, i) {return data[i].value;})
    ;

    var legend = vis.selectAll('.legend')                     // NEW
        .data(data)                                   // NEW
        .enter()                                                // NEW
        .append('g')                                            // NEW
        .attr('class', 'legend')                                // NEW
        .attr('transform', function(d, i) {                     // NEW
          var height = legendRectSize + legendSpacing;          // NEW
          var offset =  height * aColor.length / 2;     // NEW
          var horz = -6 * legendRectSize;                       // NEW
          var vert = i * height - offset;                       // NEW
          return 'translate(' + horz + ',' + vert + ')';        // NEW
        });                                                     // NEW

      legend.append('rect')                                     // NEW
        .attr('width', legendRectSize)                          // NEW
        .attr('height', legendRectSize)                         // NEW
        .style('fill', function(d,i){
          return aColor[i];
        })                                   // NEW
        .style('stroke', function(d,i){
          return aColor[i];
        });                                // NEW

      legend.append('text')                                     // NEW
        .attr('x', legendRectSize + legendSpacing)              // NEW
        .attr('y', legendRectSize - legendSpacing)              // NEW
        .text(function(d) { return d.label; });

          }
        });
      }

    });
}]);
