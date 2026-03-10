import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageModal = ({ isOpen, product, onClose }) => {
    const defaultImage = 'assets/logo.png';
    const [imgIdx, setImgIdx] = useState(0);

    // Sincronizar el índice inicial cuando cambia el producto
    useEffect(() => {
        setImgIdx(0);
    }, [product]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!product) return null;

    const hasMultipleImages = product.images && product.images.length > 1;
    const currentImgUrl = hasMultipleImages ? product.images[imgIdx] : (product?.image || defaultImage);

    const formatPrice = (price) => {
        try {
            return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price || 0);
        } catch (e) {
            return `$${price || 0}`;
        }
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setImgIdx((prev) => (prev + 1) % product.images.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setImgIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const waMessage = `Hola, me interesa el producto "${product.title}" que vi en su catálogo.`;
    const waLink = `https://wa.me/5493794020786?text=${encodeURIComponent(waMessage)}`;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="product-modal-content"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close-btn" onClick={onClose}>
                            <X size={24} />
                        </button>

                        <div className="modal-grid">
                            <div className="modal-image-container carousel-container">
                                <motion.img
                                    key={currentImgUrl}
                                    src={currentImgUrl}
                                    alt={product.title}
                                    className="modal-main-img"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />

                                {hasMultipleImages && (
                                    <>
                                        <button className="carousel-btn prev-btn" onClick={handlePrev} aria-label="Anterior imagen">
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button className="carousel-btn next-btn" onClick={handleNext} aria-label="Siguiente imagen">
                                            <ChevronRight size={24} />
                                        </button>

                                        {/* Miniaturas */}
                                        <div className="modal-thumbnails">
                                            {product.images.map((src, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`modal-thumb-btn ${imgIdx === idx ? 'is-active' : ''}`}
                                                    onClick={() => setImgIdx(idx)}
                                                >
                                                    <img src={src} alt={`Vista ${idx + 1}`} loading="lazy" />
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="modal-details">
                                <h2 className="modal-title">{product.title}</h2>
                                {product.description && (
                                    <div
                                        className="modal-description"
                                        dangerouslySetInnerHTML={{ __html: product.description }}
                                    />
                                )}
                                {!product.isGallery && (
                                    <div className="modal-price">{formatPrice(product.price)}</div>
                                )}
                                <a href={waLink} target="_blank" rel="noopener noreferrer" className="modal-cta-btn">
                                    Consultar por WhatsApp <MessageCircle size={20} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImageModal;

