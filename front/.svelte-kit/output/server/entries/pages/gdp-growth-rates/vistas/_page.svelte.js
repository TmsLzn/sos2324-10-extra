import { c as create_ssr_component, f as add_attribute } from "../../../../chunks/ssr.js";
import * as d3 from "d3";
import { io } from "socket.io-client";
const css = {
  code: ".chart-container.svelte-57rdbw{width:100%;height:100%;background-color:#89deff;color:#333;border:1px solid #89deff;border-radius:15px;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);padding:20px;display:flex;flex-direction:column;align-items:center}.graph.svelte-57rdbw{width:100%;max-width:800px;margin-top:20px;background-color:#ffffff;border:1px solid #a4caef;border-radius:15px;box-shadow:0 0 10px rgba(0, 0, 0, 0.1)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let socket;
  let newData = {};
  if (process.env.NODE_ENV === "development") {
    socket = io("http://localhost:8080");
  } else {
    socket = io();
  }
  socket.on("dataUpdated", async (updatedData) => {
    console.log("Received updated data:", updatedData);
    updateCharts(updatedData);
  });
  async function updateCharts(data) {
    try {
      d3.select("#scatter-chart").selectAll("*").remove();
      d3.select("#bar-chart").selectAll("*").remove();
      createScatterChart(data);
      createBarChart(data);
    } catch (error) {
      console.log(`Error updating charts: ${error}`);
    }
  }
  function createScatterChart(data) {
    d3.select("#scatter-chart").selectAll("*").remove();
    const margin = { top: 50, right: 0, bottom: 30, left: 70 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const svg = d3.select("#scatter-chart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
    const xPadding = 0.1 * (d3.max(data, (d) => d.growth_rate_2030) - d3.min(data, (d) => d.growth_rate_2030));
    const yPadding = 0.1 * (d3.max(data, (d) => d.growth_rate_2040) - d3.min(data, (d) => d.growth_rate_2040));
    const xScale = d3.scaleLinear().domain([
      d3.min(data, (d) => d.growth_rate_2030) - xPadding,
      d3.max(data, (d) => d.growth_rate_2030) + xPadding
    ]).range([0, width]);
    const yScale = d3.scaleLinear().domain([
      d3.min(data, (d) => d.growth_rate_2040) - yPadding,
      d3.max(data, (d) => d.growth_rate_2040) + yPadding
    ]).range([height, 0]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
    svg.append("g").call(yAxis);
    const groupedData = d3.group(data, (d) => d.geo);
    const aggregatedData = Array.from(groupedData, ([country, values]) => ({
      geo: country,
      growth_rate_2030: d3.mean(values, (d) => d.growth_rate_2030),
      growth_rate_2040: d3.mean(values, (d) => d.growth_rate_2040)
    }));
    svg.selectAll("circle").data(aggregatedData).enter().append("circle").attr("cx", (d) => xScale(d.growth_rate_2030)).attr("cy", (d) => yScale(d.growth_rate_2040)).attr("r", 4).attr("fill", "steelblue");
    svg.selectAll(".country-label").data(aggregatedData).enter().append("text").attr("class", "country-label").attr("x", (d) => xScale(d.growth_rate_2030)).attr(
      "y",
      (d) => yScale(d.growth_rate_2040) + 3
      // Adjust the position for better visibility
    ).text((d) => d.geo).style("font-size", "10px").style(
      "fill",
      "black"
      // Adjust font color as needed
    ).style("text-anchor", "middle");
  }
  function createBarChart(data) {
    d3.select("#bar-chart").selectAll("*").remove();
    const margin = { top: 50, right: 0, bottom: 30, left: 70 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const svg = d3.select("#bar-chart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
    const xScale = d3.scaleBand().domain(data.map((d) => d.geo)).range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.growth_rate_2030)]).nice().range([height, 0]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", ".15em").attr("transform", "rotate(-65)");
    svg.append("g").call(yAxis);
    svg.selectAll("rect").data(data).enter().append("rect").attr("x", (d) => xScale(d.geo)).attr("y", (d) => yScale(d.growth_rate_2030)).attr("width", xScale.bandwidth()).attr("height", (d) => height - yScale(d.growth_rate_2030)).attr("fill", "steelblue");
  }
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1eq4axz_START --><script src="https://d3js.org/d3.v7.min.js" data-svelte-h="svelte-1nxlm2a"><\/script><!-- HEAD_svelte-1eq4axz_END -->`, ""}  <div class="chart-container svelte-57rdbw" data-svelte-h="svelte-t1hnv4"><div class="graph svelte-57rdbw"><div id="scatter-chart"></div></div> <div class="graph svelte-57rdbw"><div id="bar-chart"></div></div></div> <div class="form"><div id="form_Create"><form><label>Frequency:
                <input type="text"${add_attribute("value", newData.frequency, 0)}> </label><br> <label>Unit:
                <input type="text"${add_attribute("value", newData.unit, 0)}> </label><br> <label>NA Item:
                <input type="text"${add_attribute("value", newData.na_item, 0)}> </label><br> <label>Geo:
                <input type="text"${add_attribute("value", newData.geo, 0)}> </label><br> <label>Time Period:
                <input type="number"${add_attribute("value", newData.time_period, 0)}> </label><br> <label>Observation Value:
                <input type="number"${add_attribute("value", newData.obs_value, 0)}> </label><br> <label>Growth Rate 2030:
                <input type="number"${add_attribute("value", newData.growth_rate_2030, 0)}> </label><br> <label>Growth Rate 2040:
                <input type="number"${add_attribute("value", newData.growth_rate_2040, 0)}> </label><br> <button type="submit" data-svelte-h="svelte-54dbhf">Enviar Datos</button></form></div> </div>`;
});
export {
  Page as default
};
