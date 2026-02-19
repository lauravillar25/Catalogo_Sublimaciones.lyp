import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const WorkReel = ({ images, onImageClick }) => {
    const defaultImage = '/assets/logo.png';

    if (!images || !Array.isArray(images)) return null;

    return (
        <section className="work-reel-section">
            <h2 className="work-reel-title">
                <Camera size={24} /> Trabajos Realizados
            </h2>
            <div className="work-reel-container">
                {images.map((src, idx) => (
                    <motion.div
                        key={idx}
                        className="work-item"
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        onClick={() => onImageClick(src)}
                    >
                        <img
                            src={src}
                            alt={`Trabajo ${idx + 1}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = defaultImage;
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WorkReel;
