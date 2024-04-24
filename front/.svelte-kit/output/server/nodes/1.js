

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.DtqUkj8E.js","_app/immutable/chunks/scheduler.BfJEPAwo.js","_app/immutable/chunks/index.CbF2QnM9.js"];
export const stylesheets = [];
export const fonts = [];
