/* =====================================================================
   MIDNIGHT SAINTS WOMEN · CATÁLOGO DE PRODUCTOS
   ---------------------------------------------------------------------
   El catálogo empieza VACÍO a propósito: no hay productos ni precios
   inventados. Agrega aquí tus productos reales copiando la plantilla.

   PLANTILLA (copia, pega dentro de los corchetes [ ] y edita):

   {
     id: "bolso-coach-tabby-negro",     // único, sin espacios ni tildes
     nombre: "Bolso Coach Tabby 26",
     marca: "Coach",                    // Nike, Adidas, Coach u otra
     categoria: "bolsos",               // ropa | tenis | zapatos | bolsos | accesorios
     precio: 0,                         // número sin puntos. null = "precio por confirmar"
     precioAntes: null,                 // opcional: precio anterior (se muestra tachado)
     fotos: [                           // fotos en assets/productos/
       "assets/productos/coach-tabby-1.jpg",
       "assets/productos/coach-tabby-2.jpg"
     ],
     tallas: ["Única"],                 // opcional: si no lo pones, usa las de la categoría
     agotadas: [],                      // opcional: tallas sin stock, ej: ["S"]
     colores: ["Negro"],                // opcional
     descripcion: "Texto corto y real del producto.",
     nuevo: true,                       // opcional: aparece en "Lo nuevo"
     ultimas: false,                    // opcional: muestra "Últimas unidades"
     agotado: false                     // opcional: producto agotado
   },

   Consejo: fotos en formato .jpg o .webp, verticales (4:5), de ~1000 px
   de ancho y menos de 300 KB cada una para que la tienda cargue rápido.
   ===================================================================== */

