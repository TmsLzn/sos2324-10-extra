import { c as create_ssr_component, e as escape, a as each } from './ssr-Dllh74Pl.js';

const css = {
  code: ".container.svelte-qv5t9d{width:80%;margin:50px auto;background-color:#ffffff;border:1px solid #a4caef;border-radius:5px;box-shadow:0 2px 5px rgba(0, 0, 0, 0.1);padding:20px}table.svelte-qv5t9d{width:100%;border-collapse:collapse}th.svelte-qv5t9d,td.svelte-qv5t9d{border:1px solid #ddd;padding:8px;text-align:left}th.svelte-qv5t9d{background-color:#b5b8cf}tr.svelte-qv5t9d:nth-child(even){background-color:#d1d1e0}tr.svelte-qv5t9d:hover{background-color:#e3e4f1}.modal.svelte-qv5t9d{display:block;position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgba(0, 0, 0, 0.4)}.modal-content.svelte-qv5t9d{background-color:#fefefe;margin:15% auto;padding:20px;border:1px solid #888;width:50%;border-radius:5px;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2),\n			0 6px 20px 0 rgba(0, 0, 0, 0.19)}.close.svelte-qv5t9d{color:#aaa;float:right;font-size:28px;font-weight:bold}.close.svelte-qv5t9d:hover,.close.svelte-qv5t9d:focus{color:black;text-decoration:none;cursor:pointer}input[type='text'].svelte-qv5t9d,input[type='number'].svelte-qv5t9d{width:100%;padding:12px 20px;margin:8px 0;box-sizing:border-box;border:1px solid #ccc;border-radius:4px;resize:vertical}input[type='text'].svelte-qv5t9d:focus,input[type='number'].svelte-qv5t9d:focus{border:3px solid #555}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tourisms = [];
  let page = 1;
  $$result.css.add(css);
  return `<title data-svelte-h="svelte-13j6kra">tourisms-per-age</title>  ${tourisms && tourisms.length > 0 ? ` <div class="container svelte-qv5t9d"><div style="margin-bottom: 20px; display: flex; justify-content: space-between;"><button ${"disabled"}>Anterior</button> <span>Página ${escape(page)}</span> <button ${tourisms.length < 10 ? "disabled" : ""}>Siguiente</button></div> <table class="svelte-qv5t9d"><thead><tr class="svelte-qv5t9d">  ${each(Object.keys(tourisms[0]), (key) => {
    return `${key !== "id" ? ` <th class="svelte-qv5t9d">${escape(key)}</th>` : ``}`;
  })} <th class="svelte-qv5t9d" data-svelte-h="svelte-vo79h5">vista</th>  <th class="svelte-qv5t9d" data-svelte-h="svelte-1xovig1">eliminar</th></tr></thead> <tbody>${each(tourisms, (dato) => {
    return `<tr class="prueba svelte-qv5t9d"> ${each(Object.entries(dato), ([key, value]) => {
      return ` ${key !== "id" ? ` <td class="svelte-qv5t9d">${escape(value)}</td>` : ``}`;
    })}  <td class="svelte-qv5t9d"> <a href="${"/tourisms-per-age/" + escape(dato.geo, true) + "/" + escape(dato.time_period, true)}" style="text-decoration: none; background-color: #4CAF50; color: white; padding: 5px 10px; border: none; border-radius: 5px; cursor: pointer; display: inline-block;">Detalles
							</a></td> <td class="svelte-qv5t9d"><button style="background-color: #d32f2f; color: white; padding: 5px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-1q45fsa">Eliminar</button></td> </tr>`;
  })}</tbody></table>  <div style="margin-top: 20px; display: flex; justify-content: space-between;"><button style="background-color: #6d7fcc; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-116n70e">Crear Turismo</button> <button style="background-color: #d32f2f; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" id="deleteAllButton" data-svelte-h="svelte-5z77kk">Eliminar Todos</button> <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-14pz8fk">Búsqueda Filtrada</button></div></div>    ${``} ${``} ${`${``}`}` : `<button style="background-color: #0366d6; color: white; padding: 5px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-ivbejj">Cargar datos</button> <p class="container svelte-qv5t9d" data-svelte-h="svelte-167bv6c">No hay datos disponibles</p>`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-B2PQ9pu5.js.map
