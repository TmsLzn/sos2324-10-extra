import { c as create_ssr_component, a as each, e as escape } from './ssr-Dllh74Pl.js';
import './Theme.svelte_svelte_type_style_lang-oigkUEv0.js';
import './index-D-fTsvPC.js';

const css = { code: "@import 'styles.css';", map: null };
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let gdp = [];
  $$result.css.add(css);
  return `<title data-svelte-h="svelte-1t8qhtl">gdp-growth-rates</title> ${gdp && gdp.length > 0 ? ` <div class="container"><div style="margin-bottom: 20px; display: flex; justify-content: space-between;"> <button style="background-color: #0366d6; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-tyri6l">Filtros</button>  <button style="background-color: #0366d6; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-kity8u">Borrar filtros</button></div>  <table><thead><tr><th data-svelte-h="svelte-16m37j5">Vista detallada</th> ${each(Object.keys(gdp[0]), (key) => {
    return `<th>${escape(key)}</th>`;
  })}  <th data-svelte-h="svelte-hg8igr">Eliminar dato</th></tr></thead> <tbody>${each(gdp, (dato) => {
    return `<tr><td> <a href="${"gdp-growth-rates/" + escape(dato.geo, true) + "/" + escape(dato.time_period, true)}" style="text-decoration: none; background-color: #666666; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; display: inline-block;">Ver detalles
                            </a></td> ${each(Object.values(dato), (value) => {
      return `<td>${escape(value)}</td>`;
    })} <td> <button style="background-color: #FF0000; color: white; padding: 5px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-h0931e">Eliminar
                            </button></td> </tr>`;
  })}</tbody></table>  <div style="margin-top: 20px; display: flex; justify-content: space-between;"><button style="background-color: #0366d6; color: white; padding: 5px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-okf854">Anterior</button> <button style="background-color: #0366d6; color: white; padding: 5px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-1eife7b">Siguiente</button></div>  <div style="margin-top: 20px; display: flex; justify-content: space-between;"> <button style="background-color: #0366d6; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-72z0kg">Crear Entrada</button>  <button style="background-color: #FF0000; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-1t1g9d7">Eliminar Todos</button>  <button style="background-color: #0366d6; color: white; padding: 5px 20px; border: none; border-radius: 5px; cursor: pointer; " data-svelte-h="svelte-16sz43s">Cargar datos de prueba</button></div></div>  ${``} ${``} <div class="salida"> ${`${``}`}</div>` : `<div style="justify-content: center; text-align: center; margin-top: 20px"><button style="background-color: #0366d6; color: white; padding: 5px 20px; border: none; border-radius: 5px; cursor: pointer; " data-svelte-h="svelte-va0kg8">Cargar datos de prueba</button></div> <p class="container" data-svelte-h="svelte-167bv6c">No hay datos disponibles</p>`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DfUI8YZZ.js.map
