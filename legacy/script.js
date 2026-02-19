document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const categoryIndex = document.querySelector('#category-index');
    const waNumber = "5493794020786";

    function formattedPrice(price) {
        try {
            return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price || 0);
        } catch (e) {
            console.error("Error formatting price:", e);
            return `$${price || 0}`;
        }
    }

    function renderProductsByCategory(products) {
        if (!productGrid || !categoryIndex) {
            console.error("Required DOM elements (.product-grid or #category-index) not found.");
            return;
        }

        if (!Array.isArray(products)) {
            console.error("Products data is not an array:", products);
            productGrid.innerHTML = '<p class="error-message">Error al cargar los productos. Por favor, reintente más tarde.</p>';
            return;
        }

        try {
            productGrid.innerHTML = '';
            categoryIndex.innerHTML = '';

            // Group products by category
            const categories = {};
            products.forEach(product => {
                if (product && product.category) {
                    if (!categories[product.category]) {
                        categories[product.category] = [];
                    }
                    categories[product.category].push(product);
                }
            });

            // Loop through categories and render
            for (const [categoryName, categoryProducts] of Object.entries(categories)) {
                // Inject Gallery BEFORE "Polímeros Varios"
                if (categoryName === "Polímeros Varios") {
                    const workReel = renderWorkReel();
                    if (workReel) productGrid.appendChild(workReel);
                }

                const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

                // Create Category Link for Index
                const navLink = document.createElement('a');
                navLink.href = `#${categoryId}`;
                navLink.classList.add('category-link');
                navLink.textContent = categoryName;
                categoryIndex.appendChild(navLink);

                // Create Category Header
                const categoryHeader = document.createElement('div');
                categoryHeader.classList.add('category-header');
                categoryHeader.id = categoryId;
                categoryHeader.innerHTML = `<h2>${categoryName}</h2>`;
                productGrid.appendChild(categoryHeader);

                // Render products for this category
                categoryProducts.forEach(product => {
                    const card = createProductCard(product);
                    if (card) productGrid.appendChild(card);
                });
            }
        } catch (error) {
            console.error("Critical error during rendering:", error);
            productGrid.innerHTML = '<p class="error-message">Hubo un problema al mostrar el catálogo.</p>';
        }
    }

    function createProductCard(product) {
        if (!product) return null;

        try {
            const card = document.createElement('div');
            card.classList.add('product-card');

            const message = `Hola, me interesa el producto "${product.title}" que vi en su catálogo.`;
            const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

            const mainImage = product.image || 'assets/images/logo.png';
            const imgHtml = `<img src="${mainImage}" alt="${product.title || 'Producto'}" class="product-img" data-original="${mainImage}" onerror="this.onerror=null;this.src='assets/images/logo.png';">`;

            card.innerHTML = `
                <div class="card-image">
                    ${imgHtml}
                </div>
                <div class="card-content">
                    <h3>${product.title || 'Producto sin título'}</h3>
                    <p class="description">${product.description || ''}</p>
                    <div class="price">${formattedPrice(product.price)}</div>
                    <a href="${waLink}" target="_blank" class="btn-consultar">
                        Consultar <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            `;

            // Slideshow Logic
            if (product.images && Array.isArray(product.images) && product.images.length > 1) {
                const imgElement = card.querySelector('.product-img');
                let intervalId = null;
                let currentIndex = 0;

                card.addEventListener('mouseenter', () => {
                    if (intervalId) clearInterval(intervalId);
                    intervalId = setInterval(() => {
                        currentIndex = (currentIndex + 1) % product.images.length;
                        imgElement.src = product.images[currentIndex];
                    }, 1000);
                });

                card.addEventListener('mouseleave', () => {
                    if (intervalId) clearInterval(intervalId);
                    imgElement.src = imgElement.getAttribute('data-original');
                    currentIndex = 0;
                });
            }

            // Add click event for Lightbox
            const mainImg = card.querySelector('.product-img');
            if (mainImg) {
                mainImg.style.cursor = "zoom-in";
                mainImg.addEventListener('click', () => {
                    openModal(mainImg.src);
                });
            }

            return card;
        } catch (e) {
            console.error("Error creating product card:", e, product);
            return null;
        }
    }

    // Gallery / "Nuestros Trabajos" compact reel logic
    const galleryImages = [
        'assets/images/gallery/work_1.jpg',
        'assets/images/gallery/work_2.jpg',
        'assets/images/gallery/work_3.jpg',
        'assets/images/gallery/work_4.jpg',
        'assets/images/gallery/work_5.jpg',
        'assets/images/gallery/work_6.jpg',
        'assets/images/gallery/work_7.jpg'
    ];

    // Modal / Lightbox Logic
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-modal');

    function openModal(src) {
        if (!modal || !modalImg) return;
        modal.style.display = "block";
        modalImg.src = src;
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeModal();
    });

    function renderWorkReel() {
        try {
            const reelSection = document.createElement('section');
            reelSection.classList.add('work-reel-section');

            reelSection.innerHTML = `
                <h2 class="work-reel-title"><i class="fas fa-camera-retro"></i> Trabajos Realizados</h2>
                <div class="work-reel-container">
                    ${galleryImages.map(src => `
                        <div class="work-item">
                            <img src="${src}" alt="Trabajo Realizado" onerror="this.onerror=null;this.src='/assets/logo.png'">
                        </div>
                    `).join('')}
                </div>
            `;

            reelSection.querySelectorAll('.work-item img').forEach(img => {
                img.style.cursor = "zoom-in";
                img.addEventListener('click', () => openModal(img.src));
            });

            return reelSection;
        } catch (e) {
            console.error("Error rendering work reel:", e);
            return null;
        }
    }

    // Initialize
    if (typeof products !== 'undefined') {
        renderProductsByCategory(products);
    } else {
        console.error("Products data not loaded.");
        if (productGrid) {
            productGrid.innerHTML = '<p class="error-message">Error de configuración: No se encontraron los datos de los productos.</p>';
        }
    }
});

