import { c as create_ssr_component, b as subscribe, e as escape, a as each } from './ssr-Dllh74Pl.js';
import { p as page } from './stores-DO9HooPy.js';
import './exports-DuWZopOC.js';

const css = {
  code: ".container.svelte-gw6gy1{display:flex;justify-content:center;align-items:center;height:100vh}.card.svelte-gw6gy1{background-color:#fff;border-radius:10px;box-shadow:0 4px 8px rgba(0, 0, 0, 0.1);padding:20px;max-width:600px;width:100%}table.svelte-gw6gy1{width:100%;border-collapse:collapse;margin-bottom:20px}td.svelte-gw6gy1{padding:10px;border-bottom:1px solid #ddd}.attribute.svelte-gw6gy1{font-weight:bold;color:#673ab7}.value.svelte-gw6gy1{width:50%}input[type='text'].svelte-gw6gy1{padding:8px;border:1px solid #ddd;border-radius:4px;width:100%;box-sizing:border-box}input[type='text'].svelte-gw6gy1:focus{outline:none;border-color:#673ab7}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let geo = $page.params.geo;
  let time_period = $page.params.time_period;
  let tourism = {};
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<div class="container svelte-gw6gy1"><div class="card svelte-gw6gy1"><h2 style="color: #673ab7; text-align: center;">Detalles en ${escape(geo)}:${escape(time_period)}</h2> ${` ${Object.keys(tourism).length > 0 ? `<table class="svelte-gw6gy1"><tbody>${each(Object.entries(tourism), ([key, value]) => {
    return `<tr><td class="attribute svelte-gw6gy1">${escape(key)}:</td> <td class="value svelte-gw6gy1">${typeof value === "object" ? `${escape(JSON.stringify(value))}` : `${escape(value)}`}</td> </tr>`;
  })}</tbody></table> <div style="text-align:center; margin-top: 20px;"><button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-jwanwk">Modificar Entrada</button></div>` : `<p style="text-align: center;" data-svelte-h="svelte-r6nnnr">No hay datos disponibles</p>`}`}</div></div> ${`${``}`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CsdgGodM.js.map
