import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductCard = ({ product, onProductClick }) => {
    const defaultImage = 'assets/logo.png';
    const hasMultipleImages = product?.images && Array.isArray(product.images) && product.images.length > 1;

    // Solo manejamos el índice si hay varias imágenes
    const [imgIdx, setImgIdx] = useState(0);
    const [imgLoading, setImgLoading] = useState(true);

    if (!product) return null;

    const currentImgUrl = hasMultipleImages ? product.images[imgIdx] : (product?.image || defaultImage);

    const handleNext = (e) => {
        e.stopPropagation();
        setImgLoading(true);
        setImgIdx((prev) => (prev + 1) % product.images.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setImgLoading(true);
        setImgIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const waMessage = `Hola, me interesa el producto "${product.title}" que vi en su catálogo.`;
    const waLink = `https://wa.me/5493794020786?text=${encodeURIComponent(waMessage)}`;

    const formatPrice = (price) => {
        try {
            return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price || 0);
        } catch (e) {
            return `$${price || 0}`;
        }
    };

    return (
        <motion.div
            className={`product-card ${product.isPromo ? 'is-promo' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            onClick={() => onProductClick(product)}
            style={{ cursor: 'pointer' }}
        >
            {product.isPromo && (
                <div className="promo-badge">
                    <i className="fas fa-tag"></i> PROMO
                </div>
            )}
            <div className={`card-image ${imgLoading ? 'is-loading' : ''} carousel-container`}>
                <motion.img
                    src={currentImgUrl}
                    alt={product.title}
                    className="product-img"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    onLoad={() => setImgLoading(false)}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                        setImgLoading(false);
                    }}
                />

                {hasMultipleImages && (
                    <>
                        <button className="carousel-btn prev-btn" onClick={handlePrev} aria-label="Anterior imagen">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="carousel-btn next-btn" onClick={handleNext} aria-label="Siguiente imagen">
                            <ChevronRight size={20} />
                        </button>
                        <div className="carousel-dots">
                            {product.images.map((_, idx) => (
                                <span key={idx} className={`dot ${idx === imgIdx ? 'active' : ''}`} />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="card-content">
                <h3 className="title">{product.title || 'Producto'}</h3>
                <div className="price">{formatPrice(product.price)}</div>
                <button className="btn-consultar" onClick={(e) => { e.stopPropagation(); window.open(waLink, '_blank'); }}>
                    Consultar <i className="fab fa-whatsapp"></i>
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
