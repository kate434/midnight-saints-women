/* =====================================================================
   MIDNIGHT SAINTS WOMEN · LÓGICA DE LA TIENDA
   No necesitas editar este archivo para agregar productos:
   usa js/productos.js y js/config.js
   ===================================================================== */
(function () {
  "use strict";

  const T = window.TIENDA || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const icon = (id) => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;

  /* ---------- Almacenamiento local seguro ---------- */
  const store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* modo privado */ } }
  };

  /* ---------- Moneda ---------- */
  const mon = T.moneda || { codigo: "COP", locale: "es-CO" };
  const nf = new Intl.NumberFormat(mon.locale, { style: "currency", currency: mon.codigo, maximumFractionDigits: 0 });
  const fmt = (n) => nf.format(n);
  const hasPrice = (p) => typeof p.precio === "number" && p.precio > 0;
  const priceHTML = (p) => !hasPrice(p)
    ? `<span class="price tbd">Precio por confirmar</span>`
    : `<span class="price">${fmt(p.precio)}${p.precioAntes > p.precio ? `<s>${fmt(p.precioAntes)}</s>` : ""}</span>`;

  /* ---------- WhatsApp / Instagram ---------- */
  const waNum = String(T.whatsapp || "").replace(/\D/g, "");
  const waURL = (msg) => `https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`;
  const igURL = T.instagram ? `https://ig.me/m/${encodeURIComponent(T.instagram)}` : "";

  /* ---------- Categorías y productos ---------- */
  const CATS = T.categorias || [];
  const catById = Object.fromEntries(CATS.map((c) => [c.id, c]));

  let RAW = Array.isArray(window.PRODUCTOS) ? window.PRODUCTOS : [];
  const DEMO = !RAW.length && new URLSearchParams(location.search).has("demo");
  if (DEMO) {
    // Vista de prueba (solo con ?demo en la URL): piezas genéricas SIN precio ni marca real,
    // para revisar el diseño antes de cargar el catálogo real.
    RAW = CATS.flatMap((c, ci) => [1, 2].map((n) => ({
      id: `ejemplo-${c.id}-${n}`, nombre: `Pieza de ejemplo · ${c.nombre} ${n}`, marca: "Ejemplo",
      categoria: c.id, precio: null, fotos: [], nuevo: n === 1, ultimas: ci === 1 && n === 2,
      descripcion: "Producto de demostración. Reemplázalo por tus productos reales en js/productos.js."
    })));
  }

  const PRODUCTS = RAW.filter((p) => p && p.id && p.nombre).map((p, i) => ({
    ...p,
    orden: i,
    marca: p.marca || "",
    fotos: Array.isArray(p.fotos) ? p.fotos.filter(Boolean) : [],
    tallas: Array.isArray(p.tallas) && p.tallas.length ? p.tallas.map(String) : ((catById[p.categoria] || {}).tallas || ["Única"]),
    agotadas: (p.agotadas || []).map(String),
    colores: Array.isArray(p.colores) ? p.colores : []
  }));
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  /* ---------- Estado ---------- */
  const S = { cat: "", marca: "", talla: "", q: "", orden: "", favs: false };
  let FAVS = store.get("msw_favs", []).filter((id) => byId[id]);
  let VISTOS = store.get("msw_vistos", []).filter((id) => byId[id]);
  let BAG = store.get("msw_bolsa", []).filter((it) => byId[it.id] && it.qty > 0);

  /* ---------- Utilidades UI ---------- */
  let toastT;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 2400);
  }
  function bump(el, n) {
    el.hidden = !n;
    if (el.textContent !== String(n)) { el.textContent = n; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
  }
  function photo(src, alt, cls = "", lazy = true) {
    return src
      ? `<img src="${esc(src)}" alt="${esc(alt)}" class="${cls}" ${lazy ? 'loading="lazy"' : ""} decoding="async">`
      : `<div class="noimg ${cls}" role="img" aria-label="Foto próximamente">${icon("i-santa")}<span>Foto próximamente</span></div>`;
  }

  /* ---------- Tarjeta de producto ---------- */
  function card(p) {
    const tags = [];
    if (p.agotado) tags.push(`<span class="tag off">Agotado</span>`);
    else {
      if (p.nuevo) tags.push(`<span class="tag new">Nuevo</span>`);
      if (p.precioAntes > p.precio && hasPrice(p)) tags.push(`<span class="tag sale">-${Math.round((1 - p.precio / p.precioAntes) * 100)}%</span>`);
      if (p.ultimas) tags.push(`<span class="tag last">Últimas</span>`);
    }
    const fav = FAVS.includes(p.id);
    return `<article class="card${p.agotado ? " is-off" : ""}">
      <a class="ph" href="#p=${encodeURIComponent(p.id)}" data-open="${esc(p.id)}" aria-label="${esc(p.nombre)}">
        ${photo(p.fotos[0], p.nombre)}${p.fotos[1] ? photo(p.fotos[1], "", "alt") : ""}
        <span class="tags">${tags.join("")}</span>
      </a>
      <button class="fav${fav ? " on" : ""}" type="button" data-fav="${esc(p.id)}" aria-pressed="${fav}" aria-label="${fav ? "Quitar de" : "Guardar en"} favoritos">${icon("i-heart")}</button>
      <a class="meta" href="#p=${encodeURIComponent(p.id)}" data-open="${esc(p.id)}" style="text-decoration:none">
        <span class="brandname">${esc(p.marca)}</span>
        <span class="name">${esc(p.nombre)}</span>
        ${priceHTML(p)}
      </a>
    </article>`;
  }

  /* ---------- Categorías (bloque visual) ---------- */
  function renderCats() {
    $("#cats").innerHTML = CATS.map((c, i) => {
      const n = PRODUCTS.filter((p) => p.categoria === c.id).length;
      return `<button class="cat" type="button" data-cat="${esc(c.id)}" style="--tone:${c.color}">
        <small>0${i + 1}</small>${icon("c-" + (c.icono || c.id))}
        <b>${esc(c.nombre)}</b><span>${n ? `${n} ${n === 1 ? "pieza" : "piezas"}` : esc(c.frase || "Muy pronto")}</span>
      </button>`;
    }).join("");
  }

  /* ---------- Filtros ---------- */
  function renderFilters() {
    const count = (fn) => PRODUCTS.filter(fn).length;
    $("#chips").innerHTML = [`<button class="chip" type="button" data-f="" aria-pressed="${!S.cat}">Todo <em>${PRODUCTS.length}</em></button>`]
      .concat(CATS.map((c) => `<button class="chip" type="button" data-f="${esc(c.id)}" style="--tone:${c.color}" aria-pressed="${S.cat === c.id}"><i></i>${esc(c.nombre)} <em>${count((p) => p.categoria === c.id)}</em></button>`))
      .join("");

    const marcas = [...new Set([...(T.marcas || []), ...PRODUCTS.map((p) => p.marca).filter(Boolean)])];
    $("#marcas").innerHTML = [`<button class="chip" type="button" data-m="" aria-pressed="${!S.marca}">Todas las marcas</button>`]
      .concat(marcas.map((m) => `<button class="chip" type="button" data-m="${esc(m)}" aria-pressed="${S.marca === m}">${esc(m)}</button>`))
      .join("");

    const base = PRODUCTS.filter((p) => !S.cat || p.categoria === S.cat);
    const tallas = [...new Set(base.flatMap((p) => p.tallas))].sort((a, b) => {
      const na = parseFloat(a), nb = parseFloat(b);
      if (!isNaN(na) && !isNaN(nb)) return na - nb;
      const o = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
      return (o.indexOf(a) + 1 || 99) - (o.indexOf(b) + 1 || 99) || String(a).localeCompare(b);
    });
    if (S.talla && !tallas.includes(S.talla)) S.talla = "";
    $("#tallaSel").innerHTML = `<option value="">Todas las tallas</option>` + tallas.map((t) => `<option ${S.talla === t ? "selected" : ""}>${esc(t)}</option>`).join("");
    $("#soloFavs").setAttribute("aria-pressed", S.favs);
    $("#limpiar").hidden = !(S.cat || S.marca || S.talla || S.q || S.favs || S.orden);
  }

  function filtered() {
    const q = norm(S.q).trim();
    const words = q ? q.split(/\s+/) : [];
    let list = PRODUCTS.filter((p) =>
      (!S.cat || p.categoria === S.cat) &&
      (!S.marca || p.marca === S.marca) &&
      (!S.talla || (p.tallas.includes(S.talla) && !p.agotadas.includes(S.talla))) &&
      (!S.favs || FAVS.includes(p.id)) &&
      (!words.length || words.every((w) => norm([p.nombre, p.marca, (catById[p.categoria] || {}).nombre, p.descripcion, p.colores.join(" ")].join(" ")).includes(w)))
    );
    const priceOr = (p, d) => (hasPrice(p) ? p.precio : d);
    if (S.orden === "asc") list.sort((a, b) => priceOr(a, Infinity) - priceOr(b, Infinity));
    else if (S.orden === "desc") list.sort((a, b) => priceOr(b, -1) - priceOr(a, -1));
    else if (S.orden === "nuevo") list.sort((a, b) => (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0) || a.orden - b.orden);
    // agotados siempre al final
    return list.sort((a, b) => (a.agotado ? 1 : 0) - (b.agotado ? 1 : 0));
  }

  function renderGrid() {
    renderFilters();
    const list = filtered();
    $("#grid").innerHTML = list.map(card).join("");
    $("#emptyStore").hidden = PRODUCTS.length > 0;
    $("#emptyFilter").hidden = !PRODUCTS.length || list.length > 0;
    $(".toolbar").hidden = !PRODUCTS.length;
    const label = S.cat ? (catById[S.cat] || {}).nombre : "Catálogo";
    $("#countLabel").textContent = PRODUCTS.length ? `${label} · ${list.length} ${list.length === 1 ? "pieza" : "piezas"}${DEMO ? " (demo)" : ""}` : "Catálogo";
  }

  function renderRails() {
    const nuevos = PRODUCTS.filter((p) => p.nuevo && !p.agotado).slice(0, 12);
    $("#nuevo").hidden = !nuevos.length;
    $("#railNuevo").innerHTML = nuevos.map(card).join("");
    const vistos = VISTOS.map((id) => byId[id]).filter(Boolean);
    $("#vistosWrap").hidden = vistos.length < 2;
    $("#railVistos").innerHTML = vistos.map(card).join("");
  }

  function irCatalogo() {
    const g = $("#catalogo");
    if (g.getBoundingClientRect().top < 0 || g.getBoundingClientRect().top > innerHeight * .6) g.scrollIntoView({ behavior: "smooth" });
  }

  /* ---------- Favoritos ---------- */
  function toggleFav(id) {
    const on = !FAVS.includes(id);
    FAVS = on ? [id, ...FAVS] : FAVS.filter((x) => x !== id);
    store.set("msw_favs", FAVS);
    bump($("#favCount"), FAVS.length);
    $$(`[data-fav="${CSS.escape(id)}"]`).forEach((b) => { b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); b.setAttribute("aria-label", `${on ? "Quitar de" : "Guardar en"} favoritos`); });
    if (actual && actual.id === id) syncFavBtn();
    toast(on ? "Guardado en favoritos ♡" : "Quitado de favoritos");
    if (S.favs) renderGrid();
  }

  /* ---------- Modales: abrir / cerrar con foco ---------- */
  let lastFocus = null;
  const openStack = [];
  function openModal(el) {
    if (!openStack.length) lastFocus = document.activeElement;
    el.hidden = false; openStack.push(el);
    document.body.classList.add("lock");
    const f = el.querySelector("[data-close]"); if (f) f.focus({ preventScroll: true });
  }
  function closeModal(el) {
    if (!el || el.hidden) return;
    el.hidden = true;
    const i = openStack.indexOf(el); if (i > -1) openStack.splice(i, 1);
    if (el.id === "sheet") { actual = null; renderRails(); if (location.hash.startsWith("#p=")) history.replaceState(null, "", location.pathname + location.search); }
    if (!openStack.length) { document.body.classList.remove("lock"); if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); }
  }

  /* ---------- Ficha de producto ---------- */
  let actual = null, talla = "", color = "";
  function abrir(id) {
    const p = byId[id]; if (!p) return;
    actual = p; talla = p.tallas.length === 1 && !p.agotadas.includes(p.tallas[0]) ? p.tallas[0] : ""; color = p.colores.length === 1 ? p.colores[0] : "";
    const fotos = p.fotos.length ? p.fotos : [null];
    $("#track").innerHTML = fotos.map((f, i) => photo(f, `${p.nombre} — foto ${i + 1}`, "", i > 0)).join("");
    $("#track").scrollLeft = 0;
    $("#gDots").innerHTML = fotos.length > 1 ? fotos.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("") : "";
    $("#gPrev").hidden = $("#gNext").hidden = fotos.length < 2;
    $("#pBrand").textContent = [p.marca, (catById[p.categoria] || {}).nombre].filter(Boolean).join(" · ");
    $("#pTitle").textContent = p.nombre;
    $("#pPrice").innerHTML = priceHTML(p);
    const flag = p.agotado ? "Agotado · pregúntanos por reposición" : p.ultimas ? "Últimas unidades" : "";
    $("#pFlag").hidden = !flag; $("#pFlag").textContent = flag;
    $("#pDesc").textContent = p.descripcion || "";
    $("#pDesc").hidden = !p.descripcion;
    $("#pColorsWrap").hidden = !p.colores.length;
    $("#pMsg").hidden = true;
    renderOpts();
    syncFavBtn();
    $("#addBtn").disabled = !!p.agotado;
    $("#addBtn").innerHTML = p.agotado ? "Agotado" : `${icon("i-bag")} Agregar a mi bolsa`;
    updateBuyLink();

    // Relacionados: misma categoría primero, luego otras
    const rel = PRODUCTS.filter((x) => x.id !== p.id && !x.agotado)
      .sort((a, b) => (b.categoria !== p.categoria) - (a.categoria !== p.categoria) || (b.marca === p.marca) - (a.marca === p.marca)).slice(0, 6);
    $("#relWrap").hidden = !rel.length;
    $("#rel").innerHTML = rel.map(card).join("");

    VISTOS = [p.id, ...VISTOS.filter((x) => x !== p.id)].slice(0, 12);
    store.set("msw_vistos", VISTOS);

    const s = $("#sheet");
    if (s.hidden) openModal(s); else $(".sheet", s).scrollTop = 0, $("#sheet .info").scrollTop = 0;
    const h = "#p=" + encodeURIComponent(p.id);
    if (location.hash !== h) history.replaceState(null, "", h);
  }
  function renderOpts() {
    const p = actual;
    $("#pSizes").innerHTML = p.tallas.map((t) => {
      const off = p.agotadas.includes(t) || p.agotado;
      return `<button class="opt" type="button" role="radio" data-size="${esc(t)}" aria-checked="${talla === t}" ${off ? "disabled" : ""}>${esc(t)}</button>`;
    }).join("");
    $("#pColors").innerHTML = p.colores.map((c) => `<button class="opt" type="button" role="radio" data-color="${esc(c)}" aria-checked="${color === c}">${esc(c)}</button>`).join("");
    $("#pSizeSel").textContent = talla ? "· " + talla : "";
    $("#guiaBtn").hidden = p.tallas.length === 1 && p.tallas[0] === "Única";
  }
  function syncFavBtn() {
    const on = FAVS.includes(actual.id), b = $("#pFav");
    b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); $("span", b).textContent = on ? "Guardado" : "Guardar";
  }
  function lineText(p, t, c, q) {
    return `• ${p.nombre}${p.marca ? ` (${p.marca})` : ""} — talla ${t || "por definir"}${c ? ` — color ${c}` : ""}${q > 1 ? ` — x${q}` : ""} — ${hasPrice(p) ? fmt(p.precio * (q || 1)) : "precio por confirmar"}`;
  }
  function productURL(p) { return location.origin + location.pathname + "#p=" + encodeURIComponent(p.id); }
  function updateBuyLink() {
    const p = actual; if (!p) return;
    const msg = p.agotado
      ? `Hola Midnight Saints Women ✨ Me interesa esta pieza que aparece agotada, ¿la pueden conseguir?\n• ${p.nombre}\n${productURL(p)}`
      : `Hola Midnight Saints Women ✨ Quiero comprar:\n${lineText(p, talla, color, 1)}\n${productURL(p)}\nCiudad de envío: ____`;
    $("#buyWa").href = waURL(msg);
    $("#buyWa").innerHTML = `${icon("i-whatsapp")} ${p.agotado ? "Preguntar por WhatsApp" : "Comprar ya por WhatsApp"}`;
  }
  function needsChoice() {
    const p = actual;
    if (p.tallas.length > 1 && !talla) return "Elige tu talla";
    if (p.colores.length > 1 && !color) return "Elige un color";
    return "";
  }
  function showMsg(m) { const e = $("#pMsg"); e.textContent = m; e.hidden = false; }

  function galleryNav(dir) {
    const t = $("#track"); t.scrollBy({ left: dir * t.clientWidth, behavior: "smooth" });
  }
  let dotRaf;
  $("#track").addEventListener("scroll", () => {
    cancelAnimationFrame(dotRaf);
    dotRaf = requestAnimationFrame(() => {
      const t = $("#track"), i = Math.round(t.scrollLeft / t.clientWidth);
      $$("#gDots i").forEach((d, k) => d.classList.toggle("on", k === i));
    });
  }, { passive: true });
  $("#track").addEventListener("keydown", (e) => { if (e.key === "ArrowRight") galleryNav(1); if (e.key === "ArrowLeft") galleryNav(-1); });

  /* ---------- Bolsa ---------- */
  const saveBag = () => store.set("msw_bolsa", BAG);
  function addToBag(p, t, c) {
    const it = BAG.find((x) => x.id === p.id && x.talla === t && (x.color || "") === (c || ""));
    if (it) it.qty++; else BAG.push({ id: p.id, talla: t, color: c || "", qty: 1 });
    saveBag(); renderBag();
  }
  function bagCount() { return BAG.reduce((a, it) => a + it.qty, 0); }
  function renderBag() {
    const n = bagCount();
    bump($("#bagCount"), n);
    $("#bagN").textContent = n ? `(${n} ${n === 1 ? "pieza" : "piezas"})` : "";
    $("#bagFoot").hidden = !BAG.length;
    $("#items").innerHTML = BAG.length ? BAG.map((it, i) => {
      const p = byId[it.id];
      return `<div class="line">
        <a class="thumb" href="#p=${encodeURIComponent(p.id)}" data-open="${esc(p.id)}">${photo(p.fotos[0], p.nombre)}</a>
        <div>
          <div class="li-b">${esc(p.marca)}</div>
          <div class="li-n">${esc(p.nombre)}</div>
          <small>Talla ${esc(it.talla || "por definir")}${it.color ? " · " + esc(it.color) : ""}</small>
          <div class="row">
            <div class="qty" role="group" aria-label="Cantidad">
              <button type="button" data-q="${i}" data-d="-1" aria-label="${it.qty > 1 ? "Quitar una" : "Eliminar"}">${icon("i-minus")}</button>
              <span>${it.qty}</span>
              <button type="button" data-q="${i}" data-d="1" aria-label="Agregar una">${icon("i-plus")}</button>
            </div>
            ${hasPrice(p) ? `<span class="price">${fmt(p.precio * it.qty)}</span>` : `<span class="price tbd">Por confirmar</span>`}
          </div>
        </div>
      </div>`;
    }).join("") : `<div class="bag-empty"><p>Tu bolsa está vacía.</p><button class="btn ghost" type="button" data-close-bag>Ver la boutique</button></div>`;

    const conPrecio = BAG.filter((it) => hasPrice(byId[it.id]));
    const suma = conPrecio.reduce((a, it) => a + byId[it.id].precio * it.qty, 0);
    const sinPrecio = BAG.length - conPrecio.length;
    const totalTxt = !BAG.length ? "—" : (conPrecio.length ? fmt(suma) : "") + (sinPrecio ? `${conPrecio.length ? " + " : ""}${sinPrecio} por confirmar` : "");
    $("#total").textContent = totalTxt;

    // Envío gratis (solo si está configurado)
    const meta = Number(T.envioGratisDesde) || 0, env = $("#envio");
    env.hidden = !meta || !BAG.length;
    if (meta) {
      const ok = suma >= meta;
      env.innerHTML = (ok ? "✨ <b>¡Tu pedido tiene envío gratis!</b>" : `Te faltan <b>${fmt(meta - suma)}</b> para el <b>envío gratis</b>.`) +
        `<div class="barra"><i style="width:${Math.min(100, (suma / meta) * 100)}%"></i></div>`;
    }
    updateOrderLinks(totalTxt);
    suggest();
  }
  function orderMessage(totalTxt) {
    const nombre = $("#oNombre").value.trim(), ciudad = $("#oCiudad").value.trim();
    return `Hola Midnight Saints Women ✨ Quiero hacer este pedido:\n` +
      BAG.map((it) => lineText(byId[it.id], it.talla, it.color, it.qty)).join("\n") +
      `\nTotal: ${totalTxt}` +
      `\nNombre: ${nombre || "____"}\nCiudad / país de envío: ${ciudad || "____"}`;
  }
  function updateOrderLinks(totalTxt) {
    totalTxt = totalTxt || $("#total").textContent;
    $("#waBtn").href = waURL(orderMessage(totalTxt));
    $("#igBtn").hidden = !igURL || !BAG.length;
    if (igURL) $("#igBtn").href = igURL;
  }
  function suggest() {
    const w = $("#upWrap");
    if (!BAG.length) { w.hidden = true; return; }
    const ids = BAG.map((x) => x.id), cats = new Set(ids.map((id) => byId[id].categoria));
    const out = PRODUCTS.filter((p) => !p.agotado && !ids.includes(p.id) && !cats.has(p.categoria)).slice(0, 4);
    $("#up").innerHTML = out.map(card).join("");
    w.hidden = !out.length;
  }

  /* ---------- Encargos ---------- */
  $("#encForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = (id) => $("#" + id).value.trim();
    const que = $("#encQue");
    if (!v("encQue")) {
      que.setAttribute("aria-invalid", "true"); $("#encMsg").textContent = "Cuéntanos qué estás buscando."; $("#encMsg").hidden = false; que.focus(); return;
    }
    que.removeAttribute("aria-invalid"); $("#encMsg").hidden = true;
    const lines = [
      "Hola Midnight Saints Women ✨ Quiero hacer un encargo:",
      `• Producto: ${v("encQue")}`,
      v("encMarca") && `• Marca: ${v("encMarca")}`,
      v("encTalla") && `• Talla: ${v("encTalla")}`,
      v("encColor") && `• Color: ${v("encColor")}`,
      `• Envío a: ${[v("encCiudad"), v("encPais")].filter(Boolean).join(", ")}`,
      v("encDet") && `• Detalles: ${v("encDet")}`
    ].filter(Boolean);
    window.open(waURL(lines.join("\n")), "_blank", "noopener");
  });

  /* ---------- Compartir ---------- */
  async function share(p) {
    const url = productURL(p), data = { title: p.nombre, text: `${p.nombre} · Midnight Saints Women`, url };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(url); toast("Enlace copiado ✨");
    } catch (e) { if (e && e.name !== "AbortError") prompt("Copia el enlace:", url); }
  }

  /* ---------- Menú móvil ---------- */
  function setMenu(open) {
    $("#menu").classList.toggle("open", open);
    $("#menuScrim").hidden = !open;
    $("#menuBtn").setAttribute("aria-expanded", open);
    document.body.classList.toggle("lock", open || openStack.length > 0);
  }

  /* ---------- Eventos (delegados) ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target;
    const fav = t.closest("[data-fav]");
    if (fav) { e.preventDefault(); toggleFav(fav.dataset.fav); return; }

    const op = t.closest("[data-open]");
    if (op) {
      e.preventDefault();
      if (op.closest("#drawer")) closeModal($("#drawer"));
      abrir(op.dataset.open); return;
    }
    const cat = t.closest("[data-cat]");
    if (cat) { S.cat = cat.dataset.cat; renderGrid(); $("#catalogo").scrollIntoView({ behavior: "smooth" }); return; }
    const chip = t.closest("[data-f]");
    if (chip) { S.cat = chip.dataset.f; renderGrid(); return; }
    const m = t.closest("[data-m]");
    if (m) { S.marca = m.dataset.m; renderGrid(); return; }

    const size = t.closest("[data-size]");
    if (size) { talla = size.dataset.size; $("#pMsg").hidden = true; renderOpts(); updateBuyLink(); return; }
    const col = t.closest("[data-color]");
    if (col) { color = col.dataset.color; $("#pMsg").hidden = true; renderOpts(); updateBuyLink(); return; }

    const q = t.closest("[data-q]");
    if (q) {
      const it = BAG[+q.dataset.q]; it.qty += +q.dataset.d;
      if (it.qty <= 0) { BAG.splice(+q.dataset.q, 1); toast("Quitado de tu bolsa"); }
      saveBag(); renderBag(); return;
    }
    if (t.closest("[data-close-bag]")) { closeModal($("#drawer")); $("#catalogo").scrollIntoView({ behavior: "smooth" }); return; }

    const cl = t.closest("[data-close]");
    if (cl) { closeModal(cl.closest(".overlay")); return; }
    if (t.classList.contains("overlay")) { closeModal(t); return; }

    if (t.closest(".nav a")) setMenu(false);
  });

  $("#buyWa").addEventListener("click", (e) => {
    if (actual && !actual.agotado) { const need = needsChoice(); if (need) { e.preventDefault(); showMsg(need); } }
  });
  $("#addBtn").addEventListener("click", () => {
    const need = needsChoice(); if (need) { showMsg(need); return; }
    addToBag(actual, talla, color);
    toast("Agregado a tu bolsa ✨");
  });
  $("#pFav").addEventListener("click", () => toggleFav(actual.id));
  $("#shareBtn").addEventListener("click", () => share(actual));
  $("#gPrev").addEventListener("click", () => galleryNav(-1));
  $("#gNext").addEventListener("click", () => galleryNav(1));
  $("#guiaBtn").addEventListener("click", () => openModal($("#guia")));
  $("#bagBtn").addEventListener("click", () => { renderBag(); openModal($("#drawer")); });
  $("#favTop").addEventListener("click", () => {
    if (!FAVS.length) { toast("Aún no tienes favoritos ♡"); return; }
    S.favs = true; renderGrid(); $("#catalogo").scrollIntoView({ behavior: "smooth" });
  });
  $("#menuBtn").addEventListener("click", () => setMenu(!$("#menu").classList.contains("open")));
  $("#menuScrim").addEventListener("click", () => setMenu(false));

  let qT;
  $("#q").addEventListener("input", (e) => { clearTimeout(qT); qT = setTimeout(() => { S.q = e.target.value; renderGrid(); }, 150); });
  $("#tallaSel").addEventListener("change", (e) => { S.talla = e.target.value; renderGrid(); });
  $("#orden").addEventListener("change", (e) => { S.orden = e.target.value; renderGrid(); });
  $("#soloFavs").addEventListener("click", () => { S.favs = !S.favs; renderGrid(); });
  const limpiar = () => { Object.assign(S, { cat: "", marca: "", talla: "", q: "", orden: "", favs: false }); $("#q").value = ""; $("#orden").value = ""; renderGrid(); };
  $("#limpiar").addEventListener("click", limpiar);
  $("#limpiar2").addEventListener("click", limpiar);
  ["oNombre", "oCiudad"].forEach((id) => {
    const el = $("#" + id); el.value = store.get("msw_" + id, "");
    el.addEventListener("input", () => { store.set("msw_" + id, el.value); updateOrderLinks(); });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (openStack.length) closeModal(openStack[openStack.length - 1]);
      else if ($("#menu").classList.contains("open")) setMenu(false);
    }
    // Mantener el foco dentro del modal abierto
    if (e.key === "Tab" && openStack.length) {
      const box = openStack[openStack.length - 1];
      const f = $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', box).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  // Enlaces directos a un producto: index.html#p=id
  function fromHash() {
    const m = location.hash.match(/^#p=(.+)$/);
    if (m) { const id = decodeURIComponent(m[1]); if (byId[id]) abrir(id); }
  }
  window.addEventListener("hashchange", fromHash);

  // Botón volver arriba
  const toTop = $("#toTop");
  window.addEventListener("scroll", () => { toTop.hidden = scrollY < 900; }, { passive: true });
  toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Contenido configurable ---------- */
  function renderStatic() {
    $$(".wa-link").forEach((a) => (a.href = waURL(a.dataset.msg || "Hola Midnight Saints Women ✨")));
    $("#faqList").innerHTML = (T.faq || []).map((f) => `<details><summary>${esc(f.p)}</summary><p>${esc(f.r)}</p></details>`).join("");
    const soc = [
      T.instagram && `<a class="social" href="https://www.instagram.com/${encodeURIComponent(T.instagram)}/" target="_blank" rel="noopener">${icon("i-instagram")} @${esc(T.instagram)}</a>`,
      T.tiktok && `<a class="social" href="https://www.tiktok.com/@${encodeURIComponent(T.tiktok)}" target="_blank" rel="noopener">${icon("i-tiktok")} @${esc(T.tiktok)}</a>`,
      waNum && `<a class="social" href="${waURL("Hola Midnight Saints Women ✨")}" target="_blank" rel="noopener">${icon("i-whatsapp")} WhatsApp</a>`
    ].filter(Boolean).join("");
    $("#siguenos").hidden = !(T.instagram || T.tiktok);
    $("#socials").innerHTML = soc;
    $("#socialsFoot").innerHTML = soc;
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- Inicio ---------- */
  renderStatic();
  renderCats();
  renderGrid();
  renderRails();
  renderBag();
  bump($("#favCount"), FAVS.length);
  fromHash();
  if (!waNum) console.info("[Midnight Saints Women] Agrega tu número de WhatsApp en js/config.js para recibir los pedidos directamente.");
})();
