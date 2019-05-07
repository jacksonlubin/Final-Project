// URL: https://observablehq.com/@jacksonlubin/project/2
// Title: Project
// Author: jacksonlubin (@jacksonlubin)
// Version: 650
// Runtime version: 1

const m0 = {
  id: "2c11c369fbf1d611@650",
  variables: [
    {
      name: "viewof numberchart",
      inputs: ["d3","DOM","width","height","numberseries","ncolor","nx","ny","tooltip","nxAxis","nyAxis","nlegend","margin"],
      value: (function(d3,DOM,width,height,numberseries,ncolor,nx,ny,tooltip,nxAxis,nyAxis,nlegend,margin)
{
  const svg = d3.select(DOM.svg(width, height));

  svg.append("g")
    .selectAll("g")
    .data(numberseries)
    .join("g")
      .attr("fill", d => ncolor(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", (d, i) => nx(d.data.Year))
      .attr("y", d => ny(d[1]))
      .attr("height", d => ny(d[0]) - ny(d[1]))
      .attr("width", nx.bandwidth())
  .on("mouseover", d => tooltip
        .style("visibility", "visible")
        .text(d.data.year))
      .on("mousemove", d => tooltip
        .style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px")
        .text(d[1]))
     .on("mouseout", d => tooltip.style("visibility", "hidden"));

  svg.append("g")
      .call(nxAxis);

  svg.append("g")
      .call(nyAxis);

  svg.append("g")
      .call(nlegend);
  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "30px") 
        .style("text-decoration", "bold")  
        .text("Number of each size brewery");
  return svg.node();
}
)
    },
    {
      name: "numberchart",
      inputs: ["Generators","viewof numberchart"],
      value: (G, _) => G.input(_)
    },
    {
      name: "barrelschart",
      inputs: ["d3","DOM","width","height","barrelsseries","color","x","barrelsData","y","tooltip","xAxis","yAxis","nlegend","margin"],
      value: (function(d3,DOM,width,height,barrelsseries,color,x,barrelsData,y,tooltip,xAxis,yAxis,nlegend,margin)
{
  const svg = d3.select(DOM.svg(width, height));

  svg.append("g")
    .selectAll("g")
    .data(barrelsseries)
    .join("g")
      .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", (d, i) => x(barrelsData,d.data.Year))
      .attr("y", d => y(barrelsData,d[1]))
      .attr("height", d => y(barrelsData,d[0]) - y(d[1]))
      .attr("width", x(barrelsData).bandwidth())
   .on("mouseover", d => tooltip
        .style("visibility", "visible")
        .text(d.data.year))
      .on("mousemove", d => tooltip
        .style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px")
        .text(d[1]))
     .on("mouseout", d => tooltip.style("visibility", "hidden"));

  svg.append("g")
      .call(barrelsData, xAxis);

  svg.append("g")
      .call(barrelsData, yAxis);

  svg.append("g")
      .call(nlegend);
  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "30px") 
        .style("text-decoration", "bold")  
        .text("Barrels produced by each size brewery");
  return svg.node();
}
)
    },
    {
      name: "employeechart",
      inputs: ["d3","DOM","width","height","employeeseries","ecolor","ex","ey","tooltip","exAxis","eyAxis","elegend","margin"],
      value: (function(d3,DOM,width,height,employeeseries,ecolor,ex,ey,tooltip,exAxis,eyAxis,elegend,margin)
{
  const svg = d3.select(DOM.svg(width, height));

  svg.append("g")
    .selectAll("g")
    .data(employeeseries)
    .join("g")
      .attr("fill", d => ecolor(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", (d, i) => ex(d.data.Year))
      .attr("y", d => ey(d[1]))
      .attr("height", d => ey(d[0]) - ey(d[1]))
      .attr("width", ex.bandwidth())
   .on("mouseover", d => tooltip
        .style("visibility", "visible")
        .text(d.data.year))
      .on("mousemove", d => tooltip
        .style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px")
        .text(d[1]))
     .on("mouseout", d => tooltip.style("visibility", "hidden"));

  svg.append("g")
      .call(exAxis);

  svg.append("g")
      .call(eyAxis);

  svg.append("g")
      .call(elegend);
  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "30px") 
        .style("text-decoration", "bold")  
        .text("Total Employment by each size brewery");
  return svg.node();
}
)
    },
    {
      name: "chart",
      inputs: ["d3","DOM","width","height","salaryData","x0","groupKey","keys","x1","sy","scolor","tooltip","sxAxis","syAxis","slegend","margin"],
      value: (function(d3,DOM,width,height,salaryData,x0,groupKey,keys,x1,sy,scolor,tooltip,sxAxis,syAxis,slegend,margin)
{
  const svg = d3.select(DOM.svg(width, height));

  svg.append("g")
    .selectAll("g")
    .data(salaryData)
    .join("g")
      .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
    .selectAll("rect")
    .data(d => keys.map(key => ({key, value: d[key]})))
    .join("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => sy(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => sy(0) - sy(d.value))
      .attr("fill", d => scolor(d.key))
  .on("mouseover", d => tooltip
        .style("visibility", "visible")
        .text(d.value))
      .on("mousemove", d => tooltip
        .style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px")
        .text(d.value))
     .on("mouseout", d => tooltip.style("visibility", "hidden"));
  
  svg.append("g")
      .call(sxAxis);

  svg.append("g")
      .call(syAxis);

  svg.append("g")
      .call(slegend);
  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "30px") 
        .style("text-decoration", "bold")  
        .text("Average salary by each size brewery");
  return svg.node();
  
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Data Analysis Appendix`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md ` ### Brewery Production Map Data `
)})
    },
    {
      name: "breweryData",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://raw.githubusercontent.com/jacksonlubin/final_project/master/cleanedData4.json')
)})
    },
    {
      name: "us",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json("https://unpkg.com/us-atlas@1/us/10m.json")
)})
    },
    {
      name: "tooltip",
      inputs: ["d3"],
      value: (function(d3){return(
d3.select("body")
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
      .style("opacity", "0.9")
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Barrels Produced by Year: Data and Anaylsis`
)})
    },
    {
      name: "barrelsData",
      inputs: ["d3"],
      value: (async function(d3){return(
await d3.csv('https://raw.githubusercontent.com/jacksonlubin/final_project/master/Barrels.csv', (d, i, columns) => (d3.autoType(d)))
)})
    },
    {
      name: "barrelsseries",
      inputs: ["d3","barrelsData"],
      value: (function(d3,barrelsData){return(
d3.stack().keys(barrelsData['columns'].slice(1))(barrelsData)
)})
    },
    {
      name: "x",
      inputs: ["d3","margin","width"],
      value: (function(d3,margin,width){return(
function x(data){
return d3.scaleBand()
    .domain(data.map(d => d['Year']))
    .range([margin.left, width - margin.right-150])
    .padding(0.1)
}
)})
    },
    {
      name: "y",
      inputs: ["d3","height","margin"],
      value: (function(d3,height,margin){return(
function y(data){
  return d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.max(d, d => d[1]))])
    .rangeRound([height - margin.bottom, margin.top])
}
)})
    },
    {
      name: "color",
      inputs: ["d3","barrelsseries"],
      value: (function(d3,barrelsseries){return(
function color(data){
  return d3.scaleOrdinal()
    .domain(barrelsseries.map(d => d.key))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), barrelsseries.length).reverse())
    .unknown("#ccc")
}
)})
    },
    {
      name: "xAxis",
      inputs: ["height","margin","d3","x"],
      value: (function(height,margin,d3,x){return(
function xAxis(data){
 return g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x(data)).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove())
}
)})
    },
    {
      name: "yAxis",
      inputs: ["margin","d3","y"],
      value: (function(margin,d3,y){return(
function yAxis(data){
  return g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y(data)).ticks(null, "s"))
    .call(g => g.selectAll(".domain").remove())
}
)})
    },
    {
      name: "legend",
      inputs: ["width","margin","barrelsseries","color"],
      value: (function(width,margin,barrelsseries,color){return(
svg => {
  const g = svg
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .attr("transform", `translate(${width - margin.right/2},${margin.top})`)
    .selectAll("g")
    .data(barrelsseries.slice().reverse())
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

  g.append("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", d => color(d.key));

  g.append("text")
      .attr("x", -20)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text(d => d.key);
}
)})
    },
    {
      name: "height",
      value: (function(){return(
600
)})
    },
    {
      name: "margin",
      value: (function(){return(
{top: 80, right: 80, bottom: 50, left: 40}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Number of Breweries by Year: Data and Anaylsis`
)})
    },
    {
      name: "numberData",
      inputs: ["d3"],
      value: (async function(d3){return(
await d3.csv('https://raw.githubusercontent.com/jacksonlubin/final_project/master/Number.csv', (d, i, columns) => (d3.autoType(d)))
)})
    },
    {
      name: "numberseries",
      inputs: ["d3","numberData"],
      value: (function(d3,numberData){return(
d3.stack().keys(numberData['columns'].slice(1))(numberData)
)})
    },
    {
      name: "nx",
      inputs: ["d3","numberData","margin","width"],
      value: (function(d3,numberData,margin,width){return(
d3.scaleBand()
    .domain(numberData.map(d => d['Year']))
    .range([margin.left, width - margin.right-150])
    .padding(0.1)
)})
    },
    {
      name: "ny",
      inputs: ["d3","numberseries","height","margin"],
      value: (function(d3,numberseries,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(numberseries, d => d3.max(d, d => d[1]))])
    .rangeRound([height - margin.bottom, margin.top])
)})
    },
    {
      name: "ncolor",
      inputs: ["d3","numberseries"],
      value: (function(d3,numberseries){return(
d3.scaleOrdinal()
    .domain(numberseries.map(d => d.key))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), numberseries.length).reverse())
    .unknown("#ccc")
)})
    },
    {
      name: "nxAxis",
      inputs: ["height","margin","d3","nx"],
      value: (function(height,margin,d3,nx){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(nx).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove())
)})
    },
    {
      name: "nyAxis",
      inputs: ["margin","d3","ny"],
      value: (function(margin,d3,ny){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(ny).ticks(null, "s"))
    .call(g => g.selectAll(".domain").remove())
)})
    },
    {
      name: "nlegend",
      inputs: ["width","margin","numberseries","ncolor"],
      value: (function(width,margin,numberseries,ncolor){return(
svg => {
  const g = svg
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .attr("transform", `translate(${width - margin.right/2},${margin.top})`)
    .selectAll("g")
    .data(numberseries.slice().reverse())
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

  g.append("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", d => ncolor(d.key));

  g.append("text")
      .attr("x", -20)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text(d => d.key);
}
)})
    },
    {
      name: "nheight",
      value: (function(){return(
600
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Total Employment by Brewery Size by Year: Data and Anaylsis`
)})
    },
    {
      name: "employeesData",
      inputs: ["d3"],
      value: (async function(d3){return(
await d3.csv('https://raw.githubusercontent.com/jacksonlubin/final_project/master/Employees.csv', (d, i, columns) => (d3.autoType(d)))
)})
    },
    {
      name: "employeeseries",
      inputs: ["d3","employeesData"],
      value: (function(d3,employeesData){return(
d3.stack().keys(employeesData['columns'].slice(1))(employeesData)
)})
    },
    {
      name: "ex",
      inputs: ["d3","employeesData","margin","width"],
      value: (function(d3,employeesData,margin,width){return(
d3.scaleBand()
    .domain(employeesData.map(d => d['Year']))
    .range([margin.left, width - margin.right-150])
    .padding(0.1)
)})
    },
    {
      name: "ey",
      inputs: ["d3","employeeseries","height","margin"],
      value: (function(d3,employeeseries,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(employeeseries, d => d3.max(d, d => d[1]))])
    .rangeRound([height - margin.bottom, margin.top])
)})
    },
    {
      name: "ecolor",
      inputs: ["d3","employeeseries"],
      value: (function(d3,employeeseries){return(
d3.scaleOrdinal()
    .domain(employeeseries.map(d => d.key))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), employeeseries.length).reverse())
    .unknown("#ccc")
)})
    },
    {
      name: "exAxis",
      inputs: ["height","margin","d3","nx"],
      value: (function(height,margin,d3,nx){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(nx).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove())
)})
    },
    {
      name: "eyAxis",
      inputs: ["margin","d3","ey"],
      value: (function(margin,d3,ey){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(ey).ticks(null, "s"))
    .call(g => g.selectAll(".domain").remove())
)})
    },
    {
      name: "elegend",
      inputs: ["width","margin","employeeseries","ecolor"],
      value: (function(width,margin,employeeseries,ecolor){return(
svg => {
  const g = svg
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .attr("transform", `translate(${width - margin.right/2},${margin.top})`)
    .selectAll("g")
    .data(employeeseries.slice().reverse())
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

  g.append("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", d => ecolor(d.key));

  g.append("text")
      .attr("x", -20)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text(d => d.key);
}
)})
    },
    {
      name: "eheight",
      value: (function(){return(
600
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Average Salary by Brewery Size by Year: Data and Anaylsis`
)})
    },
    {
      name: "salaryData",
      inputs: ["d3"],
      value: (async function(d3){return(
Object.assign(await d3.csv("https://raw.githubusercontent.com/jacksonlubin/final_project/master/Salary.csv", d3.autoType), {y: "Average Salary"})
)})
    },
    {
      name: "salaryseries",
      inputs: ["d3","salaryData"],
      value: (function(d3,salaryData){return(
d3.stack().keys(salaryData['columns'].slice(1))(salaryData)
)})
    },
    {
      name: "x0",
      inputs: ["d3","salaryData","groupKey","margin","width"],
      value: (function(d3,salaryData,groupKey,margin,width){return(
d3.scaleBand()
    .domain(salaryData.map(d => d[groupKey]))
    .rangeRound([margin.left, width - margin.right])
    .paddingInner(0.1)
)})
    },
    {
      name: "x1",
      inputs: ["d3","keys","x0"],
      value: (function(d3,keys,x0){return(
d3.scaleBand()
    .domain(keys)
    .rangeRound([0, x0.bandwidth()])
    .padding(0.05)
)})
    },
    {
      name: "sy",
      inputs: ["d3","salaryData","keys","height","margin"],
      value: (function(d3,salaryData,keys,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(salaryData, d => d3.max(keys, key => d[key]))]).nice()
    .rangeRound([height - margin.bottom, margin.top])
)})
    },
    {
      name: "sxAxis",
      inputs: ["height","margin","d3","x0"],
      value: (function(height,margin,d3,x0){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x0).tickSizeOuter(0))
    .call(g => g.select(".domain").remove())
)})
    },
    {
      name: "syAxis",
      inputs: ["margin","d3","sy","salaryData"],
      value: (function(margin,d3,sy,salaryData){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(sy).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(salaryData.sy))
)})
    },
    {
      name: "groupKey",
      inputs: ["salaryData"],
      value: (function(salaryData){return(
salaryData.columns[0]
)})
    },
    {
      name: "keys",
      inputs: ["salaryData"],
      value: (function(salaryData){return(
salaryData.columns.slice(1)
)})
    },
    {
      name: "scolor",
      inputs: ["d3","salaryseries"],
      value: (function(d3,salaryseries){return(
d3.scaleOrdinal()
    .domain(salaryseries.map(d => d.key))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), salaryseries.length).reverse())
    .unknown("#ccc")
)})
    },
    {
      name: "slegend",
      inputs: ["width","scolor"],
      value: (function(width,scolor){return(
svg => {
  const g = svg
      .attr("transform", `translate(${width},0)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("g")
    .data(scolor.domain().slice().reverse())
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

  g.append("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", scolor);

  g.append("text")
      .attr("x", -24)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text(d => d);
}
)})
    },
    {
      name: "sheight",
      value: (function(){return(
600
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Total Employment by Brewery Size by Year: Data and Anaylsis`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Imports Appendix`
)})
    },
    {
      name: "topojson",
      inputs: ["require"],
      value: (function(require){return(
require("topojson-client@3")
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    },
    {
      name: "z",
      inputs: ["require"],
      value: (function(require){return(
require('https://bundle.run/zebras@0.0.11')
)})
    },
    {
      name: "embed",
      inputs: ["require"],
      value: (function(require){return(
require("vega-embed@3")
)})
    }
  ]
};

const notebook = {
  id: "2c11c369fbf1d611@650",
  modules: [m0]
};

export default notebook;
