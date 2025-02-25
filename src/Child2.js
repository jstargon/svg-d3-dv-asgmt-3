import React, { Component } from 'react';
import * as d3 from "d3";

class Child2 extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.data2 !== this.props.data2) {
      this.draw(); 
    }
  }

  componentDidMount() {
    this.draw()
  }

  draw(){
    const margin = { top: 40, right: 50, bottom: 50, left: 50 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const data = this.props.data2;

    const groupAverages = d3.rollup(
    data,
    v => d3.mean(v, d => d.tip),
    d => d.day
    );

    const averages = Array.from(groupAverages, ([day, avgTip]) => ({ day, tip: avgTip }));

    // const tips = data.map(d => d.tip)
    // const total_bill = data.map(d => d.total_bill)

    const svg = d3.select(".container2").attr("width", width).attr("height", height);

    const innerChart2 = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    const xScale = d3.scaleBand().domain(averages.map(d => d.day)).range([0, innerWidth]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(averages, d => d.tip)]).range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    innerChart2.selectAll(".x-axis2").data([null]) // Just a placeholder for the axis, as we're not using dynamic data for it.
      .join("g").attr('class','x-axis2') //we have to assign the class we use for selection
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    innerChart2.selectAll(".y-axis2").data([null]) // Similarly, just a placeholder for the axis.
      .join("g").attr('class','y-axis2') //we have to assign the class we use for selection
      .call(yAxis);

    innerChart2.selectAll("rect").data(averages)
      .join("rect")
      .attr("x", d => xScale(d.day))
      .attr("y", d => yScale(d.tip))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d.tip))
      .attr("fill", "#90CEBA");

    svg.append("text")
      .attr("class", "title2")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", margin.top-20)
      .style("font-family", "Times New Roman") 
      .style("font-size", "18px")
      .text("Average Tip by Day");


    svg.append("text")
      .attr("class", "x-axis-label2")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom + 40)
      .style("font-family", "Times New Roman") 
      .style("font-size", "18px")
      .text("Day");

    svg.append("text")  
      .attr("class", "y-axis-label2")
      .attr("text-anchor", "begin")
      .attr("transform", "rotate(-90)")
      .style("font-family", "Times New Roman") 
      .style("font-size", "18px")
      .attr("x", -height / 2)
      .attr("y", margin.left - 30)
      .text("Average Tip");
    // d3.select(".y-axis").selectAll(".tick line").attr("x2", innerWidth).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
    // d3.select(".x-axis").selectAll(".tick line").attr("y1", -innerHeight).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
  }

  render() {
    return (
      <svg className="container2">
        <g className="inner_chart2"></g>
      </svg>
    );
  }
}

export default Child2;