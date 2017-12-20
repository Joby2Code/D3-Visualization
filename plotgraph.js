
$(document).ready(function(){
    var results = null;
    $("#update").click(function(){
        $("#scatter-load").html("");
        var myfile = $("#csvfile")[0].files[0];
        var json = Papa.parse(myfile,
            {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                console.log("Column names:", results.meta.fields);
                console.log("Errors:", results.errors);
                plotData(results.data);
           }
        });
    })
    $("#update2").click(function(){
    var csvfile = "car.csv";
    $.get(csvfile, function (data) {
        var results = Papa.parse(data, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true
        });
        plotData(results.data);
    });
  });
});

function plotData(results) {
    var jsonCsvData = results;
    showScatterPlot(jsonCsvData);
}

function showScatterPlot(data) {

 var width = 800;
 var height = 600;
 var padding = 50;

 var xParam = d3.select("#sel-x").property("value")
 var yParam = d3.select("#sel-y").property("value")


 var div = d3.select("body").append("div")
           .attr("class", "tooltip")
           .style("opacity", 0);

//Create scale functions
var xScale = d3.scale.linear()
 							       .domain([0
                       ,
                       d3.max(data, function(d) {
                       if(xParam.trim() === 'Mpg')
             					    return +d.mpg;
                       if(xParam.trim() === 'cylinders')
                          return +d.cylinders;
                       if(xParam.trim() === 'displacement')
                          return +d.displacement;
                       if(xParam.trim() === 'Horsepower')
                          return +d.horsepower;
                       if(xParam.trim() === 'Weight')
                          return +d.weight;
                       if(xParam.trim() === 'acceleration')
                          return +d.acceleration;
                     })])
 								     .range([padding, width - padding]);

var yScale = d3.scale.linear()
                     .domain([0
                       ,
                       d3.max(data, function(d) {
                       if(yParam.trim() === 'Mpg')
             					    return +d.mpg;
                       if(yParam.trim() === 'cylinders')
                          return +d.cylinders;
                       if(yParam.trim() === 'displacement')
                          return +d.displacement;
                       if(yParam.trim() === 'Horsepower')
                          return +d.horsepower;
                       if(yParam.trim() === 'Weight')
                          return +d.weight;
                       if(yParam.trim() === 'acceleration')
                          return +d.acceleration;
                     })])
                     .range([height - padding, padding]);

//Define X axis
var xAxis = d3.svg.axis()
              .scale(xScale)
         		  .orient("bottom");
//Define Y axis
var yAxis = d3.svg.axis()
     				  .scale(yScale)
              .orient("left");
//Create SVG element
var svg = d3.select("body")
            .selectAll("#scatter-load")
            .append("svg")
            .attr("width", width)
	          .attr("height", height);

//Create circles
console.log(xParam);
var mpgMin = d3.select("#mpg-min").property("value")
var mpgMax = d3.select("#mpg-max").property("value")

	         svg.append("g")
              .attr("id", "circles")
            	.selectAll("circle")
            	.data(data)
            	.enter()
            	.append("circle")
              .filter(function(d){
                if(d.mpg >= mpgMin && d.mpg <= mpgMax ) {
                    console.log(d) ;
                   return d.mpg;
                 }
              })
            	.attr("cx", function(d) {
                      console.log(d);

                      if(xParam.trim() === 'Mpg')
                         return xScale(+d.mpg);
                      if(xParam.trim() === 'cylinders')
                         return xScale(+d.cylinders);
                      if(xParam.trim() === 'displacement')
                         return xScale(+d.displacement);
                      if(xParam.trim() === 'Horsepower')
                         return xScale(+d.horsepower);
                      if(xParam.trim() === 'Weight')
                         return xScale(+d.weight);
                      if(xParam.trim() === 'acceleration')
                         return xScale(+d.acceleration);
            			   })

            			   .attr("cy", function(d) {
                       if(yParam.trim() === 'Mpg')
                          return yScale(+d.mpg);
                       if(yParam.trim() === 'cylinders')
                          return yScale(+d.cylinders);
                       if(yParam.trim() === 'displacement')
                          return yScale(+d.displacement);
                       if(yParam.trim() === 'Horsepower')
                          return yScale(+d.horsepower);
                       if(yParam.trim() === 'Weight')
                          return yScale(+d.weight);
                       if(yParam.trim() === 'acceleration')
                          return yScale(+d.acceleration);
            			   })
              .attr("r", 3)
              .on("mouseover", function(d) {
                           d3.select("#hovered").text("Car: "+d.name.toUpperCase()+" "+d.displacement+" "+d.mpg)
                           div.transition()
                              .duration(10)
                              .style("opacity", 0);
                         })
                       .on("mouseout", function(d) {
                           div.transition()
                              .duration(200)
                              .style("opacity", 0);
                         });


//Create X axis
var xLabel = d3.select("#sel-x").property("value")
           svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + (height - padding + 5) + ")")
              .call(xAxis)
              .append("text")
              .attr("class", "label")
              .attr("x", width)
              .attr("y", -6)
              .style("text-anchor", "end")
              .text(xLabel);

//Create Y axis
var yLabel = d3.select("#sel-y").property("value")
          svg.append("g")
             .attr("class", "y axis")
             .attr("transform", "translate(" + (padding - 5) + ",0)")
             .call(yAxis)
             .append("text")
             .attr("class", "label")
             .attr("transform", "rotate(-90)")
             .attr("y", 6)
             .attr("dy", ".71em")
             .style("text-anchor", "end")
             .text(yLabel);

}
