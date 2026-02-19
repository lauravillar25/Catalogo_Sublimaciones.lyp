const products = [
    // Category: PROMO (New Category)
    {
        id: 1000,
        title: "Combo de Jardín - Set Completo",
        description: "Set ideal para el jardín de infantes o el colegio. Incluye taza, mantel individual, servilleta y toallita, todo personalizado. <ul><li>Material: Polímero irrompible y tela sublimable</li><li>Diseños: Totalmente personalizados (Pikachu, Stitch, etc.)</li><li>Kit completo: Taza + Cantimplora + Mantel + Servilleta</li></ul>",
        price: 15000,
        image: "assets/images/promos/combo_jardin_1.jpg",
        images: [
            "assets/images/promos/combo_jardin_1.jpg",
            "assets/images/promos/combo_jardin_2.jpg"
        ],
        category: "PROMO"
    },
    // Category: Tazas de Cerámica (Requested to be first)
    {
        id: 10,
        title: "Taza de Cerámica Blanca - Diseños Varios",
        description: "Taza de cerámica clásica, excelente calidad y brillo. Diseños de Stitch, Día de la Madre y más personalizables. <ul><li>Medidas: 9.5cm</li><li>Capacidad: 350ml</li></ul>",
        price: 6000, // Estimated price, can be changed
        image: "assets/images/taza_stitch.jpg",
        images: [
            "assets/images/taza_stitch.jpg",
            "assets/images/taza_stitch_carga.jpg",
            "assets/images/taza_mama_1.jpg",
            "assets/images/taza_mama_2.jpg",
            "assets/images/taza_mama_3.jpg"
        ],
        category: "Tazas de Cerámica"
    },
    // Category: Tazas con Cuchara
    {
        id: 1,
        title: "Tazas con Cuchara - Diseños Personalizados",
        description: "Hermosas tazas de cerámica con interior y asa de color. Incluye cuchara haciendo juego. <ul><li>Consultar colores disponibles</li><li>Medidas: 9cm</li><li>Capacidad: 330ml</li></ul>",
        price: 9000,
        image: "assets/images/taza_curarita.png",
        images: [
            "assets/images/taza_curarita.png",
            "assets/images/taza_dbz.jpg",
            "assets/images/taza_bts.jpg",
            "assets/images/taza_boca.jpg",
            "assets/images/taza_simpsons.jpg"
        ],
        category: "Tazas de Cerámica"
    },
    {
        id: 20,
        title: "Tazas Interior Color - Personajes",
        description: "Tazas de cerámica con asa e interior de color. Diseños de Mario Bros, Chicas Superpoderosas, Disney y más. <ul><li>Medidas: 9.5cm</li><li>Capacidad: 350ml</li></ul>",
        price: 8000,
        image: "assets/images/tazas_colores_grupo.png",
        images: [
            "assets/images/tazas_colores_grupo.png",
            "assets/images/taza_powerpuff.jpg",
            "assets/images/taza_mario.jpg",
            "assets/images/taza_bella_bestia.jpg",
            "assets/images/taza_huevo.jpg"
        ],
        category: "Tazas de Cerámica"
    },
    {
        id: 30,
        title: "Taza Mágica - Cambia con el Calor",
        description: "¡Sorprende con esta taza! A temperatura ambiente es negra, pero al agregar líquido caliente revela la imagen oculta. Ideal para regalos sorpresa. <ul><li>Medidas: 9.5cm</li><li>Capacidad: 350ml</li></ul>",
        price: 9000,
        image: "assets/images/taza_magica_main.png",
        images: [
            "assets/images/taza_magica_main.png",
            "assets/images/taza_magica_caliente.jpg",
            "assets/images/taza_magica_frio.jpg",
            "assets/images/taza_magica_up.jpg",
            "assets/images/taza_magica_simpsons.jpg"
        ],
        category: "Tazas de Cerámica"
    },
    {
        id: 40,
        title: "Taza con Asa de Corazón",
        description: "El regalo más romántico. Tazas de cerámica con asa en forma de corazón e interior de color. Perfectas para San Valentín y aniversarios. <ul><li>Medidas: 9.5cm</li><li>Capacidad: 350ml</li></ul>",
        price: 8800,
        image: "assets/images/taza_corazon_mickey.jpg",
        images: [
            "assets/images/taza_corazon_mickey.jpg",
            "assets/images/taza_corazon_grupo.jpg",
            "assets/images/taza_corazon_diseños.jpg"
        ],
        category: "Tazas de Cerámica"
    },
    {
        id: 50,
        title: "Taza Pastel Mate",
        description: "Elegancia y suavidad. Tazas con acabado mate en hermosos tonos pastel (Rosa, Lila, Verde, Celeste). Tacto suave y diseño moderno. <ul><li>Medidas: 9.5cm</li><li>Capacidad: 350ml</li></ul>",
        price: 8600,
        image: "assets/images/taza_pastel.png",
        // No extra images for slideshow provided yet
        images: [
            "assets/images/taza_pastel.png"
        ],
        category: "Tazas de Cerámica"
    },
    {
        id: 60,
        title: "Taza Ventana Negra",
        description: "<ul><li>Medidas: 9.5cm</li><li>Capacidad: 350ml</li></ul>",
        price: 8000,
        image: "assets/images/taza_ventana_negra_1.jpg",
        images: [
            "assets/images/taza_ventana_negra_1.jpg",
            "assets/images/taza_ventana_negra_2.png"
        ],
        category: "Tazas de Cerámica"
    },
    {
        id: 70,
        title: "Taza Base Hilo - Interior y Asa Color",
        description: "Hermosa taza con base texturizada. <ul><li>Consultar colores disponibles</li><li>Medidas: 10cm</li></ul>",
        price: 9000,
        image: "assets/images/taza_base_hilo.png",
        images: [
            "assets/images/taza_base_hilo.png"
        ],
        category: "Tazas de Cerámica"
    },
    {
        id: 80,
        title: "Taza Mágica con Interior de Color",
        description: "<ul><li>Consultar colores disponibles</li><li>Medidas: 9.5cm</li><li>Capacidad: 350ml</li></ul>",
        price: 9500,
        image: "assets/images/taza_magica_color.png",
        images: [
            "assets/images/taza_magica_color.png"
        ],
        category: "Tazas de Cerámica"
    },
    // Category: BOTELLITAS
    {
        id: 90,
        title: "Hoppy Deportivo Personalizado",
        description: "Ideal para el colegio o deporte, personalizables con nombre y personaje favorito. <ul><li>Modelo: Hoppy Deportivo</li><li>Capacidad: 500 ml</li><li>Material: Polímero Sublimable</li><li>Mantiene: Frío 6hs / Caliente 2hs</li></ul>",
        price: 9000,
        image: "assets/images/botellitas/hoppy_roblox.jpg",
        images: [
            "assets/images/botellitas/hoppy_roblox.jpg",
            "assets/images/botellitas/hoppy_messi.jpg",
            "assets/images/botellitas/hoppy_frozen.jpg",
            "assets/images/botellitas/hoppy_dragon.jpg",
            "assets/images/botellitas/hoppy_nombre.jpg"
        ],
        category: "Botellitas"
    },
    {
        id: 91,
        title: "Hoppy Deportivo 600ml Aluminio",
        description: "Botella de aluminio de alta calidad, incluye doble pico para mayor comodidad. <ul><li>Modelo: Hoppy Aluminio Blanco</li><li>Capacidad: 600 ml</li><li>Material: Aluminio Sublimable</li><li>Incluye: Doble pico</li></ul>",
        price: 12000,
        image: "assets/images/botellitas/hoppy_alu_1.jpg",
        images: [
            "assets/images/botellitas/hoppy_alu_1.jpg",
            "assets/images/botellitas/hoppy_alu_2.jpg",
            "assets/images/botellitas/hoppy_alu_3.jpg"
        ],
        category: "Botellitas"
    },

    // Category: JARROS DE POLÍMERO
    {
        id: 100,
        title: "Jarro Chopp de Polímero",
        description: "Jarro estilo Chopp, irrompible y brillante. Ideal para regalar. <ul><li>Material: Plástico Polímero</li><li>Capacidad: 590 mL</li><li>Medidas: 17cm alto x 8cm diámetro</li><li>Apto Microondas: Sí</li></ul>",
        price: 7500,
        image: "assets/images/jarros-polimero/jarro_1.jpg",
        images: [
            "assets/images/jarros-polimero/jarro_1.jpg",
            "assets/images/jarros-polimero/jarro_2.jpg",
            "assets/images/jarros-polimero/jarro_3.jpg",
            "assets/images/jarros-polimero/jarro_4.jpg",
            "assets/images/jarros-polimero/jarro_5.jpg"
        ],
        category: "Jarros de Polímero"
    },
    {
        id: 101,
        title: "Jarro Térmico de Café 450ml",
        description: "Jarro con asa, ideal para la oficina o el auto. <ul><li>Capacidad: 450 mL</li><li>Altura: 24 cm</li><li>Material: Polímero/Plástico</li><li>Precio: $7000</li></ul>",
        price: 7000,
        image: "assets/images/jarros-cafe/jarro_cafe_1.jpg",
        images: [
            "assets/images/jarros-cafe/jarro_cafe_1.jpg",
            "assets/images/jarros-cafe/jarro_cafe_2.jpg",
            "assets/images/jarros-cafe/jarro_cafe_3.jpg",
            "assets/images/jarros-cafe/jarro_cafe_4.jpg"
        ],
        category: "Jarros de Polímero"
    },
    {
        id: 92,
        title: "Jarro Tipo Cantimplora",
        description: "Práctico jarro tipo cantimplora, ideal para los más chicos. <ul><li>Capacidad: 400 mL</li><li>Colores tapa: Rosa, Celeste, Verde</li><li>Precio: $5000</li></ul>",
        price: 5000,
        image: "assets/images/cantimploras/cantimplora_1.png",
        images: [
            "assets/images/cantimploras/cantimplora_1.png",
            "assets/images/cantimploras/cantimplora_2.jpg",
            "assets/images/cantimploras/cantimplora_3.jpg",
            "assets/images/cantimploras/cantimplora_4.jpg",
            "assets/images/cantimploras/cantimplora_5.jpg"
        ],
        category: "Jarros de Polímero"
    },
    // Category: POLIMERO VARIOS
    {
        id: 110,
        title: "Taza de Polímero",
        description: "Taza de polímero (plástico) irrompible. Ideal para niños y jardines. <ul><li>Medidas: 8.5cm de alto x 8cm de diámetro</li><li>Material: Polímero Sublimable</li><li>Precio: $3000</li><li>Apto Microondas: Sí</li></ul>",
        price: 3000,
        image: "assets/images/polimero-varios/taza_polimero_1.jpg",
        images: [
            "assets/images/polimero-varios/taza_polimero_1.jpg",
            "assets/images/polimero-varios/taza_polimero_2.jpg",
            "assets/images/polimero-varios/taza_polimero_3.jpg",
            "assets/images/polimero-varios/taza_polimero_4.jpg",
            "assets/images/polimero-varios/taza_polimero_5.jpg"
        ],
        category: "Polímeros Varios"
    },
    {
        id: 111,
        title: "Vaso de Café 200cc",
        description: "Vaso pequeño, ideal para café o cortado. <ul><li>Capacidad: 200 mL</li><li>Medidas: 9cm alto x 8cm diámetro</li><li>Precio: $4600</li></ul>",
        price: 4600,
        image: "assets/images/polimero-varios/vaso_cafe_1.jpg",
        images: [
            "assets/images/polimero-varios/vaso_cafe_1.jpg",
            "assets/images/polimero-varios/vaso_cafe_2.jpg",
            "assets/images/polimero-varios/vaso_cafe_3.jpg"
        ],
        category: "Polímeros Varios"
    },
    {
        id: 112,
        title: "Vaso / Lapicero",
        description: "Vaso multiuso, ideal como lapicero o vaso de bebida. <ul><li>Capacidad: 450 cc</li><li>Medidas: 9cm alto x 8cm diámetro</li><li>Precio: $3200</li></ul>",
        price: 3200,
        image: "assets/images/polimero-varios/vaso_lapicero_1.jpg",
        images: [
            "assets/images/polimero-varios/vaso_lapicero_1.jpg",
            "assets/images/polimero-varios/vaso_lapicero_2.jpg",
            "assets/images/polimero-varios/vaso_lapicero_3.jpg",
            "assets/images/polimero-varios/vaso_lapicero_4.jpg"
        ],
        category: "Polímeros Varios"
    },
    {
        id: 120,
        title: "Mate de Polímero",
        description: "Mate de polímero resistente, ideal para personalizar. <ul><li>Medidas: 10.5cm alto x 8cm diámetro</li><li>Capacidad: 300 ml</li><li>Precio: $4200</li></ul>",
        price: 4200,
        image: "assets/images/polimero-varios/mate_polimero_1.jpg",
        images: [
            "assets/images/polimero-varios/mate_polimero_1.jpg",
            "assets/images/polimero-varios/mate_polimero_2.jpg"
        ],
        category: "Polímeros Varios"
    },
    // Category: LLAVEROS
    {
        id: 130,
        title: "Llavero Cinta Corto Colgante",
        description: "Llavero de cinta con argolla y mosquetón. <ul><li>Medidas: 2cm x 18cm aprox</li><li>Incluye: Argolla y mosquetón</li><li>Precio unidad: $2500</li><li>Promo x 10: $14000</li></ul>",
        price: 2500,
        image: "assets/images/llaveros/llavero_cinta_1.jpg",
        images: [
            "assets/images/llaveros/llavero_cinta_1.jpg",
            "assets/images/llaveros/llavero_cinta_2.jpg",
            "assets/images/llaveros/llavero_cinta_3.jpg"
        ],
        category: "Llaveros"
    },
    {
        id: 131,
        title: "Llavero Destapador",
        description: "Práctico llavero con función de destapador incorporada. <ul><li>Medidas: 7cm alto x 4.6cm ancho aprox</li><li>Material: Polímero / Metal</li><li>Precio unidad: $2500</li><li>Promo x 12: $18000</li></ul>",
        price: 2500,
        image: "assets/images/llaveros/llavero_destapador_1.jpg",
        images: [
            "assets/images/llaveros/llavero_destapador_1.jpg",
            "assets/images/llaveros/llavero_destapador_2.jpg",
            "assets/images/llaveros/llavero_destapador_3.jpg"
        ],
        category: "Llaveros"
    },
    {
        id: 132,
        title: "Llaveros de Polímero - Varias Formas",
        description: "Llaveros de polímero resistentes y brillantes. Personalizables con el diseño que prefieras. <ul><li>Formas disponibles: Cuadrado, Redondo, Corazón</li><li>Material: Polímero Sublimable</li><li>Precio unidad: $1500</li><li>Promo x 12: $12400</li></ul>",
        price: 1500,
        image: "assets/images/llaveros/llavero_polimero_cuadrado.jpg",
        images: [
            "assets/images/llaveros/llavero_polimero_cuadrado.jpg",
            "assets/images/llaveros/llavero_polimero_redondo.jpg",
            "assets/images/llaveros/llavero_polimero_rectangulo.jpg",
            "assets/images/llaveros/llavero_polimero_corazon_1.jpg",
            "assets/images/llaveros/llavero_polimero_corazon_2.jpg"
        ],
        category: "Llaveros"
    }
];
