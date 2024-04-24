

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/vista-grupal/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.CHrX3MCm.js","_app/immutable/chunks/scheduler.BfJEPAwo.js","_app/immutable/chunks/index.CbF2QnM9.js"];
export const stylesheets = ["_app/immutable/assets/9.DExG7QLg.css"];
export const fonts = [];
