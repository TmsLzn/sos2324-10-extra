import { c as create_ssr_component } from "../../../chunks/ssr.js";
const css = {
  code: ".container.svelte-tr8um6{width:100%;height:100%;background-color:#89deff;color:#333;border:1px solid #89deff;border-radius:15px;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);padding:20px}.graph1.svelte-tr8um6{width:80%;margin:50px auto;background-color:#ffffff;border:1px solid #a4caef;border-radius:15px;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);padding:20px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-178nwy_START --><script src="https://d3js.org/d3.v7.min.js" data-svelte-h="svelte-1nxlm2a"><\/script><!-- HEAD_svelte-178nwy_END -->`, ""} <div class="container svelte-tr8um6" data-svelte-h="svelte-1n78l6b"><div class="graph1 svelte-tr8um6"><div id="graph" style="width:100%; height:400px;"></div></div> </div>`;
});
export {
  Page as default
};
