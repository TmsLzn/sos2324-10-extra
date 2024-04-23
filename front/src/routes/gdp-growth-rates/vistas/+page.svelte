<svelte:head>
    <script src="https://d3js.org/d3.v7.min.js"></script>
</svelte:head>
<script>
    import { onMount } from "svelte";

    let API_DATA = "https://sos2324-10.appspot.com/api/v2/gdp-growth-rates";

    async function getGDP() {
        try {
            const res = await fetch(API_DATA);
            const data = await res.json();
            console.log(data);
            if (data.length > 0) {
                createBubbleChart(meanGrowthRate(data));
                createTreemapChart(meanGrowthRate(data));
            }
        } catch (error) {
            console.log(`Error fetching data: ${error}`);
        }
    }

    // Función asíncrona para cargar datos desde el servidor
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
            console.log(`Error loading initail GDP data: ${error}`);
        }
    }

    function meanGrowthRate(data) {
        const groupedData = data.reduce((acc, curr) => {
            if (!acc[curr.geo]) {
                acc[curr.geo] = { total2030: 0, total2040: 0, count: 0 };
            }
            acc[curr.geo].total2030 += curr.growth_rate_2030;
            acc[curr.geo].total2040 += curr.growth_rate_2040;
            acc[curr.geo].count++;
            return acc;
        }, {});

        const averagedData = Object.keys(groupedData).map((country) => {
            const { total2030, total2040, count } = groupedData[country];
            return {
                geo: country,
                growth_rate_2030: total2030 / count,
                growth_rate_2040: total2040 / count,
            };
        });

        return averagedData;
    }

    function createBubbleChart(data) {
        const margin = { top: 20, right: 30, bottom: 30, left: 70 };
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        const svg = d3
            .select("#bubble-container")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.growth_rate_2030)])
            .range([0, width]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.growth_rate_2040)])
            .range([height, 0]);

        const r = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.growth_rate_2030)])
            .range([2, 20]);

        svg.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", (d) => x(d.growth_rate_2030))
            .attr("cy", (d) => y(d.growth_rate_2040))
            .attr("r", (d) => r(d.growth_rate_2030))
            .attr("fill", "steelblue")
            .attr("opacity", 0.5);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .append("text")
            .attr("x", width - margin.right)
            .attr("y", -4)
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .text("Crecimiento 2030");

        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("y", 12)
            .attr("fill", "#000")
            .text("Crecimiento 2040");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 10)
            .attr("text-anchor", "middle")
            .text("Estimación de crecimiento en las próximas décadas");
    }

    async function createTreemapChart(data) {
        const margin = { top: 20, right: 30, bottom: 30, left: 70 };
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        const svg = d3
            .select("#treemap-container")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const treemap = d3
            .treemap()
            .size([width, height])
            .padding(1)
            .round(true);

        const root = d3
            .hierarchy({ children: data })
            .sum((d) => d.value)
            .sort((a, b) => b.value - a.value);

        treemap(root);

        const leaf = svg
            .selectAll("g")
            .data(root.leaves())
            .join("g")
            .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

        leaf.append("rect")
            .attr("fill", "steelblue")
            .attr("width", (d) => d.x1 - d.x0)
            .attr("height", (d) => d.y1 - d.y0);

        leaf.append("text")
            .attr("fill", "white")
            .attr("x", 3)
            .attr("y", 13)
            .text((d) => d.data.name)
            .style("font-size", "12px")
            .style("font-weight", "bold");
    }

    onMount(async () => {
        await loadInitialGDP();
        await getGDP();
    });
</script>


<div id="bubble-container"></div>
<br />
<div id="treemap-container"></div>
