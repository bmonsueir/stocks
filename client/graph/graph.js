
  Template.graph.rendered = function(){

          var totalWidth = $(window).width();
          var totalHeight = $(window).height();
          var outerWidth = Math.floor(totalWidth * 0.8);
          var outerHeight = Math.floor(totalHeight * 0.75);
          var marginPercent = 0.05;
          var margin = { left: Math.floor(totalWidth * marginPercent), top: Math.floor(totalHeight * marginPercent), right: Math.floor(totalWidth * marginPercent), bottom: Math.floor(totalHeight * marginPercent) };


          var numberOfDays = 365;
          var end = new Date();
          var start = new Date(end);
          start.setDate(start.getDate() - numberOfDays);

          var axisY = outerHeight - margin.top;
          var svg = d3.select("#graph").append("svg")
            .attr("width",  outerWidth)
            .attr("height", outerHeight);
          var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          var path = g.append("path");

          var innerWidth  = outerWidth  - margin.left - margin.right;
          var innerHeight = outerHeight - margin.top  - margin.bottom;



          // var line = d3.svg.line()
          //   .x(function(d) { return xScale(d); })
          //   .y(function(d) { return yScale(d); });





          //get data for graph
      Meteor.call('fillGraph',start, end,  function(error, result){
        var close = [];
        var low = [];
        var high = [];
        var volume = [];
        var minClose, maxClose, minLow, minHigh, maxLow, maxHigh, minVolume, maxVolume;
          for(var i in result){

            for(var j = 0; j < result[i].length; j++){
              close.push(result[i][j].close);
              low.push(result[i][j].low);
              high.push(result[i][j].high);
              volume.push(result[i][j].volume);
            }
          }
          minClose = d3.min(close);
          maxClose = d3.max(close);
          minLow = d3.min(low);
          maxLow = d3.max(low);
          minHigh = d3.min(high);
          maxHigh = d3.max(high);
          minVolume = d3.min(volume);
          maxVolume = d3.max(volume);

          var xScale = d3.time.scale()
              .domain([start, end])
              .range([0, innerWidth]);
          var yScale = d3.scale.linear()
              .domain([minClose, maxClose])
              .range([innerHeight, 0]);
          var xAxis = d3.svg.axis()
            .ticks(24)
            .scale(xScale);
            console.log(margin, outerWidth, outerHeight);
          console.log(minClose, maxClose, minLow, minHigh, maxLow, maxHigh, minVolume, maxVolume);
          });
          //end call



    }
