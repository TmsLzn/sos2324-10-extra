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
		client: {"start":"_app/immutable/entry/start.DlD2AtQe.js","app":"_app/immutable/entry/app.DGpR-HxD.js","imports":["_app/immutable/entry/start.DlD2AtQe.js","_app/immutable/chunks/entry.C_08jOh-.js","_app/immutable/chunks/scheduler.BfJEPAwo.js","_app/immutable/chunks/index._VMp3gXv.js","_app/immutable/entry/app.DGpR-HxD.js","_app/immutable/chunks/scheduler.BfJEPAwo.js","_app/immutable/chunks/index.CbF2QnM9.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-D0vTDCCR.js')),
			__memo(() => import('./chunks/1-CmRhM1nK.js')),
			__memo(() => import('./chunks/2-B5gmCNXU.js')),
			__memo(() => import('./chunks/3-CbrEBFT9.js')),
			__memo(() => import('./chunks/4-CJWX6HVk.js')),
			__memo(() => import('./chunks/5-nIltUy8D.js')),
			__memo(() => import('./chunks/6-CFTdhJC2.js')),
			__memo(() => import('./chunks/7-ClDlLs5_.js')),
			__memo(() => import('./chunks/8-BohznqM-.js')),
			__memo(() => import('./chunks/9-CeXikhpm.js'))
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
				id: "/gdp-growth-rates",
				pattern: /^\/gdp-growth-rates\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/gdp-growth-rates/vistas",
				pattern: /^\/gdp-growth-rates\/vistas\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/gdp-growth-rates/[geo]/[time_period]",
				pattern: /^\/gdp-growth-rates\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"geo","optional":false,"rest":false,"chained":false},{"name":"time_period","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/vehicles-stock",
				pattern: /^\/vehicles-stock\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/vehicles-stock/vistas",
				pattern: /^\/vehicles-stock\/vistas\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/vehicles-stock/[geo]/[year]",
				pattern: /^\/vehicles-stock\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"geo","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/vista-grupal",
				pattern: /^\/vista-grupal\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
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
