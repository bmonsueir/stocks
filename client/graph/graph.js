Template.graph.rendered = function(){

var totalWidth = $(window).width();
var totalHeight = $(window).height();
var outerWidth = Math.floor(totalWidth * 0.8);
var outerHeight = Math.floor(totalHeight * 0.75);
var marginPercent = 0.05;
var margin = { left: Math.floor(totalWidth * marginPercent), top: Math.floor(totalHeight * marginPercent), right: Math.floor(totalWidth * marginPercent), bottom: Math.floor(totalHeight * marginPercent) };


var numberOfDays = 365 * 1;
var end = new Date();
var start = new Date(end);
start.setDate(start.getDate() - numberOfDays);


var svg = d3.select("#graph").append("svg")
  .attr("width",  outerWidth)
  .attr("height", outerHeight);
var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var path = g.append("path");

var innerWidth  = outerWidth  - margin.left - margin.right;
var innerHeight = outerHeight - margin.top  - margin.bottom;



Meteor.call('fillGraph',start, end,  function(error, result){
  var close0 = [];
  var close1 = [];
  var close2 = [];
  var close3 = [];
  var close4 = [];
  var days = [];
  var maxC = [];
  var minC = [];
  var size = result.length;

  //var parseDate = d3.time.format("%b %d %Y").parse;



      for(var j = 0; j < result[0].length; j++){
        if(size > 0) close0.push(result[0][j].close);
        if(size > 1) close1.push(result[1][j].close);
        if(size > 2) close2.push(result[2][j].close);
        if(size > 3) close3.push(result[3][j].close);
        if(size > 4) close4.push(result[4][j].close);
        days.push(result[0][j].date);

          }
          if(size > 0) {
            maxC.push(d3.max(close0));
            minC.push(d3.min(close0));
          }

          if(size > 1) {
            maxC.push(d3.max(close1));
            minC.push(d3.min(close1));
          }

          if(size > 2) {
            maxC.push(d3.max(close2));
            minC.push(d3.min(close2));
          }

          if(size > 3) {
            maxC.push(d3.max(close3));
            minC.push(d3.min(close3));
          }

          if(size > 4) {
            maxC.push(d3.max(close4));
            minC.push(d3.min(close4));
          }


var minClose = d3.min(minC);
var maxClose = d3.max(maxC);
var displayX =d3.time.scale()
    .domain([start, end])
    .range([margin.left,innerWidth]);

var x = d3.time.scale()
    .domain([0,days.length])
    .range([margin.left, innerWidth]);
var y = d3.scale.linear()
    .domain([minClose, maxClose])
    .range([innerHeight, 0]);
//var dayX = d3.time.scale().domain([start,end]);
var xAxisLabelText = "Time";
var xAxisLabelOffset = margin.left / 2;

var yAxisLabelText = "Price USD";
var yAxisLabelOffset = margin.top / 2;

var xAxis = d3.svg.axis()
  .scale(displayX)
  .orient("bottom")
  .ticks(12)
.outerTickSize(1);
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(10)
  .tickFormat(d3.format("s"))
  .outerTickSize(1);
g.append("g")
  .attr("transform", "translate(0," + innerHeight  + ")")
  .call(xAxis);


g.append("g")
  .attr("transform", "translate(" + margin.left  + ", 0)")
  .call(yAxis);


var line = d3.svg.line()
  .x(function(d, i) { return x(i);})
  .y(function(d) { return y(d);});

if(size > 0){
  svg.append("path")
    .attr("d", line(close0))
    .attr("transform", "translate(" + margin.left  + ", 0)")
    .attr("stroke", "#5555FF")
    .attr('stroke-width', 2)
    .attr('fill', 'none');
  }

if(size > 1){
  svg.append("path")
    .attr("d", line(close1))
    .attr("transform", "translate(" + margin.left  + ", 0)")
    .attr("stroke", "#FF0000")
    .attr('stroke-width', 2)
    .attr('fill', 'none');
  }

if(size > 2){
  svg.append("path")
    .attr("d", line(close2))
    .attr("transform", "translate(" + margin.left  + ", 0)")
    .attr("stroke", "#00FF00")
    .attr('stroke-width', 2)
    .attr('fill', 'none');
  }

if(size > 3){
  svg.append("path")
    .attr("d", line(close3))
    .attr("transform", "translate(" + margin.left  + ", 0)")
    .attr("stroke", "#FFFF00")
    .attr('stroke-width', 2)
    .attr('fill', 'none');
  }

if(size > 4){
  svg.append("path")
    .attr("d", line(close4))
    .attr("transform", "translate(" + margin.left  + ", 0)")
    .attr("stroke", "#FF8888")
    .attr('stroke-width', 2)
    .attr('fill', 'none');
  }
  });
      //end call
};
