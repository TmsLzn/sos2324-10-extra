<svelte:head>
    <script src="https://d3js.org/d3.v7.min.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { dev } from '$app/environment';
    import * as d3 from 'd3';
    import { io } from 'socket.io-client';

    let API_DATA = "/api/v2/gdp-growth-rates";
    let socket;
    let newData = {};

    // Conexión al servidor socket.io
    if (process.env.NODE_ENV === 'development') {
        socket = io('http://localhost:8080');
    } else {
        socket = io(); // Assuming socket.io server is running on the same host
    }

    async function getGDP() {
        try {
            const res = await fetch(API_DATA);
            const data = await res.json();
            console.log(data);
            if (data.length > 0) {
                createScatterChart(data);
                createBarChart(data);
                //updateCharts();
            }
        } catch (error) {
            console.log(`Error fetching data: ${error}`);
        }
    }

    // Función para enviar nuevos datos al servidor
    async function submitData() {
        try {
            // Envía los nuevos datos al servidor a través de socket.io
            socket.emit('newData', newData);
            newData = {}; // Limpia el objeto newData después de enviar los datos
        } catch (error) {
            console.log(`Error sending data: ${error}`);
        }
    }

    // Escuchar eventos de socket.io para recibir datos actualizados
    socket.on('dataUpdated', async (updatedData) => {
        console.log('Received updated data:', updatedData);
        updateCharts(updatedData); // Actualizar las gráficas con los datos actualizados
    });

    // Función para cargar los datos iniciales desde el servidor
    async function loadInitialGDP() {
        try {
            let response = await fetch(API_DATA + "/loadInitialData", {
                method: "GET",
            });

            let status = await response.status;
            console.log(`Status code: ${status}`);
            if (status === 200) {
                await getGDP();
            }
        } catch (error) {
            console.log(`Error loading initial GDP data: ${error}`);
        }
    }

    // Función para actualizar las gráficas con los datos proporcionados
    async function updateCharts(data) {
        try {
            // Limpiar las gráficas existentes
            d3.select("#scatter-chart").selectAll("*").remove();
            d3.select("#bar-chart").selectAll("*").remove();

            // Crear nuevas gráficas con los datos actualizados
            createScatterChart(data);
            createBarChart(data);
        } catch (error) {
            console.log(`Error updating charts: ${error}`);
        }
    }

    function createScatterChart(data) {
            // Remove any existing SVG elements
            d3.select("#scatter-chart").selectAll("*").remove();

            const margin = { top: 50, right: 0, bottom: 30, left: 70 };
            const width = 600 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;


            const svg = d3.select("#scatter-chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            // Ajustar los dominios de las escalas con espacio adicional
            const xPadding = 0.1 * (d3.max(data, d => d.growth_rate_2030) - d3.min(data, d => d.growth_rate_2030));
            const yPadding = 0.1 * (d3.max(data, d => d.growth_rate_2040) - d3.min(data, d => d.growth_rate_2040));

            const xScale = d3.scaleLinear()
                .domain([d3.min(data, d => d.growth_rate_2030) - xPadding, d3.max(data, d => d.growth_rate_2030) + xPadding])
                .range([0, width]);

            const yScale = d3.scaleLinear()
                .domain([d3.min(data, d => d.growth_rate_2040) - yPadding, d3.max(data, d => d.growth_rate_2040) + yPadding])
                .range([height, 0]);

            // Create axis
            const xAxis = d3.axisBottom(xScale);
            const yAxis = d3.axisLeft(yScale);

            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(xAxis);

            svg.append("g")
                .call(yAxis);

            // Group data by country and calculate the mean growth rates
            const groupedData = d3.group(data, d => d.geo);
            const aggregatedData = Array.from(groupedData, ([country, values]) => ({
                geo: country,
                growth_rate_2030: d3.mean(values, d => d.growth_rate_2030),
                growth_rate_2040: d3.mean(values, d => d.growth_rate_2040)
            }));

            // Create points
            svg.selectAll("circle")
                .data(aggregatedData)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(d.growth_rate_2030))
                .attr("cy", d => yScale(d.growth_rate_2040))
                .attr("r", 4)
                .attr("fill", "steelblue");

            // Add country labels
            svg.selectAll(".country-label")
                .data(aggregatedData)
                .enter()
                .append("text")
                .attr("class", "country-label")
                .attr("x", d => xScale(d.growth_rate_2030)) // Adjust the position for better visibility
                .attr("y", d => yScale(d.growth_rate_2040) + 3) // Adjust the position for better visibility
                .text(d => d.geo)
                .style("font-size", "10px") // Adjust font size as needed
                .style("fill", "black") // Adjust font color as needed
                .style("text-anchor", "middle"); // Align text to the middle of the point
        }

    function createBarChart(data) {
        // Remove any existing SVG elements
        d3.select("#bar-chart").selectAll("*").remove();

        const margin = { top: 50, right: 0, bottom: 30, left: 70 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select("#bar-chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Create scales
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.geo))
            .range([0, width])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.growth_rate_2030)])
            .nice()
            .range([height, 0]);

        // Create axis
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        svg.append("g")
            .call(yAxis);

        // Create bars
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.geo))
            .attr("y", d => yScale(d.growth_rate_2030))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.growth_rate_2030))
            .attr("fill", "steelblue");
    }

    onMount(async () => {
        await loadInitialGDP();
        await getGDP();
    });

</script>



<div class="chart-container">
   

    <div class="graph">
        <div id="scatter-chart"></div>
    </div>


    <div class="graph">
        <div id="bar-chart"></div>
    </div>
</div>

<div class="form">
    <div id="form_Create">
        <form on:submit|preventDefault="{submitData}">
            <label>
                Frequency:
                <input type="text" bind:value="{newData.frequency}">
            </label><br>
            <label>
                Unit:
                <input type="text" bind:value="{newData.unit}">
            </label><br>
            <label>
                NA Item:
                <input type="text" bind:value="{newData.na_item}">
            </label><br>
            <label>
                Geo:
                <input type="text" bind:value="{newData.geo}">
            </label><br>
            <label>
                Time Period:
                <input type="number" bind:value="{newData.time_period}">
            </label><br>
            <label>
                Observation Value:
                <input type="number" bind:value="{newData.obs_value}">
            </label><br>
            <label>
                Growth Rate 2030:
                <input type="number" bind:value="{newData.growth_rate_2030}">
            </label><br>
            <label>
                Growth Rate 2040:
                <input type="number" bind:value="{newData.growth_rate_2040}">
            </label><br>
            <button type="submit" on:click="{submitData}">Enviar Datos</button>
        </form>
    </div>
</div>

<style>
    .chart-container {
        width: 100%;
        height: 100%;
        background-color: #89deff;
        color: #333;
        border: 1px solid #89deff;
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .graph {
        width: 100%;
        max-width: 800px;
        margin-top: 20px;
        background-color: #ffffff;
        border: 1px solid #a4caef;
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

  
</style>
