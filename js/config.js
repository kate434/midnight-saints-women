/* =====================================================================
   MIDNIGHT SAINTS WOMEN · CONFIGURACIÓN DE LA TIENDA
   ---------------------------------------------------------------------
   Este es el único archivo que necesitas tocar para cambiar los datos
   de contacto, las categorías, las marcas o los textos de la tienda.
   Los productos van en  js/productos.js
   ===================================================================== */

window.TIENDA = {
  nombre: "Midnight Saints Women",

  /* ---------- CONTACTO ----------
     whatsapp: número con código de país, SOLO dígitos (sin +, espacios ni guiones).
       Ejemplo Colombia: "573001234567"   ·   Ejemplo EE. UU.: "19295551234"
     Si lo dejas vacío, el botón de WhatsApp abrirá la app para que el cliente
     elija el contacto (el mensaje con el pedido igual va escrito). */
  whatsapp: "",
  instagram: "",   // usuario sin @, ej: "midnightsaintswomen"
  tiktok: "",      // usuario sin @

  /* ---------- MONEDA ----------
     Los precios de js/productos.js se escriben en esta moneda. */
  moneda: { codigo: "COP", locale: "es-CO" },

  /* ---------- ENVÍO GRATIS ----------
     Monto mínimo para envío gratis (en la moneda de arriba).
     Déjalo en null si no ofreces envío gratis: la barra de progreso se oculta. */
  envioGratisDesde: null,

  /* ---------- CATEGORÍAS ----------
     id: identificador que usas en cada producto (campo "categoria").
     tallas: tallas que se ofrecen por defecto si el producto no trae las suyas.
     color: detalle de color (paleta WOMEN). */
  categorias: [
    { id: "ropa",        nombre: "Ropa",        frase: "Prendas con propósito",  icono: "ropa",       color: "var(--c-pink)",  tallas: ["XS", "S", "M", "L", "XL"] },
    { id: "tenis",       nombre: "Tenis",       frase: "Paso firme, estilo propio", icono: "tenis",   color: "var(--c-sky)",   tallas: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"] },
    { id: "zapatos",     nombre: "Zapatos",     frase: "Elegancia en cada paso", icono: "zapatos",    color: "var(--c-lilac)", tallas: ["35", "36", "37", "38", "39", "40"] },
    { id: "bolsos",      nombre: "Bolsos",      frase: "Lo esencial, con estilo", icono: "bolsos",    color: "var(--c-gold)",  tallas: ["Única"] },
    { id: "accesorios",  nombre: "Accesorios",  frase: "El detalle que te define", icono: "accesorios", color: "var(--c-sand)", tallas: ["Única"] }
  ],

  /* ---------- MARCAS ----------
     Marcas que siempre aparecen en el filtro. Si un producto trae otra marca,
     se agrega sola al filtro. */
  marcas: ["Nike", "Adidas", "Coach"],

  /* ---------- PREGUNTAS FRECUENTES ----------
     Edita libremente. No pongas aquí nada que no sea cierto para tu tienda. */
  faq: [
    { p: "¿Cómo hago mi pedido?",
      r: "Elige tus productos y tu talla, agrégalos a tu bolsa y toca “Pedir por WhatsApp”. El mensaje con tu pedido ya va escrito: solo tienes que enviarlo y te respondemos para confirmar." },
    { p: "¿Cómo sé que mi talla está disponible?",
      r: "Antes de cualquier pago te confirmamos por WhatsApp la disponibilidad de tu talla y el total de tu pedido." },
    { p: "¿A dónde hacen envíos?",
      r: "Enviamos a Colombia y Estados Unidos. El costo y el tiempo de envío a tu ciudad te los confirmamos por WhatsApp antes de pagar." },
    { p: "¿Cómo puedo pagar?",
      r: "Te compartimos los métodos de pago disponibles por WhatsApp, junto con la confirmación de tu pedido." },
    { p: "¿Qué talla pido?",
      r: "Revisa la guía de tallas dentro de cada producto. Las tallas pueden variar según la marca: si tienes dudas, escríbenos y te ayudamos a elegir." },
    { p: "¿Me consiguen algo que no está en la tienda?",
      r: "¡Sí! Usa la sección de Encargos: cuéntanos qué buscas (modelo, talla y color) y te respondemos con disponibilidad y precio." }
  ]
};
