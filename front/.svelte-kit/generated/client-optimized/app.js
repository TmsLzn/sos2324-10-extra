export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/gdp-growth-rates": [3],
		"/gdp-growth-rates/vistas": [5],
		"/gdp-growth-rates/[geo]/[time_period]": [4],
		"/vehicles-stock": [6],
		"/vehicles-stock/vistas": [8],
		"/vehicles-stock/[geo]/[year]": [7],
		"/vista-grupal": [9]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';