import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { gallerySections, whatsappNumber } from './data/products';
import { useCatalog } from './hooks/useCatalog';
import ProductCard from './components/ProductCard';
import WorkReel from './components/WorkReel';
import ImageModal from './components/ImageModal';
import Noise from './components/Noise';
import WhatsAppBubble from './components/WhatsAppBubble';
import './index.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const searchInputRef = useRef(null);

  // Obtener productos desde Google Sheets CSV (con fallback a products.js local)
  const { products, loading, error } = useCatalog();

  // Filtrar productos por búsqueda y categoría
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(product.id).includes(searchQuery) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Obtener lista de categorías únicas de forma dinámica
  const categoriesList = ['Todos', ...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <div className="app">
      <Noise />
      <header className="header">
        <div className="nav-container">
          <a href="#" className="logo-link">
            <div className="logo-container">
              <img src="assets/logo.png" alt="Logo" className="logo-img" />
              <span className="brand-name">Sublimaciones.lyp</span>
            </div>
          </a>
        </div>
      </header>

      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Regalos personalizados que <br />
          <span className="gradient-text">hablan por vos.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Personaliza cada producto a tu manera.
        </motion.p>
        <motion.a
          href="https://www.instagram.com/sublimaciones.lyp/"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-ig-btn"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fab fa-instagram"></i> Síguenos en Instagram
        </motion.a>
      </section>

      {/* Buscador en tiempo real */}
      <div className="search-section-container" id="search-section">
        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="¿Qué estás buscando? (ej. Taza, Combo, ID...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Limpiar búsqueda">
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>

      {/* Barra deslizable horizontal con filtros de categorías */}
      <nav className="category-nav-chips" id="categories-section">
        <div className="category-index-chips">
          {categoriesList.map(cat => (
            <button
              key={cat}
              className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      <main className="container">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando productos dinámicos...</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="catalog-warning-alert">
                <i className="fas fa-exclamation-triangle"></i>
                <span>Cargando catálogo local (Respaldo offline activo).</span>
              </div>
            )}

            <div className="section-title-wrapper">
              <h2>{selectedCategory === 'Todos' ? 'Todos los Productos' : selectedCategory}</h2>
              {searchQuery && <p className="search-results-count">{filteredProducts.length} resultados encontrados</p>}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products-found">
                <i className="fas fa-search-minus"></i>
                <h3>No encontramos productos</h3>
                <p>Prueba buscando con palabras clave diferentes o limpiando los filtros.</p>
                <button className="btn-reset-filters" onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}>
                  Ver todos los productos
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onProductClick={setSelectedProduct} />
                ))}
              </div>
            )}

            {/* Inyectar sección de Galería cuando no hay filtros activos */}
            {selectedCategory === 'Todos' && !searchQuery && (
              <section className="gallery-sections-container" style={{ margin: "4rem 0 2rem 0" }}>
                <div className="gallery-divider-title">
                  <i className="fas fa-images"></i>
                  <h2>Trabajos Realizados</h2>
                </div>
                {gallerySections.map((section, sectionIdx) => (
                  <WorkReel 
                    key={sectionIdx} 
                    title={section.title} 
                    images={section.images} 
                    hideIcon={true}
                    onImageClick={(img) => setSelectedProduct({ image: img, title: 'Galería', isGallery: true })} 
                  />
                ))}
              </section>
            )}
          </>
        )}
      </main>

      <footer className="footer">
        <p className="shipping-info">
          Hacemos <span className="shipping-highlight">envíos a domicilio</span> en Corrientes Capital.
        </p>
        <div className="social-links">
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="category-link">
            <i className="fab fa-whatsapp"></i> WhatsApp
          </a>
          <a href="https://www.instagram.com/sublimaciones.lyp/" target="_blank" rel="noopener noreferrer" className="category-link">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
        <p className="copyright">
          © 2026 Sublimaciones.lyp. Todos los derechos reservados.
        </p>
      </footer>

      {/* Barra de navegación inferior fija para mobile */}
      <nav className="bottom-nav">
        <button className="bottom-nav-item" onClick={() => {
          document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 600);
        }}>
          <i className="fas fa-search"></i>
          <span>Buscar</span>
        </button>
        
        <button className="bottom-nav-item" onClick={() => {
          document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <i className="fas fa-th-large"></i>
          <span>Categorías</span>
        </button>
        
        <button className="bottom-nav-item" onClick={() => {
          document.querySelector('.footer')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <i className="fas fa-envelope"></i>
          <span>Contacto</span>
        </button>
      </nav>

      <WhatsAppBubble phoneNumber={whatsappNumber} />
      
      <ImageModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;
