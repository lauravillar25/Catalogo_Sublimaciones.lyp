import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onProductClick }) => {
    const defaultImage = 'assets/logo.png';
    const [currentImg, setCurrentImg] = useState(product?.image || defaultImage);
    const [isHovered, setIsHovered] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [imgLoading, setImgLoading] = useState(true);

    useEffect(() => {
        let interval;
        // Se activa el carrusel si hay hover (PC) O si está a la vista (Móvil)
        const shouldRotate = (isHovered || isInView) &&
            product?.images &&
            Array.isArray(product.images) &&
            product.images.length > 1;

        if (shouldRotate) {
            let idx = 0;
            interval = setInterval(() => {
                idx = (idx + 1) % product.images.length;
                setCurrentImg(product.images[idx]);
            }, 2000); // Un poco más lento para que sea menos frenético en móvil
        } else {
            setCurrentImg(product?.image || defaultImage);
        }
        return () => clearInterval(interval);
    }, [isHovered, isInView, product?.images, product?.image]);

    if (!product) return null;

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
            onViewportEnter={() => setIsInView(true)}
            onViewportLeave={() => setIsInView(false)}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.5 }} // Se activa cuando se ve al menos el 50%
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onProductClick(product)}
            style={{ cursor: 'pointer' }}
        >
            {product.isPromo && (
                <div className="promo-badge">
                    <i className="fas fa-tag"></i> PROMO
                </div>
            )}
            <div className={`card-image ${imgLoading ? 'is-loading' : ''}`}>
                <motion.img
                    src={currentImg}
                    alt={product.title}
                    className="product-img"
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    onLoad={() => setImgLoading(false)}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                        setImgLoading(false);
                    }}
                />
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
