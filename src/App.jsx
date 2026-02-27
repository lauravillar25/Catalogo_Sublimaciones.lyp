import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products, galleryImages, whatsappNumber } from './data/products';
import ProductCard from './components/ProductCard';
import WorkReel from './components/WorkReel';
import ImageModal from './components/ImageModal';
import Noise from './components/Noise';
import WhatsAppBubble from './components/WhatsAppBubble';
import './index.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Group products by category
  const categories = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  // For the navigation index
  const categoryList = Object.keys(categories);

  return (
    <div className="app">
      <Noise />
      <header className="header">
        <div className="nav-container">
          <a href="#" className="logo-link" onClick={() => setIsNavOpen(false)}>
            <div className="logo-container">
              <img src="assets/logo.png" alt="Logo" className="logo-img" />
              <span className="brand-name">Sublimaciones.lyp</span>
            </div>
          </a>
        </div>
      </header>

      <button
        className="mobile-nav-toggle"
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-label="Toggle navigation"
      >
        <i className={`fas ${isNavOpen ? 'fa-times' : 'fa-bars'}`}></i>
        <span>Categorías</span>
      </button>

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
      </section>

      <nav className={`category-nav ${isNavOpen ? 'is-open' : ''}`}>
        <div className="category-index">
          {categoryList.map(cat => (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={cat}
              href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className="category-link"
              onClick={() => setIsNavOpen(false)}
            >
              {cat}
            </motion.a>
          ))}
        </div>
      </nav>

      <main className="container">
        {categoryList.map(categoryName => {
          const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
          const isPromo = categoryName === "COMBOS ¡OFERTAS!";

          return (
            <React.Fragment key={categoryName}>
              {/* Inject Gallery BEFORE "Polímeros Varios" */}
              {categoryName === "Polímeros Varios" && (
                <WorkReel images={galleryImages} onImageClick={(img) => setSelectedProduct({ image: img, title: 'Galería', isGallery: true })} />
              )}

              <div id={categoryId} className={`category-header ${isPromo ? 'promo-header' : ''}`}>
                <h2>{categoryName}</h2>
              </div>

              <div className="product-grid">
                {categories[categoryName].map(product => (
                  <ProductCard key={product.id} product={product} onProductClick={setSelectedProduct} />
                ))}
              </div>
            </React.Fragment>
          );
        })}
      </main>

      <footer className="footer">
        <p className="shipping-info">
          Hacemos <span className="shipping-highlight">envíos a domicilio</span> en Corrientes Capital.
        </p>
        <div className="social-links">
          <a href="https://wa.me/5493794020786" target="_blank" rel="noopener noreferrer" className="category-link">
            <i className="fab fa-whatsapp"></i> WhatsApp
          </a>
          <a href="https://www.instagram.com/subli_matesyregalos/" target="_blank" rel="noopener noreferrer" className="category-link">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
        <p className="copyright">
          © 2026 Sublimaciones.lyp. Todos los derechos reservados.
        </p>
      </footer>

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
