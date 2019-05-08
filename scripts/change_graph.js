/*
Derived from:

Grouped Bar Chart
https://bl.ocks.org/mbostock/3887051

Bar Chart with Negative Values
https://bl.ocks.org/mbostock/2368837

*/
var tooltipFormatChange = d3v4.format(".1%");
var marginChange = {top: 20, right: 200, bottom: 80, left: 50},
    widthChange = 1200 - marginChange.left - marginChange.right,
    heightChange = 500 - marginChange.top - marginChange.bottom;

//chart setup
var svgChange = d3v4.select("#changeGraph").append("svg")
    .attr("width", widthChange + marginChange.left + marginChange.right)
    .attr("height", heightChange + marginChange.top + marginChange.bottom);
    g = svgChange.append("g").attr("transform", "translate(" + marginChange.left + "," + marginChange.top + ")");

//y position calculation function
var yChange = d3v4.scaleLinear()
      .domain([-1, 1])
      .range([heightChange, 0]);

var x0Change = d3v4.scaleBand()  // domain defined below
      .rangeRound([0, widthChange])
      .paddingInner(0.1)
      .paddingOuter(0.1);

var x1Change = d3v4.scaleBand()  // domain and range defined below
    .paddingOuter(0.25)
    .paddingInner(0.15);

//blue, tan, red colors
var zChange = d3v4.scaleOrdinal()
        .range(["#332200","#664400","#996600","#cc8800","#ffaa00","#ffbb33","#ffcc66","#ffd480","#ffdd99","#ffeecc"]);
var legendColorsChange = zChange.range().reverse()
//reference to the y axis
//axisLeft put labels on left side
//ticks(n) refers to # of increment marks on the axis
const yAxisChange = d3v4.axisLeft(yChange).ticks(7,".0%");

d3v4.tsv("./data/changeData.tsv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.year = +d.year;
    d["6M+ Barrels"] = +d["6M+ Barrels"];
    d["1M to 6M Barrels"] = +d["1M to 6M Barrels"];
    d["500,001 to 1M Barrels"] = +d["500,001 to 1M Barrels"];
    d["100,000 to 500,000 Barrels"] = +d["100,000 to 500,000 Barrels"];
    d["60,001 to 100,000 Barrels"] = +d["60,001 to 100,000 Barrels"];
    d["30,001 to 60,000 Barrels"] = +d["30,001 to 60,000 Barrels"];
    d["15,001 to 30,000 Barrels"] = +d["15,001 to 30,000 Barrels"];
    d["7,501 to 15,000 Barrels"] = +d["7,501 to 15,000 Barrels"];
    d["1,001 to 7,500 Barrels"] = +d["1,001 to 7,500 Barrels"];
    d["1 to 1,000 Barrels"] = +d["1 to 1,000 Barrels"];
  });

  //examine first object, retrieve the keys, and discard the first key
  //return resulting array of keys
  var subCategories = Object.keys(data[0]).slice(1);
  var legendTextChange = Object.keys(data[0]).slice(1).reverse();

  //use new array from just the year values for the bottom x-axis
  x0Change.domain(data.map( d =>  d.year ));

  //array of quarterly value names, fitted in the available bottom categories (x0.bandwidth())
  x1Change.domain(subCategories).rangeRound([0, x0Change.bandwidth()])

  // Add bar chart
    var selection = g.selectAll("g")
      .data(data)
      .enter().append("g")
        .attr("transform", d => "translate(" + x0Change(d.year) + ",0)" )
      selection.selectAll("rect")
      //Use map function with the subCategories array and the Econ2 array
       .data(function(d) { return subCategories.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
        .attr("x", d => x1Change(d.key) )
      //If the value is negative, put the top left corner of the rect bar on the zero line
        .attr("y", d => (d.value<0 ? yChange(0) : yChange(d.value)) )
        .attr("width", x1Change.bandwidth())
        .attr("height", d => Math.abs(yChange(d.value) - yChange(0)) )
        .attr("fill", d => zChange(d.key) )
      .on("mouseover", function(){ tooltipChange
        .style("visibility", "visible")})
      .on("mousemove", function(d){ tooltipChange
        .style("top", (d3v4.event.pageY-10)+"px").style("left",(d3v4.event.pageX+10)+"px")
        .text(tooltipFormatChange(d.value)+' change for breweries producing '+d.key+' of beer per year')})
     .on("mouseout", function(){ tooltipChange.style("visibility", "hidden")});
      //can not nest the text element inside the rect element !
      // selection.selectAll("text")
      //    .data(function(d) { return subCategories.map(function(key) { return {key: key, value: d[key]}; }); })
      //     .enter().append("text")
      //     .attr("x", d => x1Change(d.key) )
      // //offset the position of the y value (positive / negative) to have the text over/under the rect bar
      //     .attr("y", d => d.value<=0 ? yChange(0) - (yChange(4) - (Math.abs(yChange(d.value) - yChange(0)) + 20)) : yChange(d.value) - 10)
      //     .style('fill', d => zChange(d.key))
      //     .style('font-size', '0.75em')
      // //make sure one just decimal place is displayed
      //     .text(d => Number.parseFloat(d.value).toFixed(1))

  //add the x-axis
  g.append("g")
      .attr("class", "axisChange")
      .attr("transform", "translate(0," + (heightChange-100) + ")")
      .call(d3v4.axisBottom(x0Change))
      .selectAll(".tick text")
      //use wrap function to wrap long lines in labels
      .call(wrap, x0Change.bandwidth());

  //add the y-axis - notice it does not have css class 'axis'
  g.append('g')
  .call(yAxisChange)

  //idenitfy zero line on the y axis.
  g.append("line")
      .attr("y1", yChange(0))
      .attr("y2", yChange(0))
      .attr("x1", 0)
      .attr("x2", widthChange)
      .attr("stroke", "black");

var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 13)
      .attr("text-anchor", "start")
    .selectAll("g")
    .data(subCategories)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(20," + i * 20 + ")"; });
  legend.append("rect")
      .attr("x", widthChange - 18)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", function(d,i){return legendColorsChange[i]});
  legend.append("text")
          .attr("x", d => d.length > 7 ? (widthChange + 5) : (widthChange - 80))
          .attr("y", 9)
          .attr("dy", "0.22em")
          .text(function(d,i){return legendTextChange[i]});

//https://bl.ocks.org/mbostock/7555321 - wrap long labels
  function wrap(text, width) {
            text.each(function() {
              var text = d3v4.select(this),
                  words = text.text().split(/\s+/).reverse(),
                  word,
                  line = [],
                  lineNumber = 0,
                  lineHeight = 1.1, // ems
                  y = text.attr("y"),
                  dy = parseFloat(text.attr("dy")),
                  tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
              while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                  line.pop();
                  tspan.text(line.join(" "));
                  line = [word];
                  tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
              }
            });
          }
})

var tooltipChange = d3v4.select("body")
      .append("div")
      .style("position", "absolute")
      .style("font-family", "'Open Sans', sans-serif")
      .style("font-size", "12px")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("background-color", "white")
      .style("padding", "5px")
      .style("opacity", "0.9");
