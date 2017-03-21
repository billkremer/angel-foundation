angular.module("AngelApp").controller("dataVisFourController", ['$location','$http','dataVisFourService','distributionService',
  function($location,$http,dataVisFourService,distributionService) {
    console.log('datavis4 controller loaded');

    var vm=this;
    Number.prototype.round = function(decimals) {
        return Number((Math.round(this + "e" + decimals)  + "e-" + decimals));
    }
    vm.startDate=new Date('01-01-2012');
    vm.endDate=new Date();
    vm.select='ethnicity';
    vm.changeDate=function(){
      if(vm.select=='ethnicity'){
        vm.ethnicity();
      }else{
        vm.distribution();
      }
    }

    vm.option='Amount of Distribution per Category';
    vm.doVis=function(){
      if(vm.option=='Amount of Distribution per Category'){
        vm.distribution();
      }else {
        vm.ethnicity();
      }
    }


vm.ethnicity=function(){
    vm.select='ethnicity';
    var data=[{'label':'Other','value':0,'enabled':true}];
    var objectToGet={title:'ethnicity'};
    // var arrayOfCounties=[];
    dataVisFourService.getDistinct(objectToGet).then(function(res){
      res.data.shift();
      console.log('getDistinct data',res.data);

      // var countyCountArray=[];
      for( var i=0; i<res.data.length;i++){
        var objectForValues={field:'ethnicity',item:res.data[i].ethnicity,start:vm.startDate.toISOString().substring(0,10),end:vm.endDate.toISOString().substring(0,10)};
        dataVisFourService.getValues(objectForValues,i).then(function(res){
          console.log('new stuff from db',res.data);

          if(res.data[0].ethnicity=='Caucasian'||res.data[0].ethnicity=='African American or Black'||res.data[0].ethnicity=='Hispanic'||res.data[0].ethnicity=='Asian'||res.data[0].ethnicity=='American Indian or Alaskan Native'){
              data.push({'label':res.data[0].ethnicity,'value':res.data.length,'enabled':true});
            }else{
              for(var i=0;i<data.length;i++){
                if(data[i].label=='Other'){
                  data[i].value+=res.data.length;
                  data[i].enabled = true;

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

    var w = 600;
    var h = 600;
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


    d3.selectAll("#piesvg").remove();
    var vis = d3.select('#piechart')
                      .append("svg")
                      .data([data])
                      .attr("id","piesvg")
                      .attr("width", w)
                      .attr("height", h)
                      .append("svg:g")
                      .attr("transform", "translate(" + r + "," + r + ")");

    var pie = d3.layout.pie().value(function(d){return d.value;});

    // Declare an arc generator function
    var arc = d3.svg.arc().innerRadius(r/1.5).outerRadius(r);

    // Select paths, use arc generator to draw
    var path = vis.selectAll("g.slice").data(pie(data)).enter().append("svg:g").attr("class", "slice");
    path.append("path")
        .attr("fill", function(d, i){return aColor[i];})
        .attr("d", function (d) {return arc(d);})
          .each(function(d) { this._current = d; });


    // Add the text
    path.append("svg:text")
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
        })
        .on('click', function(label) {
          var rect = d3.select(this);
          var enabled = true;
          var totalEnabled = d3.sum(data.map(function(d) {
            return (d.enabled) ? 1 : 0;
          }));

          if (rect.attr('class') === 'disabled') {
            rect.attr('class', '');
          } else {
            if (totalEnabled < 2) return;
            rect.attr('class', 'disabled');
            enabled = false;
          }

          pie.value(function(d) {
            if (d.label === label) d.enabled = enabled;
            return (d.enabled) ? d.value : 0;
          });

          path = path.data(pie(data));

          path.transition()
            .duration(750);
            // .attrTween('d', function(d) {
            //
            //   var interpolate = d3.interpolate(this._current, d);
            //   this._current = interpolate(0.1);
            //   return function(t) {
            //     return arc(interpolate(t));
            //   };
            // });
        });                               // NEW

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
    vm.select='distribution';
    var data=[{'label':'Utilities','value':0},{'label':'Housing','value':0},{'label':'Food','value':0},{'label':'Other/Adjustment','value':0}];
    var objectToGet={title:'grant_type'};
    // var arrayOfCounties=[];
    distributionService.getDistinct(objectToGet).then(function(res){

      console.log('getDistinct data',res.data);


      for( var i=0; i<res.data.length;i++){
        if(res.data[i].grant_type=="Schwan's Food Card"){
          var objectForValues={field:'grant_type',item:"Schwan''s Food Card",start:vm.startDate.toISOString().substring(0,10),end:vm.endDate.toISOString().substring(0,10)};
        }else{
          var objectForValues={field:'grant_type',item:res.data[i].grant_type,start:vm.startDate.toISOString().substring(0,10),end:vm.endDate.toISOString().substring(0,10)};
        }
        distributionService.getValues(objectForValues,i).then(function(result){
          console.log('new stuff from db',result.data);

          if(result.data[0].grant_type=='Electric Bill Payment'||result.data[0].grant_type=='Phone Bill Payment'||result.data[0].grant_type=='Water Bill Payment'||result.data[0].grant_type=='Garbage Bill Payment'||result.data[0].grant_type=='Gas Bill Payment'){
            for(var i=0;i<data.length;i++){
              if(data[i].label=='Utilities'){
                for(var l=0;l<result.data.length;l++){
                  data[i].value+=parseInt(result.data[l].fund_total.substring(1)) ;
                }
                // data[i].value+=result.data.length;
              }
            }
          }else if(result.data[0].grant_type=='Mortgage Payment'||result.data[0].grant_type=='Rent Payment'){
            for(var i=0;i<data.length;i++){
              if(data[i].label=='Housing'){
                for(var l=0;l<result.data.length;l++){
                  data[i].value+=parseInt(result.data[l].fund_total.substring(1)) ;
                }
                // data[i].value+=result.data.length;
              }
            }
          }else if(result.data[0].grant_type=="Schwan's Food Card"||result.data[0].grant_type=='Target Card'||result.data[0].grant_type=='Grocery Card'){
            for(var i=0;i<data.length;i++){
              if(data[i].label=='Food'){
                for(var l=0;l<result.data.length;l++){
                  data[i].value+=parseInt(result.data[l].fund_total.substring(1)) ;
                }
                // data[i].value+=result.data.length;
              }
            }
          }else if(result.data[0].grant_type=="Adjustment"||result.data[0].grant_type=='Other'){
            for(var i=0;i<data.length;i++){
              if(data[i].label=='Other/Adjustment'){
                for(var l=0;l<result.data.length;l++){
                  if(result.data[0].grant_type=='Adjustment'){
                    data[i].value+=parseInt(result.data[l].fund_total.substring(2)) ;
                  }else{
                    data[i].value+=parseInt(result.data[l].fund_total.substring(1)) ;

                  }
                }
                // data[i].value+=result.data.length;
              }
            }
          }else{
            var sum=0;
            for(var l=0;l<result.data.length;l++){

                sum+=parseInt(result.data[l].fund_total.substring(1));


              if(l==result.data.length-1){

                  data.push({'label':result.data[0].grant_type,'value':sum});

              }
            }
          }
            console.log('data data data',data);
          // if(result.data[0].i==result.data.length-2){

            data.sort(function(a, b) {
                           return parseFloat(b.value) - parseFloat(a.value);
                                      });




        // });

      // }
    //
    // });






    var legendRectSize = 18;
    var legendSpacing = 4;

    var w = 500;
    var h = 500;
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
    d3.selectAll("#piesvg").remove();
    var vis = d3.select('#piechart')
                          .append("svg")
                          .data([data])
                          .attr("id","piesvg")
                          .attr("width", w)
                          .attr("height", h)
                          .append("svg:g")
                          .attr("transform", "translate(" + r + "," + r + ")");

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
