
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






      //get data for graph
Meteor.call('fillGraph',start, end,  function(error, result){
  var data = [];
  var temp = [];
  var close = [];
  var low = [];
  var high = [];
  var volume = [];
  var days = [];

  //var parseDate = d3.time.format("%b %d %Y").parse;
  color = ["blue", "red", "green", "yellow", "brown"];

    for(var i in result){
    //  console.log(result);
      for(var j = 0; j < result[i].length; j++){
        close[i][j] = result[i][j].close;
        //close.push(result[i][j].close);
        low.push(result[i][j].low);
        high.push(result[i][j].high);
        volume.push(result[i][j].volume);
        if(i < 1){
          var day = result[0][j].date;

          //day = day.toString().slice(4,15);
          //day = parseDate(day);
            days.push(day);

          }
        // data.push(close);
        // close = [];
      }
    }
var minClose = d3.min(close);
var maxClose = d3.max(close);
var minLow = d3.min(low);
var maxLow = d3.max(low);
var minHigh = d3.min(high);
var maxHigh = d3.max(high);
var minVolume = d3.min(volume);
var maxVolume = d3.max(volume);
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
  .scale(x)
  .orient("bottom")
  .ticks(5)
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
  .x(function(d, i) { return x(i)})
  .y(function(d) { return y(d)});

  svg.append("path")
    .attr("d", line(close[0]))
    .attr("transform", "translate(" + margin.left  + ", 0)")
    .attr("stroke", color[0])
    .attr('stroke-width', 2)
    .attr('fill', 'none');;
//console.log();

  });
      //end call
}
