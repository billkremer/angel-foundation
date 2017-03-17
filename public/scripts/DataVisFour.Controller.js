angular.module("AngelApp").controller("dataVisFourController", ['$location','$http','dataVisService','distributionService',
  function($location,$http,dataVisService,distributionService) {
    console.log('datavis4 controller loaded');

    var vm=this;

vm.ethnicity=function(){
    var data=[{'label':'Other','value':0}];
    var objectToGet={title:'ethnicity'};
    // var arrayOfCounties=[];
    dataVisService.getDistinct(objectToGet).then(function(res){
      res.data.shift();
      console.log('getDistinct data',res.data);

      // var countyCountArray=[];
      for( var i=0; i<res.data.length;i++){
        var objectForValues={field:'ethnicity',item:res.data[i].ethnicity};
        dataVisService.getValues(objectForValues,i).then(function(res){
          console.log('new stuff from db',res.data);

          if(res.data[0].ethnicity=='Caucasian'||res.data[0].ethnicity=='African American or Black'||res.data[0].ethnicity=='Hispanic'||res.data[0].ethnicity=='Asian'||res.data[0].ethnicity=='American Indian or Alaskan Native'){
              data.push({'label':res.data[0].ethnicity,'value':res.data.length});
            }else{
              for(var i=0;i<data.length;i++){
                if(data[i].label=='Other'){
                  data[i].value+=res.data.length;
                }
              }

            }
            console.log('data data data',data);
          // if(res.data[0].i==res.data.length-2){

            data.sort(function(a, b) {
                           return parseFloat(b.value) - parseFloat(a.value);
                                      });




        // });

      // }
    //
    // });






    var legendRectSize = 18;
    var legendSpacing = 4;

    var w = 400;
    var h = 400;
    var r = h/2;
    var aColor = [
        'rgb(68,68,68)',
        'rgb(0,82,156)',
        'rgb(36,126,176)',
        'rgb(68,136,187)',
        'rgb(192,215,234)',
        'rgb(230,238,242)'
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
    d3.selectAll("svg").remove();
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
          var horz = -5.5 * legendRectSize;                       // NEW
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

        //   }
        });
      }

    });
}




// ======================================================end of ethnicity




vm.distribution=function(){
    var data=[{'label':'Utilities','value':0},{'label':'Housing','value':0},{'label':'Food','value':0},];
    var objectToGet={title:'grant_type'};
    // var arrayOfCounties=[];
    distributionService.getDistinct(objectToGet).then(function(res){

      console.log('getDistinct data',res.data);


      for( var i=0; i<res.data.length;i++){
        if(res.data[i].grant_type=="Schwan's Food Card"){
          var objectForValues={field:'grant_type',item:"Schwan''s Food Card"};
        }else{
          var objectForValues={field:'grant_type',item:res.data[i].grant_type};
        }
        distributionService.getValues(objectForValues,i).then(function(res){
          console.log('new stuff from db',res.data);

          if(res.data[0].grant_type=='Electric Bill Payment'||res.data[0].grant_type=='Phone Bill Payment'||res.data[0].grant_type=='Water Bill Payment'||res.data[0].grant_type=='Garbage Bill Payment'||res.data[0].grant_type=='Gas Bill Payment'){
            for(var i=0;i<data.length;i++){
              if(data[i].label=='Utilities'){
                data[i].value+=res.data.length;
              }
            }
          }else if(res.data[0].grant_type=='Mortgage Payment'||res.data[0].grant_type=='Rent Payment'){
            for(var i=0;i<data.length;i++){
              if(data[i].label=='Housing'){
                data[i].value+=res.data.length;
              }
            }
          }else if(res.data[0].grant_type=="Schwan's Food Card"||res.data[0].grant_type=='Target Card'||res.data[0].grant_type=='Grocery Card'){
            for(var i=0;i<data.length;i++){
              if(data[i].label=='Food'){
                data[i].value+=res.data.length;
              }
            }
          }else{
            data.push({'label':res.data[0].grant_type,'value':res.data.length});
          }
            console.log('data data data',data);
          // if(res.data[0].i==res.data.length-2){

            data.sort(function(a, b) {
                           return parseFloat(b.value) - parseFloat(a.value);
                                      });




        // });

      // }
    //
    // });






    var legendRectSize = 18;
    var legendSpacing = 4;

    var w = 400;
    var h = 400;
    var r = h/2;
    var aColor = [
        'rgb(68,68,68)',
        'rgb(0,82,156)',
        'rgb(36,126,176)',
        'rgb(68,136,187)',
        'rgb(192,215,234)',
        'rgb(230,238,242)',
        'rgb(256,256,256)'
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
    d3.selectAll("svg").remove();
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
          var horz = -5.5 * legendRectSize;                       // NEW
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

          // }
        });
      }

    });
}



vm.ethnicity();
}]);
