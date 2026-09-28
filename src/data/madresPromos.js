// ============================================================
//  DATOS DE PROMOS - DÍA DE LA MADRE
//  ============================================================
//  Para agregar o editar precios/productos, modificá este archivo.
//
//  Campos de cada combo:
//    id          → identificador único (no cambiar)
//    title       → nombre del combo
//    description → descripción (puede tener \n para saltos de línea)
//    includes    → lista de productos incluidos (array de strings)
//    price       → precio final (dejar '' si todavía no está definido)
//    badge       → etiqueta pequeña de la tarjeta
//    images      → array con rutas de fotos dentro de /public/assets/
//                  Ejemplo: ['mes_de_las_madres/combo_1/foto.jpg']
//    whatsapp    → mensaje pre-cargado al consultar por WhatsApp
// ============================================================

export const madresPromos = [
  {
    id: 'combo-1',
    title: 'Combo 1 — Trio Polímero',
    badge: '⭐ Más completo',
    description: '3 productos 100% personalizados para las mamis.',
    includes: [
      'Taza de cerámica personalizada',
      'Chopp de polímero personalizado',
      'Mate de polímero personalizado',
    ],
    price: '',   // ← Completar precio acá, ej: '$12.500'
    images: ['mes_de_las_madres/combo_1/3_productos.png'],
    whatsapp: 'Hola! Me interesa el Combo 1 (Trío Polímero) para el Día de la Madre 🌸 ¿Cuál es el precio?',
  },
  {
    id: 'combo-2',
    title: 'Combo 2 — Taza con Estilo',
    badge: '🎁 Con caja incluida',
    description: '3 productos personalizables presentados con caja.',
    includes: [
      'Taza de cerámica personalizable',
      'Posa taza de madera personalizable',
      'Caja de presentación',
    ],
    price: '',   // ← Completar precio acá, ej: '$9.800'
    images: ['mes_de_las_madres/combo_2/alegria.jpeg'],
    whatsapp: 'Hola! Me interesa el Combo 2 (Taza con Estilo) para el Día de la Madre 🌸 ¿Cuál es el precio?',
  },
  {
    id: 'mate-color',
    title: 'Mate de Color',
    badge: '🆕 Nuevo',
    description: 'Material sublimable con gran área de estampado. Incluye bombilla.',
    includes: [
      'Bombilla de metal con disco Autolimpiante (vaciado fácil)',
      'Encastrable interior + exterior',
      'Material: Polímero Sublimable',
      'Medida: 8,5 cm de alto armado',
      'Área de estampado: 7 cm × 21 cm',
    ],
    price: '',   // ← Completar precio acá, ej: '$5.500'
    images: ['polimero-varios/mate_de_color/mate_ de_color.png'],  // ← Imagen agregada
    whatsapp: 'Hola! Me interesa el Mate de Color para el Día de la Madre 🌸 ¿Cuál es el precio?',
  },
];

// Fecha fin de la promo (countdown)
export const PROMO_END = new Date('2026-10-31T23:59:59-03:00');
