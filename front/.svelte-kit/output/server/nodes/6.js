

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/vehicles-stock/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.B1S4Ht1w.js","_app/immutable/chunks/scheduler.BfJEPAwo.js","_app/immutable/chunks/index.CbF2QnM9.js","_app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = ["_app/immutable/assets/6.sjAGB_i9.css"];
export const fonts = [];
