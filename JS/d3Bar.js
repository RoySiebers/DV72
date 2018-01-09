
var m = [10, 120, 60, 200],
    w = 860 - m[1] - m[3],
    h = 3400 - m[0] - m[2];

var format = d3.format(",.0f");

var x = d3.scale.linear().range([0, w]),
    y = d3.scale.ordinal().rangeRoundBands([0, h+3], .1);

var xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-h),
    yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

var svg = d3.select("body").append("svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
  .append("g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
var avarage = 0;
d3.csv("AugGlobalTemp.csv", function(data) {
                tempByCountry = data;
            });
d3.csv("AugGlobalTemp.csv", function(data) {
                tempByCountry2 = data;
            });
d3.csv("AugGlobalTemp.csv", function(error, data) {
  if (error) throw error;

  // Parse numbers, and sort by value.
  data.forEach(function(d) { 
    d.AverageTemperature = +d.AverageTemperature; 
  avarage = avarage + d.AverageTemperature;
  d.Aug1912 = +d.Aug1912;
  console.log(d.Aug1912);
 
 
  });
  data.sort(function(a, b) { return b.AverageTemperature - a.AverageTemperature; });

  // Set the scale domain.
  x.domain([-34, 30]);
  y.domain(data.map(function(d) { return d.Country; }));

  var bar = svg.selectAll("g.bar")
      .data(data)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(0," + y(d.Country) + ")"; });

  var bar2 = svg.selectAll("g.bar2")
      .data(data)
    .enter().append("g")
    .attr("class", "bar2")
    .attr("transform", function(d) { return "translate(0," + y(d.Country) + ")"; });

 

  bar.append("rect")
      .attr("width", function(d) { return x(d.AverageTemperature); })
      .attr("height", y.rangeBand());

  bar2.append("rect")
      .attr("width", function(d) { return x(d.Aug1912); })
      .attr("height", y.rangeBand());


  bar.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return x(d.AverageTemperature); })
      .attr("y", y.rangeBand() / 2)
      .attr("dx", -3)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return Number(d.diff)});

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
});
// d3.csv("AugGlobalTemp.csv", function(error, data) {
//   if (error) throw error;

//   // Parse numbers, and sort by value.
//   tempByCountry2.forEach(function(d) { d.Aug1912 = +d.Aug1912; 
//   avarage = avarage + d.Aug1912;
 
  
//   });
//   tempByCountry2.sort(function(a, b) { return b.Aug1912 - a.Aug1912; });

//   // Set the scale domain.
//   x.domain([-34, 30]);

//   y.domain(tempByCountry2.map(function(d) { return d.Country; }));

//   var bar2 = svg.selectAll("g.bar2")
//       .data(data)
//     .enter().append("g")
//       .attr("class", "bar2")
//       .attr("transform", function(d) { return "translate(0," + y(d.Country) + ")"; });

  
//   bar2.append("rect")
//       .attr("width", function(d) { return x(d.Aug1912); })
//       .attr("height", y.rangeBand());

  

//   svg.append("g")
//       .attr("class", "x axis")
//       .call(xAxis);

//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis);
// });

