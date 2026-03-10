import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';

const WorkReel = ({ images, onImageClick }) => {
    const scrollRef = useRef(null);
    const defaultImage = '/assets/logo.png';

    if (!images || !Array.isArray(images)) return null;

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8; // Desplazar el 80% del ancho visible
            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="work-reel-full-width">
            <div className="work-reel-header">
                <h2 className="work-reel-title">
                    <Camera size={28} /> Trabajos Realizados
                </h2>
                <div className="work-reel-controls">
                    <button className="reel-nav-btn" onClick={() => scroll('left')} aria-label="Anterior">
                        <ChevronLeft size={24} />
                    </button>
                    <button className="reel-nav-btn" onClick={() => scroll('right')} aria-label="Siguiente">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="work-reel-track-container">
                <div className="work-reel-track" ref={scrollRef}>
                    {images.map((src, idx) => (
                        <motion.div
                            key={idx}
                            className="work-item-card"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => onImageClick(src)}
                        >
                            <img
                                src={src}
                                alt={`Trabajo ${idx + 1}`}
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = defaultImage;
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkReel;
