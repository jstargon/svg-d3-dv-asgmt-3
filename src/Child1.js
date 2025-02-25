import React, { Component } from 'react';
import * as d3 from "d3";

class Child1 extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.data1 !== this.props.data1) {
      this.draw(); 
    }
  }

  componentDidMount() {
    this.draw();
  }

  draw(){
    const margin = { top: 40, right: 50, bottom: 50, left: 50 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const data = this.props.data1;

    // const tips = data.map(d => d.tip)
    // const total_bill = data.map(d => d.total_bill)

    const svg = d3.select(".container").attr("width", width).attr("height", height);

    const innerChart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.total_bill)]).range([0, innerWidth]);

    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.tip)]).range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

  
    innerChart.selectAll(".x-axis").data([null]) // Just a placeholder for the axis, as we're not using dynamic data for it.
      .join("g").attr('class','x-axis') //we have to assign the class we use for selection
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    innerChart.selectAll(".y-axis").data([null]) // Similarly, just a placeholder for the axis.
      .join("g").attr('class','y-axis') //we have to assign the class we use for selection
      .call(yAxis);

    innerChart.selectAll("circle").data(data).join("circle").attr("r", 3).attr("fill", "#90CEBA")
      .attr("cx", data => xScale(data.total_bill)).attr("cy", data => yScale(data.tip))

    svg.append("text")
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", margin.top-20)
      .style("font-family", "Times New Roman") 
      .style("font-size", "18px")
      .text("Total Bill vs Tips");


    svg.append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom + 40)
      .style("font-family", "Times New Roman") 
      .style("font-size", "18px")
      .text("Total Bill");

    svg.append("text")  
      .attr("class", "y-axis-label")
      .attr("text-anchor", "begin")
      .attr("transform", "rotate(-90)")
      .style("font-family", "Times New Roman") 
      .style("font-size", "18px")
      .attr("x", -height / 2)
      .attr("y", margin.left - 30)
      .text("Tips");
    // d3.select(".y-axis").selectAll(".tick line").attr("x2", innerWidth).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
    // d3.select(".x-axis").selectAll(".tick line").attr("y1", -innerHeight).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
  }

  render() {
    return (
      <svg className="container">
        <g className="inner_chart"></g>
      </svg>
    );
  }
}

export default Child1;