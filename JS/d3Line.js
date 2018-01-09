
var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.dt); })
    .y(function(d) { return y(d.LandAverageTemperature); });


var line2 = d3.line()
    .x(function(d) { return x(d.dt); })
    .y(function(d) { return y(d.AvgTempMinus); });

var line3 = d3.line()
    .x(function(d) { return x(d.dt); })
    .y(function(d) { return y(d.AvgTempPlus); });

d3.csv("YearsTemp.csv", function(d) {
  d.LandAverageTemperature = +d.LandAverageTemperature;
  d.AvgTempPlus = +d.AvgTempPlus;
  d.AvgTempMinus = +d.AvgTempMinus;
  d.dt = parseTime(d.dt)
  return d;

}, function(error, data) {
  if (error) throw error;
  x.domain(d3.extent(data, function(d) { return d.dt; }));
  y.domain([0, 2+d3.max(data, function(d) { return d.AvgTempPlus; })]);

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    .select(".domain")
      .remove();

  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Temp");



  var path = g.append("path")
      .attr("d", line(data))
      .attr("stroke", "steelblue")
      .attr("stroke-width", "3")
      .attr("fill", "none");
 var totalLength = path.node().getTotalLength();

 path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(2000)
        .attr("stroke-dashoffset", 0);



var path2 = g.append("path")
      .attr("d", line2(data))
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .attr("fill", "none")
      .attr("opacity",0.6);

 var totalLength2 = path2.node().getTotalLength();

 path2
      .attr("stroke-dasharray", totalLength2 + " " + totalLength2)
      .attr("stroke-dashoffset", totalLength2)
      .transition()
        .duration(2000)
        .attr("stroke-dashoffset", 0);

var path3 = g.append("path")
      .attr("d", line3(data))
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .attr("fill", "none")
      .attr("opacity",0.6);
var totalLength3 = path3.node().getTotalLength();

 path3
      .attr("stroke-dasharray", totalLength3 + " " + totalLength3)
      .attr("stroke-dashoffset", totalLength3)
      .transition()
        .duration(2000)
        .attr("stroke-dashoffset", 0);

  // g.append("path")
  //     .datum(data)
  //     .attr("fill", "none")
  //     .attr("stroke", "steelblue")
  //     .attr("stroke-linejoin", "round")
  //     .attr("stroke-linecap", "round")
  //     .attr("stroke-width", 1)
  //     .attr("class","line2")
  //     .attr("d", line2);

  // g.append("path")
  //     .datum(data)
  //     .attr("fill", "none")
  //     .attr("stroke", "steelblue")
  //     .attr("stroke-linejoin", "round")
  //     .attr("stroke-linecap", "round")
  //     .attr("stroke-width", 1.1)
  //     .attr("class","line3")
  //     .attr("d", line3);

});
