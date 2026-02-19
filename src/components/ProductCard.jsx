import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onImageClick }) => {
    const defaultImage = 'assets/logo.png';
    const [currentImg, setCurrentImg] = useState(product?.image || defaultImage);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval;
        if (isHovered && product?.images && Array.isArray(product.images) && product.images.length > 1) {
            let idx = 0;
            interval = setInterval(() => {
                idx = (idx + 1) % product.images.length;
                setCurrentImg(product.images[idx]);
            }, 1000);
        } else {
            setCurrentImg(product?.image || defaultImage);
        }
        return () => clearInterval(interval);
    }, [isHovered, product?.images, product?.image]);

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
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {product.isPromo && (
                <div className="promo-badge">
                    <i className="fas fa-tag"></i> PROMO
                </div>
            )}
            <div className="card-image" onClick={() => onImageClick(currentImg)}>
                <motion.img
                    src={currentImg}
                    alt={product.title}
                    className="product-img"
                    whileHover={{ scale: 1.08 }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                    }}
                />
            </div>
            <div className="card-content">
                <h3 className="title">{product.title || 'Producto'}</h3>
                <p className="description" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
                <div className="price">{formatPrice(product.price)}</div>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-consultar">
                    Consultar <i className="fab fa-whatsapp"></i>
                </a>
            </div>
        </motion.div>
    );
};

export default ProductCard;
