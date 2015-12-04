
  Template.graph.rendered = function(){

          var totalWidth = $(window).width();
          var totalHeight = $(window).height();
          var outerWidth = Math.floor(totalWidth * 0.8);
          var outerHeight = Math.floor(totalHeight * 0.8);
          var marginPercent = 0.05;

          var margin = { left: Math.floor(totalWidth * marginPercent), top: Math.floor(totalHeight * marginPercent), right: Math.floor(totalWidth * marginPercent), bottom: Math.floor(totalHeight * marginPercent) };
          var xColumn = "timestamp";
          var yColumn = "temperature";
          var axisY = outerHeight - margin.top;
          var svg = d3.select("#graph").append("svg")
            .attr("width",  outerWidth)
            .attr("height", outerHeight);
          var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          var path = g.append("path");

          var innerWidth  = outerWidth  - margin.left - margin.right;
          var innerHeight = outerHeight - margin.top  - margin.bottom;

          var xScale = d3.time.scale().range([0, innerWidth]);
          var yScale = d3.scale.linear().range([innerHeight, 0]);
          var xAxis = d3.svg.axis()
            .ticks(20)
            .scale(xScale);
          var line = d3.svg.line()
            .x(function(d) { return xScale(d[xColumn]); })
            .y(function(d) { return yScale(d[yColumn]); });

          function render(data){
            xScale.domain( d3.extent(data, function (d){ return d[xColumn]; }));
            yScale.domain( d3.extent(data, function (d){ return d[yColumn]; }));
            path.attr("d", line(data));
          }
            svg.append("g")
              .attr("transform", "translate(" + margin.left + "," + axisY  + ")")
              .call(xAxis);

          function type(d){
            d.timestamp = new Date(d.timestamp);
            d.temperature = +d.temperature;
            return d;
          }


      var prices =   Meteor.call('stockSearch', 'GOOG');

            d3.csv(prices, type, render);
          ;

    }
