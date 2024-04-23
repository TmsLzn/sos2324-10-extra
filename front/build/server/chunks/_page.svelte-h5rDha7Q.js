import { c as create_ssr_component, b as subscribe, e as escape, a as each } from './ssr-Dllh74Pl.js';
import { p as page } from './stores-DO9HooPy.js';
import './exports-DuWZopOC.js';

const css = {
  code: ".card.svelte-mkw026{background-color:#fff;border:1px solid #49b027;border-radius:5px;box-shadow:0 2px 5px rgba(0, 0, 0, 0.1);padding:20px;max-width:600px;margin:0 auto}table.svelte-mkw026{width:100%;border-collapse:collapse}td.svelte-mkw026{border:1px solid #ddd;padding:8px;text-align:left}.container.svelte-mkw026{width:80%;margin:50px auto;background-color:#ffffff;border:1px solid #a4caef;border-radius:5px;box-shadow:0 2px 5px rgba(0, 0, 0, 0.1);padding:20px}input[type='text'].svelte-mkw026{width:100%;padding:8px;border:1px solid #ddd;border-radius:5px}button[type='submit'].svelte-mkw026{margin-top:10px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let car = {};
  let geo = $page.params.geo;
  let time_period = $page.params.time_period;
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<h2>Ubicación: ${escape(geo)} Año:${escape(time_period)}</h2> ${` ${Object.keys(car).length > 0 ? `<div class="container svelte-mkw026"><div class="card svelte-mkw026"><table class="svelte-mkw026"><tbody>${each(Object.entries(car), ([key, value]) => {
    return `<tr><td class="attribute svelte-mkw026">${escape(key)}:</td> <td class="value svelte-mkw026">${typeof value === "object" ? `${escape(JSON.stringify(value))}` : `${escape(value)}`}</td> </tr>`;
  })}</tbody></table> <div style="text-align:center ;margin-top: 20px; display: flex; justify-content: space-between;"><button style="background-color: #8bc34a; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-1uo87go">Modificar Entrada</button></div></div></div>` : `<p class="container svelte-mkw026" data-svelte-h="svelte-167bv6c">No hay datos disponibles</p>`}`} ${`${``}`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-h5rDha7Q.js.map
