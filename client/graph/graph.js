
  Template.graph.rendered = function(){

          var totalWidth = $(window).width();
          var totalHeight = $(window).height();
          var outerWidth = Math.floor(totalWidth * 0.8);
          var outerHeight = Math.floor(totalHeight * 0.75);
          var marginPercent = 0.05;
          var symbols = [];
          var price = [];
          var days = [];
          var margin = { left: Math.floor(totalWidth * marginPercent), top: Math.floor(totalHeight * marginPercent), right: Math.floor(totalWidth * marginPercent), bottom: Math.floor(totalHeight * marginPercent) };
          var xColumn = "Day";
          var yColumn = "Price";
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
            .ticks(24)
            .scale(xScale);
          var line = d3.svg.line()
            .x(function(d) { return xScale(d); })
            .y(function(d) { return yScale(d); });




          function render(price){
            xScale.domain( d3.extent(price, function (d){ return d; }));
            yScale.domain( d3.extent(days, function (d){ return d; }));
            path.attr("d", line(price));
          }
            svg.append("g")
              .attr("transform", "translate(" + margin.left + "," + axisY  + ")")
              .call(xAxis);

          function type(d){
            // d.timestamp = new Date(d.timestamp);
            // d.temperature = +d.temperature;
            return d;
          }

          //get stock symbols from Mongo
          Meteor.call('findSymbols', function(error, result){
              symbols = result;
              console.log(symbols);
          });


          //get historical data from YahooFinance

          Meteor.call("fillGraph", "AAPL", function(error,result){
              for(var i in result){

                price.push(result[i].close);
                days.push(result[i].date.toString().slice(4, 15));
              }
              //console.log(price);
          });

    }
