import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

const ImageModal = ({ isOpen, product, onClose }) => {
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

    const formatPrice = (price) => {
        try {
            return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price || 0);
        } catch (e) {
            return `$${price || 0}`;
        }
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
                            <div className="modal-image-container">
                                <img src={product.image} alt={product.title} className="modal-main-img" />
                            </div>

                            <div className="modal-details">
                                <h2 className="modal-title">{product.title}</h2>
                                {product.description && (
                                    <div
                                        className="modal-description"
                                        dangerouslySetInnerHTML={{ __html: product.description }}
                                    />
                                )}
                                <div className="modal-price">{formatPrice(product.price)}</div>

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
