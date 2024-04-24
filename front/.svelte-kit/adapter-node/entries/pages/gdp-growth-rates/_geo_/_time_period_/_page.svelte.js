import { c as create_ssr_component, d as subscribe, a as escape, e as each } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
const css = {
  code: "@import 'styles_2.css';",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let dato = {};
  let geo = $page.params.geo;
  let time_period = $page.params.time_period;
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<h1>Modificar datos de ${escape(geo)} en el año ${escape(time_period)}</h1> ${` ${Object.keys(dato).length > 0 ? `<div class="container"><div class="card"><table><thead data-svelte-h="svelte-wjdg3n"><th>Atributos</th> <th>Valor</th></thead> <tbody>${each(Object.entries(dato), ([key, value]) => {
    return `<tr><td class="attribute">${escape(key)}:</td> <td class="value">${typeof value === "object" ? `${escape(JSON.stringify(value))}` : `${escape(value)}`}</td> </tr>`;
  })}</tbody></table> <div style="text-align:center ;margin-top: 20px; display: flex; justify-content: space-between;"><button style="background-color: #0366d6; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-f9kktg">Modificar dato</button></div></div></div>` : `<p class="container" data-svelte-h="svelte-167bv6c">No hay datos disponibles</p>`}`}  ${`${``}`}`;
});
export {
  Page as default
};