window.PRODUCTOS = [
  /* ----- Recibo 1 · compra en tienda oficial Nike -----
     precio: null → la tienda muestra "Precio por confirmar".
     Escribe aquí el precio real de cada pieza cuando lo tengas. */
  {
    id: "nike-sportswear-essentials-crew-dj7665-010",
    nombre: "Buzo oversize Nike Sportswear Collection Essentials",
    marca: "Nike",
    categoria: "ropa",
    precio: null,
    fotos: ["assets/productos/nike-essentials-crew-negro.jpg"],
    tallas: ["M"],
    colores: ["Negro"],
    descripcion: "Buzo de felpa oversize de cuello redondo para mujer. Comprado en tienda oficial Nike. Referencia: DJ7665-010.",
    nuevo: true
  },
  {
    id: "nike-zenvy-bra-tank-ib9872-010",
    nombre: "Top largo Nike Zenvy de soporte ligero",
    marca: "Nike",
    categoria: "ropa",
    precio: null,
    fotos: ["assets/productos/nike-zenvy-bra-tank-ib9872-010-1.jpg", "assets/productos/nike-zenvy-bra-tank-ib9872-010-2.jpg", "assets/productos/nike-zenvy-bra-tank-ib9872-010-3.jpg", "assets/productos/nike-zenvy-bra-tank-ib9872-010-4.jpg"],
    tallas: ["M"],
    colores: ["Negro"],
    descripcion: "Top deportivo largo de soporte ligero para mujer. Comprado en tienda oficial Nike. Referencia: IB9872-010.",
    nuevo: true
  },
  {
    id: "nike-phoenix-fleece-quarter-zip-hj0931-441",
    nombre: "Buzo oversize Nike Sportswear Phoenix Fleece con media cremallera",
    marca: "Nike",
    categoria: "ropa",
    precio: null,
    fotos: ["assets/productos/nike-phoenix-fleece-quarter-zip-azul.jpg"],
    tallas: ["M"],
    colores: ["Azul claro"],
    descripcion: "Buzo largo oversize de felpa con cuello alto y media cremallera, para mujer. Comprado en tienda oficial Nike. Referencia: HJ0931-441.",
    nuevo: true
  },
  {
    id: "nike-phoenix-fleece-crew-dq5761-323",
    nombre: "Buzo oversize Nike Sportswear Phoenix Fleece cuello redondo",
    marca: "Nike",
    categoria: "ropa",
    precio: null,
    fotos: [],
    tallas: ["S"],
    descripcion: "Buzo de felpa oversize de cuello redondo para mujer. Comprado en tienda oficial Nike. Referencia: DQ5761-323."
  },
  {
    id: "nike-satin-coaches-jacket-if0561-103",
    nombre: "Chaqueta Nike Sportswear satinada estilo coach",
    marca: "Nike",
    categoria: "ropa",
    precio: null,
    fotos: [],
    tallas: ["XL"],
    descripcion: "Chaqueta satinada estilo coach para mujer. Comprado en tienda oficial Nike. Referencia: IF0561-103."
  },
  {
    id: "nike-chill-knit-crop-hf9538-007",
    nombre: "Top crop Nike Sportswear Chill Knit",
    marca: "Nike",
    categoria: "ropa",
    precio: null,
    fotos: [],
    tallas: ["XS"],
    descripcion: "Prenda corta (crop) de tejido Chill Knit para mujer. Comprado en tienda oficial Nike. Referencia: HF9538-007."
  },
  {
    id: "jordan-track-jacket-im6841-489",
    nombre: "Chaqueta deportiva Jordan Brooklyn",
    marca: "Jordan",
    categoria: "ropa",
    precio: null,
    fotos: ["assets/productos/jordan-brooklyn-track-jacket-im6841-489-1.jpg", "assets/productos/jordan-brooklyn-track-jacket-im6841-489-2.jpg", "assets/productos/jordan-brooklyn-track-jacket-im6841-489-3.jpg", "assets/productos/jordan-brooklyn-track-jacket-im6841-489-4.jpg"],
    tallas: ["XL"],
    colores: ["Azul"],
    descripcion: "Chaqueta deportiva (track jacket) Jordan para mujer. Comprado en tienda oficial Nike. Referencia: IM6841-489.",
    nuevo: true
  },
  {
    id: "nike-indy-high-support-bra-fd1068-410",
    nombre: "Top deportivo Nike Indy de alto soporte",
    marca: "Nike",
    categoria: "ropa",
    precio: null,
    fotos: ["assets/productos/nike-indy-high-support-fd1068-410-1.jpg", "assets/productos/nike-indy-high-support-fd1068-410-2.jpg", "assets/productos/nike-indy-high-support-fd1068-410-3.jpg", "assets/productos/nike-indy-high-support-fd1068-410-4.jpg"],
    tallas: ["XS"],
    colores: ["Azul marino"],
    descripcion: "Brasier deportivo Dri-FIT de alto soporte para mujer. Comprado en tienda oficial Nike. Referencia: FD1068-410.",
    nuevo: true
  },
  {
    id: "nike-indy-light-support-bra-fd1062-621",
    nombre: "Top deportivo Nike Indy de soporte ligero",
    marca: "Nike",
    categoria: "ropa",
    precio: null,
    fotos: [],
    tallas: ["XS"],
    descripcion: "Brasier deportivo Dri-FIT de soporte ligero para mujer. Comprado en tienda oficial Nike. Referencia: FD1062-621."
  },
  {
    id: "nike-universa-bra-tank-if0950-438",
    nombre: "Top largo Nike Universa de soporte medio",
    marca: "Nike",
    categoria: "ropa",
    precio: 169900,
    fotos: ["assets/productos/nike-universa-bra-tank-if0950-438-1.jpg", "assets/productos/nike-universa-bra-tank-if0950-438-2.jpg", "assets/productos/nike-universa-bra-tank-if0950-438-3.jpg", "assets/productos/nike-universa-bra-tank-if0950-438-4.jpg"],
    tallas: ["XS"],
    colores: ["Azul pizarra"],
    descripcion: "Top deportivo largo Dri-FIT de soporte medio para mujer. Comprado en tienda oficial Nike. Referencia: IF0950-438.",
    nuevo: true
  },
  {
    id: "nike-one-bra-iu1364-010",
    nombre: "Top deportivo Nike One",
    marca: "Nike",
    categoria: "ropa",
    precio: null,
    fotos: [],
    tallas: ["XS"],
    descripcion: "Brasier deportivo Dri-FIT para mujer. Comprado en tienda oficial Nike. Referencia: IU1364-010."
  },
  {
    id: "nike-pro-short-5in-ao9975-010",
    nombre: "Short Nike Pro de 5 pulgadas",
    marca: "Nike",
    categoria: "ropa",
    precio: null,
    fotos: [],
    tallas: ["S"],
    descripcion: "Short deportivo ajustado de 5 pulgadas para mujer. Comprado en tienda oficial Nike. Referencia: AO9975-010."
  },
  {
    id: "nike-vomero-plus-hv8154-109",
    nombre: "Tenis Nike Vomero Plus",
    marca: "Nike",
    categoria: "tenis",
    precio: null,
    fotos: ["assets/productos/nike-vomero-plus-hv8154-109-1.jpg", "assets/productos/nike-vomero-plus-hv8154-109-2.jpg", "assets/productos/nike-vomero-plus-hv8154-109-3.jpg", "assets/productos/nike-vomero-plus-hv8154-109-4.jpg"],
    tallas: ["9.5"],
    colores: ["Crema y dorado"],
    descripcion: "Tenis de running para mujer. Talla US. Comprado en tienda oficial Nike. Referencia: HV8154-109.",
    nuevo: true
  },
  {
    id: "nike-v5-rnr-iq0276-030",
    nombre: "Tenis Nike V5 RNR",
    marca: "Nike",
    categoria: "tenis",
    precio: null,
    fotos: ["assets/productos/nike-v5-rnr-iq0276-030-1.jpg", "assets/productos/nike-v5-rnr-iq0276-030-2.jpg", "assets/productos/nike-v5-rnr-iq0276-030-3.jpg", "assets/productos/nike-v5-rnr-iq0276-030-4.jpg"],
    tallas: ["8.5"],
    colores: ["Blanco hueso y plateado"],
    descripcion: "Tenis de estilo casual para mujer. Talla US. Comprado en tienda oficial Nike. Referencia: IQ0276-030.",
    nuevo: true
  },
  {
    id: "nike-club-cap-fv5563-019",
    nombre: "Gorra Nike Club estructurada · lila",
    marca: "Nike",
    categoria: "accesorios",
    precio: 99900,
    fotos: ["assets/productos/nike-club-cap-fv5563-019-1.jpg", "assets/productos/nike-club-cap-fv5563-019-2.jpg", "assets/productos/nike-club-cap-fv5563-019-3.jpg", "assets/productos/nike-club-cap-fv5563-019-4.jpg"],
    tallas: ["L/XL"],
    colores: ["Lila claro"],
    descripcion: "Gorra unisex Nike Club. Comprado en tienda oficial Nike. Referencia: FV5563-019.",
    nuevo: true
  },
  {
    id: "nike-club-cap-fv5563-068",
    nombre: "Gorra Nike Club estructurada · gris",
    marca: "Nike",
    categoria: "accesorios",
    precio: 99900,
    fotos: ["assets/productos/nike-club-cap-fv5563-068-1.jpg", "assets/productos/nike-club-cap-fv5563-068-2.jpg", "assets/productos/nike-club-cap-fv5563-068-3.jpg", "assets/productos/nike-club-cap-fv5563-068-4.jpg"],
    tallas: ["S/M"],
    colores: ["Gris"],
    descripcion: "Gorra unisex Nike Club. Comprado en tienda oficial Nike. Referencia: FV5563-068.",
    nuevo: true
  },
  {
    id: "nike-dri-fit-club-cap-fb5625-690",
    nombre: "Gorra Nike Dri-FIT Club",
    marca: "Nike",
    categoria: "accesorios",
    precio: 114900,
    fotos: ["assets/productos/nike-dri-fit-club-cap-fb5625-690-1.jpg", "assets/productos/nike-dri-fit-club-cap-fb5625-690-2.jpg"],
    tallas: ["L/XL"],
    colores: ["Rosado"],
    descripcion: "Gorra unisex Dri-FIT. Comprado en tienda oficial Nike. Referencia: FB5625-690.",
    nuevo: true
  },
  {
    id: "nike-dri-fit-adv-club-cap-fb5636-100",
    nombre: "Gorra Nike Dri-FIT ADV Club",
    marca: "Nike",
    categoria: "accesorios",
    precio: 129900,
    fotos: ["assets/productos/nike-dri-fit-adv-club-cap-fb5636-100-1.jpg", "assets/productos/nike-dri-fit-adv-club-cap-fb5636-100-2.jpg", "assets/productos/nike-dri-fit-adv-club-cap-fb5636-100-3.jpg"],
    tallas: ["L/XL"],
    colores: ["Blanco"],
    descripcion: "Gorra unisex Dri-FIT ADV. Comprado en tienda oficial Nike. Referencia: FB5636-100.",
    nuevo: true
  }
];
