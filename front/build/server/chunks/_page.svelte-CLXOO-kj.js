import { c as create_ssr_component, a as each, e as escape } from './ssr-Dllh74Pl.js';

const css = {
  code: "body.svelte-116itkk{font-family:Arial, sans-serif;line-height:1.6;margin:0;padding:0;background-color:#f3f7ff;color:#333}.container.svelte-116itkk{width:80%;margin:50px auto;background-color:#ffffff;border:1px solid #a4caef;border-radius:15px;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);padding:20px}table.svelte-116itkk{width:100%;border-collapse:collapse}th.svelte-116itkk,td.svelte-116itkk{border:1px solid #ddd;padding:8px;text-align:center}th.svelte-116itkk{background-color:#f2f2f2}tr.svelte-116itkk:nth-child(even){background-color:#f2f2f2}tr.svelte-116itkk:hover{background-color:#e2e2e2}.modal.svelte-116itkk{display:block;position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgba(0, 0, 0, 0.4)}.modal-content.svelte-116itkk{background-color:#fefefe;margin:15% auto;padding:20px;border:1px solid #888;width:50%;border-radius:5px;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2),\n			0 6px 20px 0 rgba(0, 0, 0, 0.19)}.close.svelte-116itkk{color:#aaa;float:right;font-size:28px;font-weight:bold}.close.svelte-116itkk:hover,.close.svelte-116itkk:focus{color:black;text-decoration:none;cursor:pointer}input[type='text'].svelte-116itkk,input[type='number'].svelte-116itkk{width:100%;padding:12px 20px;margin:8px 0;box-sizing:border-box;border:1px solid #ccc;border-radius:4px;resize:vertical}input[type='text'].svelte-116itkk:focus,input[type='number'].svelte-116itkk:focus{border:3px solid #555}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let datos = [];
  $$result.css.add(css);
  return `  <body class="svelte-116itkk"> <title data-svelte-h="svelte-1mkk7jm">vehicles-stock</title> ${datos && datos.length > 0 ? ` <div class="container svelte-116itkk"><div style="margin-bottom: 20px; display: flex; justify-content: space-between;"><button style="background-color: #0366d6; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-3cthx5">Filtros</button></div> <table class="svelte-116itkk"><thead><tr class="svelte-116itkk"><th class="svelte-116itkk" data-svelte-h="svelte-16m37j5">Vista detallada</th> ${each(Object.keys(datos[0]), (key) => {
    return `<th class="svelte-116itkk">${escape(key)}</th>`;
  })}  <th class="svelte-116itkk" data-svelte-h="svelte-hg8igr">Eliminar dato</th></tr></thead> <tbody>${each(datos, (dato) => {
    return `<tr class="svelte-116itkk"><td class="svelte-116itkk"> <a href="${"/vehicles-stock/" + escape(dato.geo, true) + "/" + escape(dato.year, true)}" style="text-decoration: none; background-color: #666666; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; display: inline-block;">Ver detalles
								</a></td> ${each(Object.values(dato), (value) => {
      return `<td class="svelte-116itkk">${escape(value)}</td>`;
    })}  <td class="svelte-116itkk"><button style="background-color: #FF0000; color: white; padding: 5px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-pzztjg">Eliminar
								</button></td> </tr>`;
  })}</tbody></table> <div style="margin-top: 20px; display: flex; justify-content: space-between;"><button style="background-color: #0366d6; color: white; padding: 5px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-1gs886g">Anterior</button> <button style="background-color: #0366d6; color: white; padding: 5px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-1ue0lqv">Siguiente</button></div>  <div style="margin-top: 20px; display: flex; justify-content: space-between;"><button style="background-color: #0366d6; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-1by9m05">Crear Entrada</button>  <button style="background-color: #FF0000; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" data-svelte-h="svelte-1dkiza5">Eliminar Todos</button></div></div>   ${``}  ${``} ${``}` : `<div style="justify-content: center; text-align: center; margin-top: 20px"><button style="background-color: #0366d6; color: white; padding: 5px 20px; border: none; border-radius: 5px; cursor: pointer; " data-svelte-h="svelte-1uzzw59">Cargar datos</button></div> <p class="container svelte-116itkk" data-svelte-h="svelte-167bv6c">No hay datos disponibles</p>`} </body>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CLXOO-kj.js.map