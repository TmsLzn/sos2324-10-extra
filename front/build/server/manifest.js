const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.DGe70D85.js","app":"_app/immutable/entry/app.gJaNLSTE.js","imports":["_app/immutable/entry/start.DGe70D85.js","_app/immutable/chunks/entry.B-0cY56T.js","_app/immutable/chunks/scheduler.Bmg8oFKD.js","_app/immutable/chunks/index.D_GRTHN4.js","_app/immutable/entry/app.gJaNLSTE.js","_app/immutable/chunks/scheduler.Bmg8oFKD.js","_app/immutable/chunks/index.r7FLvRHx.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-CTWSwHbn.js')),
			__memo(() => import('./chunks/1-D59yqY_H.js')),
			__memo(() => import('./chunks/2-oZtAySVV.js')),
			__memo(() => import('./chunks/3-XD9167P_.js')),
			__memo(() => import('./chunks/4-CWUxZmpY.js')),
			__memo(() => import('./chunks/5-ie3hYkwS.js')),
			__memo(() => import('./chunks/6-CDIOqaAb.js')),
			__memo(() => import('./chunks/7-o5vXaKhM.js')),
			__memo(() => import('./chunks/8-6ysvsixa.js')),
			__memo(() => import('./chunks/9-DEozup1y.js')),
			__memo(() => import('./chunks/10-DJ1w5LcK.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/cars-by-motor",
				pattern: /^\/cars-by-motor\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/cars-by-motor/[geo]/[time_period]",
				pattern: /^\/cars-by-motor\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"geo","optional":false,"rest":false,"chained":false},{"name":"time_period","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/gdp-growth-rates",
				pattern: /^\/gdp-growth-rates\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/gdp-growth-rates/[geo]/[time_period]",
				pattern: /^\/gdp-growth-rates\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"geo","optional":false,"rest":false,"chained":false},{"name":"time_period","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/tourisms-per-age",
				pattern: /^\/tourisms-per-age\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/tourisms-per-age/[geo]/[time_period]",
				pattern: /^\/tourisms-per-age\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"geo","optional":false,"rest":false,"chained":false},{"name":"time_period","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/vehicles-stock",
				pattern: /^\/vehicles-stock\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/vehicles-stock/[geo]/[year]",
				pattern: /^\/vehicles-stock\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"geo","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
