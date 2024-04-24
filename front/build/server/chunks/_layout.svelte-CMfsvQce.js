import { c as create_ssr_component, v as validate_component } from './ssr-CdinOKqd.js';
import './Theme.svelte_svelte_type_style_lang-CuqmeY3f.js';
import './index-uCGmsODE.js';

const css$1 = {
  code: ".container.svelte-112uxnp.svelte-112uxnp{width:80%;margin:20px auto;display:flex;justify-content:space-between;align-items:center;background-color:#fff;border:1px solid #a4caef;border-radius:5px;box-shadow:0 2px 5px rgba(0, 0, 0, 0.1);padding:10px 20px}.nav-link.svelte-112uxnp.svelte-112uxnp{color:#0366d6;text-decoration:none;padding:10px 15px;border-radius:5px;transition:background-color 0.3s ease}.nav-link.svelte-112uxnp.svelte-112uxnp:hover{background-color:#f0f7ff}.dropdown.svelte-112uxnp.svelte-112uxnp{position:relative;display:inline-block}.dropbtn.svelte-112uxnp.svelte-112uxnp{background-color:transparent;color:#0366d6;border:none;padding:15px 15px;font-size:16px;border-radius:5px;cursor:pointer;transition:background-color 0.3s ease;position:relative}.dropbtn.svelte-112uxnp.svelte-112uxnp:hover{background-color:#f0f7ff}.dropdown-content.svelte-112uxnp.svelte-112uxnp{display:none;position:absolute;background-color:#fff;border:1px solid #ccc;border-radius:5px;box-shadow:0 2px 5px rgba(0, 0, 0, 0.1);z-index:1;top:calc(100% + 5px);left:0;min-width:160px}.dropdown-content.svelte-112uxnp a.svelte-112uxnp{color:#0366d6;padding:10px 15px;text-decoration:none;display:block;border-radius:5px;transition:background-color 0.3s ease}.dropdown-content.svelte-112uxnp a.svelte-112uxnp:hover{background-color:#f0f7ff}.dropdown.svelte-112uxnp:hover .dropdown-content.svelte-112uxnp{display:block}.dropdown.svelte-112uxnp:hover .dropbtn.svelte-112uxnp::after{content:'\\25BC';position:absolute;top:calc(100% - 5px);left:50%;transform:translateX(-50%);font-size:14px;color:#0366d6}.dropdown-content.svelte-112uxnp.svelte-112uxnp:hover{display:block}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<nav class="container svelte-112uxnp" data-svelte-h="svelte-1rrg2z1"><a href="/" class="nav-link svelte-112uxnp">Inicio</a> <a href="/vista-grupal" class="nav-link svelte-112uxnp">Vista Grupal</a> <div class="dropdown svelte-112uxnp"><button class="dropbtn svelte-112uxnp">vehicles-stock</button> <div class="dropdown-content svelte-112uxnp"><a href="/vehicles-stock" class="svelte-112uxnp">Tabla</a> <a href="/vehicles-stock/vistas" class="svelte-112uxnp">Vista</a></div></div> <div class="dropdown svelte-112uxnp"><button class="dropbtn svelte-112uxnp">gdp-growth-rates</button> <div class="dropdown-content svelte-112uxnp"><a href="/gdp-growth-rates" class="svelte-112uxnp">Tabla</a> <a href="/gdp-growth-rates/vistas" class="svelte-112uxnp">Vista</a></div></div> </nav>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div style="height: 100%; margin:0; display: flex; justify-content: center; align-items: center; margin-bottom: 10px" data-svelte-h="svelte-279ol2">Made by SOS2324-10</div>`;
});
const css = {
  code: "h1.svelte-84gk4d{height:100%;margin:0;display:flex;justify-content:center;align-items:center}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <h1 class="svelte-84gk4d" data-svelte-h="svelte-1ch4nhk">SOS2324-10</h1> <hr> ${slots.default ? slots.default({}) : ` `} <hr> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-CMfsvQce.js.map
