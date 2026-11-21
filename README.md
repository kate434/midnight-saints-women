# Midnight Saints Women · Boutique online

**Faith + Style + Women.** Tienda virtual femenina de Midnight Saints Women: ropa, tenis, zapatos, bolsos y accesorios, con pedidos por WhatsApp y envíos a Colombia y USA.

Es un sitio estático (HTML + CSS + JavaScript, sin frameworks ni compilación). Todo es gratis: se publica en GitHub Pages y las fuentes vienen de Google Fonts.

---

## Estructura

```
index.html            ← estructura de la página (secciones, ficha, bolsa)
css/styles.css        ← diseño: paleta, tipografías, responsive
js/config.js          ← ✏️ WhatsApp, redes, moneda, envío gratis, categorías, marcas, FAQ
js/productos.js       ← ✏️ catálogo de productos
js/app.js             ← lógica (catálogo, filtros, ficha, bolsa, pedidos)
assets/img/           ← póster, logo (logo.png y logo-mark.png) y favicon
assets/productos/     ← ✏️ aquí van las fotos de tus productos
```

Solo necesitas editar los archivos marcados con ✏️.

## 1. Configurar contacto

En `js/config.js`:

```js
whatsapp: "573001234567",   // código de país + número, solo dígitos
instagram: "tuusuario",     // sin @
tiktok: "tuusuario",
envioGratisDesde: null,     // ej: 300000 para activar la barra de envío gratis
```

## 2. Agregar productos

1. Sube las fotos a `assets/productos/` (verticales 4:5, ~1000 px de ancho, menos de 300 KB).
2. En `js/productos.js`, copia la plantilla dentro de `window.PRODUCTOS = [ ... ]`:

```js
{
  id: "bolso-coach-tabby-negro",
  nombre: "Bolso Coach Tabby 26",
  marca: "Coach",
  categoria: "bolsos",          // ropa | tenis | zapatos | bolsos | accesorios
  precio: 0,                    // tu precio real, sin puntos. null = "precio por confirmar"
  fotos: ["assets/productos/coach-tabby-1.jpg"],
  colores: ["Negro"],
  descripcion: "Descripción real del producto.",
  nuevo: true
},
```

Campos opcionales: `precioAntes`, `tallas`, `agotadas`, `ultimas`, `agotado`. La plantilla completa está comentada en el propio archivo.

> El catálogo empieza vacío a propósito: no hay productos ni precios inventados. Mientras esté vacío, la tienda muestra “Nuestra colección está en camino” con acceso a encargos.

**Vista de prueba:** abre la tienda con `?demo` al final de la dirección (ej. `.../index.html?demo`) para ver el catálogo con piezas genéricas de ejemplo, sin precios ni marcas reales. Solo funciona mientras `productos.js` esté vacío.

## 3. Ver la tienda en tu computador

Abre `index.html` en el navegador, o desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
# luego visita http://localhost:8000
```

## 4. Publicar en GitHub Pages (gratis)

1. En GitHub: **Settings → Pages**.
2. En **Source** elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
3. Guarda. En uno o dos minutos la tienda queda en `https://<tu-usuario>.github.io/midnight-saints-women/`.

El archivo `.nojekyll` ya está incluido para que GitHub sirva los archivos tal cual.

## Funciones

- Inicio con el póster completo de la Santa (lema, logo y valores de marca).
- Categorías: Ropa, Tenis, Zapatos, Bolsos y Accesorios.
- Catálogo con buscador, filtros por categoría, marca, talla, favoritos y orden por precio o novedad.
- Ficha de producto con galería deslizable, tallas (con tallas agotadas), colores, guía de tallas, compartir y “Combínalo con”.
- Enlace directo a cada producto (`#p=id-del-producto`).
- Bolsa de compras con cantidades, total, nombre y ciudad, guardada en el navegador.
- Pedido por WhatsApp (mensaje ya escrito) y opcionalmente por Instagram.
- Favoritos y “Vistos recientemente”.
- Encargos personalizados por WhatsApp y preguntas frecuentes editables.
- Diseño adaptable (prioridad celular), accesible con teclado y lector de pantalla.

## Cómo calcular precios

- **Dólar fijo para costos: $3.400** (en `js/config.js`, campo `dolarCostos`). Se usa siempre ese valor, aunque el dólar oficial esté más bajo, para no tener pérdidas.
- **Costo** = precio pagado en USD × 3.400 + envío a Colombia.
- **Productos que también vende Nike/Adidas/Coach Colombia:** precio entre 10% y 15% por debajo del precio regular de la tienda oficial en Colombia, siempre que quede ganancia.
- **Productos que no se venden en Colombia:** costo + 35%.
