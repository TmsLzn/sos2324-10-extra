import { c as create_ssr_component, v as validate_component } from './ssr-Dllh74Pl.js';
import './Theme.svelte_svelte_type_style_lang-oigkUEv0.js';
import './index-D-fTsvPC.js';

const css$1 = {
  code: ".container.svelte-nzbh7n{width:80%;margin:20px auto;display:flex;justify-content:space-between;align-items:center;background-color:#fff;border:1px solid #a4caef;border-radius:5px;box-shadow:0 2px 5px rgba(0, 0, 0, 0.1);padding:10px 20px}.nav-link.svelte-nzbh7n{color:#0366d6;text-decoration:none;padding:10px 15px;border-radius:5px;transition:background-color 0.3s ease}.nav-link.svelte-nzbh7n:hover{background-color:#f0f7ff}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<nav class="container svelte-nzbh7n" data-svelte-h="svelte-1e307dm"><a href="/" class="nav-link svelte-nzbh7n">Inicio</a> <a href="/vehicles-stock" class="nav-link svelte-nzbh7n">vehicles-stock</a> <a href="/gdp-growth-rates" class="nav-link svelte-nzbh7n">gdp-growth-rates</a> <a href="/cars-by-motor" class="nav-link svelte-nzbh7n">cars-by-motor</a> <a href="/tourisms-per-age" class="nav-link svelte-nzbh7n">tourisms-per-age</a> </nav>`;
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
//# sourceMappingURL=_layout.svelte-Ck0TY4E7.js.map
