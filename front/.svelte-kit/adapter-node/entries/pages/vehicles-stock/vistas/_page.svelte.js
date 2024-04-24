import { c as create_ssr_component } from "../../../../chunks/ssr.js";
import "d3";
const css = {
  code: ".container.svelte-1hojb56.svelte-1hojb56{width:100%;height:100%;background-color:#89deff;color:#333;border:1px solid #89deff;border-radius:15px;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);padding:20px;display:flex;flex-direction:column;align-items:center}.graph.svelte-1hojb56.svelte-1hojb56{width:100%;max-width:800px;margin-top:20px;background-color:#ffffff;border:1px solid #a4caef;border-radius:15px;box-shadow:0 0 10px rgba(0, 0, 0, 0.1)}.message.svelte-1hojb56.svelte-1hojb56{text-align:center;margin-top:20px}.message.svelte-1hojb56 span.svelte-1hojb56{font-size:24px;color:#ff0000}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1eq4axz_START --><script src="https://d3js.org/d3.v7.min.js" data-svelte-h="svelte-1nxlm2a"><\/script><!-- HEAD_svelte-1eq4axz_END -->`, ""} <div class="container svelte-1hojb56" data-svelte-h="svelte-zrrd8b"><div class="graph svelte-1hojb56"><div id="graph"></div></div> <div class="message svelte-1hojb56"><span class="svelte-1hojb56">!</span> Pinche en un país para mostrar más información</div> <div class="graph svelte-1hojb56"><div id="countryGraph"></div></div> </div>`;
});
export {
  Page as default
};
