<script>
    import { onMount } from 'svelte';
    import { dev } from '$app/environment';
    import * as d3 from 'd3';

    let API_TLR = '/api/v2/vehicles-stock';
    let errorMsg = '';

    if (dev) {
        API_TLR = 'http://localhost:8080' + API_TLR;
    }

    async function getVehicles() {
        try {
            let response = await fetch(`${API_TLR}?limit=10000`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache'
                }
            });

            if (response.ok) {
                let data = await response.json();
                return data;
            } else {
                if (response.status == 404) {
                    errorMsg = 'No hay datos en la base de datos';
                } else {
                    errorMsg = `Error ${response.status}: ${response.statusText}`;
                }
            }
        } catch (e) {
            errorMsg = e;
        }
    }

    async function getChart() {
        let datos = await getVehicles();
        const chartData = transformData(datos);
        drawChart(chartData);
        showCountryChart('España', datos);
    }

    function transformData(datos) {
        const countrySales = datos.reduce((acc, curr) => {
            if (!acc[curr.geo]) {
                acc[curr.geo] = 0;
            }
            acc[curr.geo] += curr.obs_value;
            return acc;
        }, {});

        const sortedData = Object.entries(countrySales).map(([country, totalSales]) => ({
            country,
            totalSales
        }));

        sortedData.sort((a, b) => b.totalSales - a.totalSales);

        const chartData = {
            categories: sortedData.map((item) => item.country),
            series: sortedData.map((item) => item.totalSales)
        };

        return chartData;
    }

    function showCountryChart(country, datos) {
        const countryData = datos.filter((item) => item.geo === country);
        const countryChartData = transformCountryData(countryData);
        drawCountryChart(countryChartData, country);
    }

    function transformCountryData(countryData) {
        // Ordenamos los datos por el atributo "year"
        countryData.sort((a, b) => a.year - b.year);

        const chartData = {
            categories: [],
            series: []
        };

        // Procesamos los datos ordenados
        countryData.forEach((item) => {
            chartData.categories.push(item.year);
            chartData.series.push(item.obs_value);
        });

        return chartData;
    }

    async function drawChart(chartData) {
        const margin = { top: 20, right: 30, bottom: 30, left: 70 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .domain(chartData.categories)
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(chartData.series)])
            .nice()
            .range([height, 0]);

        const svg = d3.select('#graph')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        svg.selectAll('.bar')
            .data(chartData.categories)
            .join('rect')
            .attr('class', 'bar')
            .attr('x', (d) => x(d))
            .attr('y', (d) => y(chartData.series[chartData.categories.indexOf(d)]))
            .attr('width', x.bandwidth())
            .attr('height', (d) => height - y(chartData.series[chartData.categories.indexOf(d)]))
            .attr('fill', '#3E92CC')
            .on('click', function(event, d) {
                showCountryChart(d, datos);
            });

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .call(d3.axisLeft(y));
    }

    async function drawCountryChart(countryChartData, country) {
        const margin = { top: 50, right: 0, bottom: 30, left: 70 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .domain(countryChartData.categories)
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(countryChartData.series)])
            .nice()
            .range([height, 0]);

        d3.select('#countryGraph').selectAll('*').remove();

        const svg = d3.select('#countryGraph')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        svg.selectAll('.dot')
            .data(countryChartData.categories)
            .join('circle')
            .attr('class', 'dot')
            .attr('cx', (d) => x(d))
            .attr('cy', (d) => y(countryChartData.series[countryChartData.categories.indexOf(d)]))
            .attr('r', 5)
            .attr('fill', '#3E92CC');

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .call(d3.axisLeft(y));

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .text(`Ventas de vehículos en ${country}`);
    }

    let datos;

    onMount(async () => {
        datos = await getVehicles();
        getChart();
    });
</script>

<svelte:head>
    <script src="https://d3js.org/d3.v7.min.js"></script>
</svelte:head>

<div class="container">
    <div class="graph">
        <div id="graph"></div>
    </div>

    <div class="message">
        <span>! </span> Pinche en un país para mostrar más información
    </div>

    <div class="graph">
        <div id="countryGraph"></div>
    </div>
</div>

<style>
    .container {
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

    .message {
        text-align: center;
        margin-top: 20px;
    }

    .message span {
        font-size: 24px;
        color: #ff0000;
    }
</style>
