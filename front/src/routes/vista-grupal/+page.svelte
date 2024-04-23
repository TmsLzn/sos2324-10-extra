<script>
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';

	let API_TLR = '/api/v2/vehicles-stock';
	let API_MRF = '/api/v2/gdp-growth-rates';
	let API_ASC = '/api/v2/tourisms-per-age';
	let API_ASB = '/api/v2/cars-by-motor';
	let errorMsg = '';
	let exitMsg = '';
	let datos1,
		datos2 = {};

	if (dev) {
		API_TLR = 'http://localhost:8080' + API_TLR;
		API_MRF = 'http://localhost:8080' + API_MRF;
	}

	onMount(async () => {
		await loadAllData();
		datos1 = await getVehicles();
		datos2 = await getGDP();
		datos2 = replaceGeo(datos2);
		let datos = unificarBD(datos1, datos2);
		console.log('DATOS COMUNES: ' + JSON.stringify(datos));
		datos = getEstadisticas(datos);
		getChart(datos);
	});

	async function getInitialData() {
		try {
			let response = await fetch(API_TLR + '/loadInitialData', {
				method: 'GET'
			});

			if (response.ok) {
				exitMsg = 'Datos Cargados Correctamente';
			} else {
				errorMsg = 'La base de datos no está vacía';
			}
		} catch (error) {
			errorMsg = error;
		}
	}

	async function getVehicles() {
		try {
			await getInitialData();
			let response = await fetch(`${API_TLR}?limit=10000`, {
				method: 'GET',
				headers: {
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache'
				}
			});

			if (response.ok) {
				let data = await response.json();
				console.log('DATOS TLR: ' + JSON.stringify(data));
				return data;
			} else {
				if (response.status == 404) {
					errorMsg = 'No hay datos1 en la base de datos1';
				} else {
					errorMsg = `Error ${response.status}: ${response.statusText}`;
				}
			}
		} catch (e) {
			errorMsg = e;
		}
	}

	async function getInitialGDP() {
		try {
			let response = await fetch(API_MRF + '/loadInitialData', {
				method: 'GET'
			});

			if (response.ok) {
				exitMsg = 'Datos cargados correctamente';
				errorMsg = '';
			}
		} catch (e) {
			errorMsg = e;
		}
	}

	async function getGDP() {
		try {
			await getInitialGDP();
			console.log('Datos correctamente cargados');
			let response = await fetch(API_MRF, {
				method: 'GET'
			});
			if (response.ok) {
				let data = await response.json();
				console.log('API MRF: ' + JSON.stringify(data));
				errorMsg = '';
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

	//Cargar todos los datos
	async function loadAllData() {
		try {
			await getInitialData();
			await getInitialGDP();
		} catch (error) {
			errorMsg = error;
		}
	}

	function replaceGeo(data2) {
		const countryNames = {
			albania: 'Albania',
			austria: 'Austria',
			belgium: 'Bélgica',
			bulgary: 'Bulgaria',
			croatia: 'Croacia',
			cyprus: 'Chipre',
			czech_republic: 'República Checa',
			denmark: 'Dinamarca',
			estonia: 'Estonia',
			finland: 'Finlandia',
			france: 'Francia',
			germany: 'Alemania',
			greece: 'Grecia',
			hungary: 'Hungría',
			ireland: 'Irlanda',
			iceland: 'Islandia',
			italy: 'Italia',
			latvia: 'Letonia',
			lithuania: 'Lituania',
			luxembourg: 'Luxemburgo',
			malta: 'Malta',
			netherlands: 'Países Bajos',
			poland: 'Polonia',
			portugal: 'Portugal',
			romania: 'Rumania',
			slovakia: 'Eslovaquia',
			slovenia: 'Eslovenia',
			spain: 'España',
			sweden: 'Suecia',
			united_kingdom: 'Reino Unido'
		};

		return data2.map((item) => {
			return {
				...item,
				geo: countryNames[item.geo] || item.geo // Si el país no está en la lista, deja el valor original
			};
		});
	}

	//Creamos función que unifique datos
	function unificarBD(data1, data2) {
		// Crear conjuntos de países únicos para cada conjunto de datos
		const geoSet1 = new Set(data1.map((item) => item.geo));
		const geoSet2 = new Set(data2.map((item) => item.geo));

		// Encontrar la intersección de países comunes a todas las bases de datos
		const commonGeoSet = new Set(
			[...geoSet1].filter((geo) => geoSet2.has(geo))
		);

		// Filtrar datos para incluir solo países comunes
		const filteredData1 = data1.filter((item) => commonGeoSet.has(item.geo));
		const filteredData2 = data2.filter((item) => commonGeoSet.has(item.geo));

		// Combinar todos los datos filtrados
		const combinedData = [...filteredData1, ...filteredData2];

		return combinedData;
	}

	// Función para crear la estadística
	function getEstadisticas(datos) {
		const countryData = datos.reduce((acc, curr) => {
			if (!acc[curr.geo]) {
				acc[curr.geo] = { pib: 0, deathsInFlights: 0, volgdp: 0, road_deaths_per_million_inhabitants: 0 }; // Incluir el volgdp
			}
			// Acumulación de PIB si tiene el atributo "frequency"
			if ('frequency' in curr) {
				acc[curr.geo].pib += curr.obs_value;
			}
			// Acumulación de muertes en vuelos si existe flights_passangers
			if (curr.flights_passangers) {
				acc[curr.geo].deathsInFlights += curr.flights_passangers;
			}
			return acc;
		}, {});

		const sortedData = Object.entries(countryData).map(
			([country, { pib, deathsInFlights, volgdp, road_deaths_per_million_inhabitants }]) => ({
				country: country,
				pib: pib,
				deathsInFlights: deathsInFlights,
			})
		);

		const chartData = {
			categories: sortedData.map((item) => item.country),
			series: [
				{
					name: 'PIB Acumulado',
					data: sortedData.map((item) => item.pib)
				},
				{
					name: 'Muertes en Aviones',
					data: sortedData.map((item) => item.deathsInFlights)
				}
			]
		};

		return chartData;
	}

	// Creamos el gráfico
	function getChart(datos) {
		const margin = { top: 20, right: 30, bottom: 30, left: 70 };
		const width = 800 - margin.left - margin.right;
		const height = 400 - margin.top - margin.bottom;

		const svg = d3.select("#graph")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		const x = d3.scaleBand()
			.domain(datos.categories)
			.range([0, width])
			.padding(0.1);

		const y0 = d3.scaleLinear()
			.domain([0, d3.max(datos.series[0].data)])
			.range([height, 0]);

		const y1 = d3.scaleLinear()
			.domain([0, d3.max(datos.series[1].data)])
			.range([height, 0]);

		const color = d3.scaleOrdinal()
			.domain(["PIB Acumulado", "Muertes en Aviones"])
			.range(["#1f77b4", "#ff7f0e"]);

		svg.append("g")
			.attr("transform", `translate(0, ${height})`)
			.call(d3.axisBottom(x));

		svg.append("g")
			.call(d3.axisLeft(y0).tickFormat(d => `${d}`));

		svg.append("g")
			.call(d3.axisRight(y1).tickFormat(d => `${d}`))
			.attr("transform", `translate(${width}, 0)`);

		const bar = svg.selectAll(".bar")
			.data(datos.categories)
			.enter()
			.append("g")
			.attr("class", "bar")
			.attr("transform", d => `translate(${x(d)},0)`);

		bar.append("rect")
			.attr("y", d => y0(datos.series[0].data[datos.categories.indexOf(d)]))
			.attr("height", d => height - y0(datos.series[0].data[datos.categories.indexOf(d)]))
			.attr("width", x.bandwidth() / 2)
			.attr("fill", color("PIB Acumulado"));

		bar.append("rect")
			.attr("y", d => y1(datos.series[1].data[datos.categories.indexOf(d)]))
			.attr("height", d => height - y1(datos.series[1].data[datos.categories.indexOf(d)]))
			.attr("width", x.bandwidth() / 2)
			.attr("transform", `translate(${x.bandwidth() / 2}, 0)`)
			.attr("fill", color("Muertes en Aviones"));

		svg.append("text")
			.attr("x", width /2)
			.attr("y", margin.bottom /100)
			.style("text-anchor", "middle")
			.text("PIB Acumulado vs Muertes en Aviones");

		svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left)
			.attr("x", 0 - (height / 2))
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text("PIB Acumulado");

		svg.append("text")
			.attr("transform", `translate(${width}, ${height / 2}) rotate(90)`)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text("Muertes en Aviones");
	}
</script>

<svelte:head>
	<script src="https://d3js.org/d3.v7.min.js"></script>
</svelte:head>

<div class="container">
	<div class="graph1">
		<div id="graph" style="width:100%; height:400px;"></div>
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
	}

	.graph1 {
		width: 80%;
		margin: 50px auto;
		background-color: #ffffff; /* Blanco */
		border: 1px solid #a4caef; /* Azul claro */
		border-radius: 15px; /* Bordes más redondeados */
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombras */
		padding: 20px;
	}
</style>
