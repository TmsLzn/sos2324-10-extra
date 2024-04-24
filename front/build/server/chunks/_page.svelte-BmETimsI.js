import { c as create_ssr_component, d as subscribe, a as escape, e as each } from './ssr-CdinOKqd.js';
import { p as page } from './stores-o8O4H_bw.js';
import './exports-DuWZopOC.js';

const css = {
  code: ".card.svelte-19z3zph{background-color:#ffffff;border:1px solid #a4caef;border-radius:5px;box-shadow:0 2px 5px rgba(0, 0, 0, 0.1);padding:20px;max-width:600px;margin:0 auto}table.svelte-19z3zph{width:100%;border-collapse:collapse}td.svelte-19z3zph{border:1px solid #ddd;padding:8px;text-align:left}th.svelte-19z3zph{background-color:#f2f2f2}tr.svelte-19z3zph:nth-child(even){background-color:#f2f2f2}tr.svelte-19z3zph:hover{background-color:#e2e2e2}.value.svelte-19z3zph{width:50%}h2.svelte-19z3zph{text-align:center;color:#0366d6}input[type='text'].svelte-19z3zph{width:100%;padding:12px 20px;margin:8px 0;box-sizing:border-box;border:1px solid #ccc;border-radius:4px;resize:vertical}input[type='text'].svelte-19z3zph:focus{border:3px solid #555}.error.svelte-19z3zph{color:red;font-weight:bold}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let dato = {};
  let geo = $page.params.geo;
  let year = $page.params.year;
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<h2 class="svelte-19z3zph">Vehicle details from ${escape(geo)}:${escape(year)}</h2>  ${` ${Object.keys(dato).length > 0 ? `<div class="container"><div class="card svelte-19z3zph"><table class="svelte-19z3zph"><thead data-svelte-h="svelte-wjdg3n"><th class="svelte-19z3zph">Atributos</th> <th class="svelte-19z3zph">Valor</th></thead> <tbody>${each(Object.entries(dato), ([key, value]) => {
    return `<tr class="svelte-19z3zph"><td class="attribute svelte-19z3zph">${escape(key)}:</td> <td class="value svelte-19z3zph">${typeof value === "object" ? `${escape(JSON.stringify(value))}` : `${escape(value)}`}</td> </tr>`;
  })}</tbody></table> <div style="text-align:center ;margin-top: 20px; display: flex; justify-content: space-between;"><button style="background-color: #0366d6; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-1ayvnnj">Modificar Entrada</button></div></div></div>` : `<p class="container" data-svelte-h="svelte-167bv6c">No hay datos disponibles</p>`}`} ${``}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BmETimsI.js.map
